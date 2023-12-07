import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import localforage from 'localforage'

import * as serviceWorkerRegistration from 'serviceWorkerRegistration'
import { StorageContext } from 'contexts/StorageContext'
import { SettingsContext } from 'contexts/SettingsContext'
import { homepageUrl, routes } from 'config/routes'
import { Home } from 'pages/Home'
import { About } from 'pages/About'
import { Disclaimer } from 'pages/Disclaimer'
import { Settings } from 'pages/Settings'
import { PublicRoom } from 'pages/PublicRoom'
import { PrivateRoom } from 'pages/PrivateRoom'
import { ColorMode, UserSettings } from 'models/settings'
import { PersistedStorageKeys } from 'models/storage'
import { QueryParamKeys } from 'models/shell'
import { Shell } from 'components/Shell'
import {
  isConfigMessageEvent,
  PostMessageEvent,
  PostMessageEventName,
} from 'models/sdk'
import { EncryptionService } from 'services/Encryption'
import {
  SerializationService,
  SerializedUserSettings,
} from 'services/Serialization'

export interface BootstrapProps {
  persistedStorage?: typeof localforage
  initialUserSettings: UserSettings
  serializationService?: typeof SerializationService
}

const configListenerTimeout = 3000

const getConfigFromSdk = () => {
  const queryParams = new URLSearchParams(window.location.search)

  const { origin: parentFrameOrigin } = new URL(
    decodeURIComponent(queryParams.get(QueryParamKeys.PARENT_DOMAIN) ?? '')
  )

  return new Promise<Partial<UserSettings>>((resolve, reject) => {
    let expireTimout: NodeJS.Timeout

    const expireListener = () => {
      window.removeEventListener('message', handleMessage)
      clearTimeout(expireTimout)
      reject()
    }

    expireTimout = setTimeout(expireListener, configListenerTimeout)

    const handleMessage = (event: MessageEvent) => {
      if (!isConfigMessageEvent(event)) return

      resolve(event.data.payload)
      expireListener()
    }

    window.addEventListener('message', handleMessage)

    const postMessageEvent: PostMessageEvent['data'] = {
      name: PostMessageEventName.CONFIG_REQUESTED,
      payload: {},
    }

    window.parent.postMessage(postMessageEvent, parentFrameOrigin)
  })
}

export const Bootstrap = ({
  persistedStorage: persistedStorageProp = localforage.createInstance({
    name: 'chitchatter',
    description: 'Persisted settings data for chitchatter',
  }),
  initialUserSettings,
  serializationService = SerializationService,
}: BootstrapProps) => {
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    []
  )

  const [persistedStorage] = useState(persistedStorageProp)
  const [appNeedsUpdate, setAppNeedsUpdate] = useState(false)
  const [hasLoadedSettings, setHasLoadedSettings] = useState(false)
  const [userSettings, setUserSettings] =
    useState<UserSettings>(initialUserSettings)
  const { userId } = userSettings

  const handleServiceWorkerUpdate = () => {
    setAppNeedsUpdate(true)
  }

  const persistUserSettings = useCallback(
    async (newUserSettings: UserSettings) => {
      if (queryParams.has(QueryParamKeys.IS_EMBEDDED)) {
        return Promise.resolve(userSettings)
      }

      const userSettingsForIndexedDb =
        await serializationService.serializeUserSettings(newUserSettings)

      return persistedStorageProp.setItem(
        PersistedStorageKeys.USER_SETTINGS,
        userSettingsForIndexedDb
      )
    },
    [persistedStorageProp, queryParams, serializationService, userSettings]
  )

  useEffect(() => {
    serviceWorkerRegistration.register({ onUpdate: handleServiceWorkerUpdate })
  }, [])

  useEffect(() => {
    ;(async () => {
      if (hasLoadedSettings) return

      const serializedUserSettings =
        await persistedStorageProp.getItem<SerializedUserSettings>(
          PersistedStorageKeys.USER_SETTINGS
        )

      const persistedUserSettings =
        serializedUserSettings === null
          ? serializedUserSettings
          : await serializationService.deserializeUserSettings(
              serializedUserSettings
            )

      const computeUserSettings = async (): Promise<UserSettings> => {
        if (queryParams.has(QueryParamKeys.GET_SDK_CONFIG)) {
          try {
            const configFromSdk = await getConfigFromSdk()

            return {
              ...userSettings,
              ...persistedUserSettings,
              ...configFromSdk,
            }
          } catch (e) {
            console.error(
              'Chitchatter configuration from parent frame could not be loaded'
            )
          }
        }

        return {
          ...userSettings,
          ...persistedUserSettings,
        }
      }

      const computedUserSettings = await computeUserSettings()
      setUserSettings(computedUserSettings)

      // FIXME: Remove this guard
      if (persistedUserSettings === null) {
        await persistUserSettings(computedUserSettings)
      }

      setHasLoadedSettings(true)
    })()
  }, [
    hasLoadedSettings,
    persistedStorageProp,
    userSettings,
    userId,
    queryParams,
    persistUserSettings,
    serializationService,
  ])

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search)

    if (!queryParams.has(QueryParamKeys.IS_EMBEDDED)) return

    const handleConfigMessage = (event: MessageEvent) => {
      if (!hasLoadedSettings) return
      if (!isConfigMessageEvent(event)) return

      const overrideConfig: Partial<UserSettings> = event.data.payload

      setUserSettings({
        ...userSettings,
        ...overrideConfig,
      })
    }

    window.addEventListener('message', handleConfigMessage)

    return () => {
      window.removeEventListener('message', handleConfigMessage)
    }
  }, [hasLoadedSettings, userSettings])

  const settingsContextValue = {
    updateUserSettings: async (changedSettings: Partial<UserSettings>) => {
      const newSettings = {
        ...userSettings,
        ...changedSettings,
      }

      await persistUserSettings(newSettings)

      setUserSettings(newSettings)
    },
    getUserSettings: () => ({ ...userSettings }),
  }

  const storageContextValue = {
    getPersistedStorage: () => persistedStorage,
  }

  return (
    <Router basename={homepageUrl.pathname}>
      <StorageContext.Provider value={storageContextValue}>
        <SettingsContext.Provider value={settingsContextValue}>
          {hasLoadedSettings ? (
            <Shell appNeedsUpdate={appNeedsUpdate} userPeerId={userId}>
              <Routes>
                {[routes.ROOT, routes.INDEX_HTML].map(path => (
                  <Route
                    key={path}
                    path={path}
                    element={<Home userId={userId} />}
                  />
                ))}
                <Route path={routes.ABOUT} element={<About />} />
                <Route path={routes.DISCLAIMER} element={<Disclaimer />} />
                <Route
                  path={routes.SETTINGS}
                  element={<Settings userId={userId} />}
                />
                <Route
                  path={routes.PUBLIC_ROOM}
                  element={<PublicRoom userId={userId} />}
                />
                <Route
                  path={routes.PRIVATE_ROOM}
                  element={<PrivateRoom userId={userId} />}
                />
                <Route
                  path="*"
                  element={<Navigate to={routes.ROOT} replace />}
                />
              </Routes>
            </Shell>
          ) : (
            <></>
          )}
        </SettingsContext.Provider>
      </StorageContext.Provider>
    </Router>
  )
}

export interface BootstrapShimProps
  extends Omit<BootstrapProps, 'initialUserSettings'> {
  getUuid?: typeof uuid
}

const BootstrapShim = ({ getUuid = uuid, ...props }: BootstrapShimProps) => {
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null)
  useEffect(() => {
    ;(async () => {
      if (userSettings !== null) return

      // FIXME: Handle potential exception here
      const { publicKey, privateKey } =
        await EncryptionService.generateKeyPair()

      setUserSettings({
        userId: getUuid(),
        customUsername: '',
        colorMode: ColorMode.DARK,
        playSoundOnNewMessage: true,
        showNotificationOnNewMessage: true,
        showActiveTypingStatus: true,
        // FIXME: Persist keys for new users
        // FIXME: Persist keys for preexisting users
        publicKey,
        privateKey,
      })
    })()
  }, [getUuid, userSettings])

  // FIXME: Show key generation error if necessary
  if (userSettings === null) {
    return <></>
  }

  return <Bootstrap {...props} initialUserSettings={userSettings} />
}

export default BootstrapShim
