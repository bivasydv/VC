"use strict";(self.webpackChunkchitchatter=self.webpackChunkchitchatter||[]).push([[5733,1007],{56115:function(e){function i(e){e.languages.haskell={comment:{pattern:/(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--(?:(?=.)[^-!#$%*+=?&@|~.:<>^\\\/].*|$)|\{-[\s\S]*?-\})/m,lookbehind:!0},char:{pattern:/'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|ACK|BEL|BS|CAN|CR|DC1|DC2|DC3|DC4|DEL|DLE|EM|ENQ|EOT|ESC|ETB|ETX|FF|FS|GS|HT|LF|NAK|NUL|RS|SI|SO|SOH|SP|STX|SUB|SYN|US|VT|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,alias:"string"},string:{pattern:/"(?:[^\\"]|\\(?:\S|\s+\\))*"/,greedy:!0},keyword:/\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,"import-statement":{pattern:/(^[\t ]*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,lookbehind:!0,inside:{keyword:/\b(?:as|hiding|import|qualified)\b/,punctuation:/\./}},builtin:/\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,number:/\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,operator:[{pattern:/`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,greedy:!0},{pattern:/(\s)\.(?=\s)/,lookbehind:!0},/[-!#$%*+=?&@|~:<>^\\\/][-!#$%*+=?&@|~.:<>^\\\/]*|\.[-!#$%*+=?&@|~.:<>^\\\/]+/],hvariable:{pattern:/\b(?:[A-Z][\w']*\.)*[_a-z][\w']*/,inside:{punctuation:/\./}},constant:{pattern:/\b(?:[A-Z][\w']*\.)*[A-Z][\w']*/,inside:{punctuation:/\./}},punctuation:/[{}[\];(),.:]/},e.languages.hs=e.languages.haskell}e.exports=i,i.displayName="haskell",i.aliases=["hs"]},73298:function(e,i,t){var a=t(56115);function n(e){e.register(a),e.languages.idris=e.languages.extend("haskell",{comment:{pattern:/(?:(?:--|\|\|\|).*$|\{-[\s\S]*?-\})/m},keyword:/\b(?:Type|case|class|codata|constructor|corecord|data|do|dsl|else|export|if|implementation|implicit|import|impossible|in|infix|infixl|infixr|instance|interface|let|module|mutual|namespace|of|parameters|partial|postulate|private|proof|public|quoteGoal|record|rewrite|syntax|then|total|using|where|with)\b/,builtin:void 0}),e.languages.insertBefore("idris","keyword",{"import-statement":{pattern:/(^\s*import\s+)(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*/m,lookbehind:!0,inside:{punctuation:/\./}}}),e.languages.idr=e.languages.idris}e.exports=n,n.displayName="idris",n.aliases=["idr"]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_idris.ff2648d7.chunk.js.map