"use strict";(self.webpackChunkchitchatter=self.webpackChunkchitchatter||[]).push([[8126,8119,3047],{36168:function(e,n,t){var a=t(96759),r=t(40595);function o(e){e.register(a),e.register(r),function(e){e.languages.etlua={delimiter:{pattern:/^<%[-=]?|-?%>$/,alias:"punctuation"},"language-lua":{pattern:/[\s\S]+/,inside:e.languages.lua}},e.hooks.add("before-tokenize",(function(n){e.languages["markup-templating"].buildPlaceholders(n,"etlua",/<%[\s\S]+?%>/g)})),e.hooks.add("after-tokenize",(function(n){e.languages["markup-templating"].tokenizePlaceholders(n,"etlua")}))}(e)}e.exports=o,o.displayName="etlua",o.aliases=[]},96759:function(e){function n(e){e.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/}}e.exports=n,n.displayName="lua",n.aliases=[]},40595:function(e){function n(e){!function(e){function n(e,n){return"___"+e.toUpperCase()+n+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,r,o){if(t.language===a){var i=t.tokenStack=[];t.code=t.code.replace(r,(function(e){if("function"===typeof o&&!o(e))return e;for(var r,u=i.length;-1!==t.code.indexOf(r=n(a,u));)++u;return i[u]=e,r})),t.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=e.languages[a];var r=0,o=Object.keys(t.tokenStack);!function i(u){for(var l=0;l<u.length&&!(r>=o.length);l++){var s=u[l];if("string"===typeof s||s.content&&"string"===typeof s.content){var c=o[r],g=t.tokenStack[c],p="string"===typeof s?s:s.content,f=n(a,c),d=p.indexOf(f);if(d>-1){++r;var k=p.substring(0,d),h=new e.Token(a,e.tokenize(g,t.grammar),"language-"+a,g),m=p.substring(d+f.length),b=[];k&&b.push.apply(b,i([k])),b.push(h),m&&b.push.apply(b,i([m])),"string"===typeof s?u.splice.apply(u,[l,1].concat(b)):s.content=b}}else s.content&&i(s.content)}return u}(t.tokens)}}}})}(e)}e.exports=n,n.displayName="markupTemplating",n.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_etlua.5736e2e1.chunk.js.map