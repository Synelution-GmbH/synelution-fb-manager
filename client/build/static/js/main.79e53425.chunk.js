(this["webpackJsonpsynelution-fb-manager"]=this["webpackJsonpsynelution-fb-manager"]||[]).push([[5],{122:function(e,n,t){"use strict";t.d(n,"b",(function(){return g})),t.d(n,"a",(function(){return p}));var a=t(31),r=t.n(a),o=t(57),c=t(67),i=t(0),l=t.n(i),s=t(98),u=t.n(s),f=t(159),d=Object(i.createContext)({user:null}),g=function(){return Object(i.useContext)(d)},m=function(){u.a.defaults.headers.common.Authorization=window.localStorage.getItem("token")},p=function(e){var n=Object(i.useState)(null),t=Object(c.a)(n,2),a=t[0],s=t[1],g=Object(i.useState)(!0),p=Object(c.a)(g,2),b=p[0],v=p[1];Object(i.useEffect)((function(){a&&"guest"!==a.role&&m()}),[a]),Object(i.useEffect)((function(){if(!window.localStorage.getItem("token"))return v(!1);m(),h()}),[]);var h=function(){var e=Object(o.a)(r.a.mark((function e(){var n,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.get("/auth");case 3:n=e.sent,t=n.data,s(t),setTimeout((function(){v(!1)}),200),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(o.a)(r.a.mark((function e(n){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.post("/login",n);case 3:return t=e.sent,a=t.data,window.localStorage.setItem("token",a.token),s(a.user),e.abrupt("return",a);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}();return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.a,{loading:b}),l.a.createElement(d.Provider,Object.assign({value:{user:a,loading:b,logout:function(){window.localStorage.removeItem("token"),s(null)},login:w,setUser:s}},e)))}},159:function(e,n,t){"use strict";t.d(n,"a",(function(){return l}));var a=t(0),r=t.n(a),o=t(480),c=t(475),i=t(476),l=function(e){var n=e.loading;return r.a.createElement(o.a,{clone:!0,bgcolor:"primary.main"},r.a.createElement(c.a,{container:!0,style:{height:"100vh",color:"white",position:"fixed",top:0,opacity:n?1:0,visibility:n?"visible":"hidden",transition:"0.5s",zIndex:1e4},justify:"center",alignItems:"center"},r.a.createElement(i.a,{color:"inherit"})))}},252:function(e,n,t){e.exports=t(472)},451:function(e,n,t){},472:function(e,n,t){"use strict";t.r(n);t(253),t(262),t(446);var a=t(0),r=t.n(a),o=t(21),c=t.n(o),i=t(124),l=t(510),s=(t(451),t(122)),u=t(17),f=Object(u.j)((function(e){var n=e.children,t=e.location.pathname;return r.a.useEffect((function(){window.scrollTo(0,0)}),[t]),n||null})),d=t(40),g=t(240),m=t(502),p={spacing:10,fontFamily:["Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),palette:{fb:"linear-gradient(to right,#3578e5 0%,#2362c8 100%)",ig:"linear-gradient(-112deg,#5c0abf 0,#b0377b 100%)"}},b=Object(g.a)(Object(d.a)(Object(d.a)({},p),{},{palette:Object(d.a)(Object(d.a)({},p.palette),{},{primary:{main:"#2362c8"},secondary:{main:"#ffe400"}})})),v=Object(g.a)(Object(d.a)(Object(d.a)({},p),{},{palette:Object(d.a)(Object(d.a)({},p.palette),{},{primary:{main:"#b0377b"},secondary:{main:"#ffe400"}})}));var h=function(e){var n=e.children,t=Object(u.i)("/:client/posts/:type");return Object(a.useEffect)((function(){document.body.style.backgroundColor=b.palette.background.default}),[]),r.a.createElement(m.a,{theme:t&&"ig"===t.params.type?v:b},n)},w=t(31),j=t.n(w),E=t(57),O=t(67),k=t(503),y=t(506),x=t(507),S=t(479),C=t(508),I=t(509),W=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function A(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("","/").concat("service-worker.js");W?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):U(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):U(n,e)}))}}function U(e,n){navigator.serviceWorker.register(e).then(function(){var e=Object(E.a)(j.a.mark((function e(t){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.onupdatefound=function(){var e=t.installing;null!=e&&(e.onstatechange=function(){"installed"===e.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(t)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(t)))})};case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.error("Error during service worker registration:",e)}))}var z=Object(a.createContext)(),P=function(e){var n=Object(a.useState)({update:!1}),t=Object(O.a)(n,2),o=t[0],c=t[1];return Object(a.useEffect)((function(){A({onUpdate:function(e){console.log(e),console.log("update available"),c(Object(d.a)(Object(d.a)({},o),{},{update:!0}))},onSuccess:function(e){console.log(e),console.log("success")}})}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement(z.Provider,Object.assign({value:o},e)))},T=function(){var e=Object(a.useState)(!1),n=Object(O.a)(e,2),t=n[0],o=n[1],c=Object(a.useContext)(z).update;return Object(a.useEffect)((function(){Object(E.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("serviceWorker"in navigator){e.next=2;break}return e.abrupt("return");case 2:console.log("should work now 2"),c&&o(!0);case 4:case"end":return e.stop()}}),e)})))()}),[c]),t?r.a.createElement(k.a,{open:t,onBackdropClick:function(e){e.preventDefault()}},r.a.createElement(y.a,null,"Es wurde eine neue Version gefunden!",r.a.createElement("br",null)),r.a.createElement(x.a,{dividers:!0},r.a.createElement(S.a,null,"Um Ihnen die bestm\xf6gliche Erfahrung zu bieten, bitten wir sie diesen Anweisungen zu folgen:",r.a.createElement("br",null),r.a.createElement("br",null),"1.) Schlie\xdfen Sie alle anderen Tabs dieser Seite.",r.a.createElement("br",null),"2.) Laden Sie die Seite neu.")),r.a.createElement(C.a,null,r.a.createElement(I.a,{color:"primary",variant:"contained",onClick:Object(E.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.serviceWorker.ready;case 2:if((n=e.sent).waiting){e.next=5;break}return e.abrupt("return");case 5:navigator.serviceWorker.addEventListener("controllerchange",(function(){console.log("controllerchange"),window.location.reload()})),console.log(n.waiting.postMessage("SKIP_WAITING"));case 7:case"end":return e.stop()}}),e)})))},"Neu laden"))):null},N=r.a.lazy((function(){return Promise.all([t.e(4),t.e(14)]).then(t.bind(null,749))})),B=r.a.lazy((function(){return t.e(16).then(t.bind(null,731))})),L=function(){return r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(l.a,null),r.a.createElement(f,null,r.a.createElement(h,null,r.a.createElement(s.a,null,r.a.createElement(T,null),r.a.createElement(R,null)))))},R=function(){var e=Object(s.b)().user;return e&&"guest"!==e.role?r.a.createElement(N,null):r.a.createElement(B,null)};c.a.render(r.a.createElement(P,null,r.a.createElement(i.a,null,r.a.createElement(L,null))),document.getElementById("root")),function(){var e="data:image/svg+xml;base64,".concat(btoa('\n<svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 307.7 309.48">\n  <defs>\n    <style>\n      .cls-1 {\n        fill: #ffe400;\n      }\n      @keyframes pulse {\n        from {\n          transform: scale3d(1, 1, 1);\n        }\n\n        50% {\n          transform: scale3d(1.05, 1.05, 1.05);\n        }\n\n        to {\n          transform: scale3d(1, 1, 1);\n        }\n      }\n\n      .pulse {\n        animation-name: pulse;\n        animation-timing-function: ease-in-out;\n        animation-duration: 1720ms;\n        animation-iteration-count: infinite;\n        transform-origin: center center;\n      }\n    </style>\n  </defs>\n  <path class="cls-1 pulse" d="M287.7,143.85C287.7,64.53,223.17,0,143.85,0S0,64.53,0,143.85v1.78C0,225,64.53,289.48,143.85,289.48S287.7,224.94,287.7,145.63v-1.78ZM171.27,179.56l-64.52,37.25V69.6l64.52,37.24,63,36.36Z"/>\n</svg>\n'));console.log("%c\n\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\n\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2584\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2580\u2584\u2584\u2588\u2584\u2591\u2591\u2591\u2591\u2584\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\n\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2588\u2584\u2591\u2591\u2591\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2591\n\u2591\u2591\u2591\u2591\u2584\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2580\u2588\u2588\u2591\u2591\u2591\u2584\u2580\u2580\u2580\u2584\u2584\u2591\u2591\u2580\u2591\u2591\n\u2591\u2591\u2584\u2588\u2580\u2584\u2588\u2580\u2580\u2580\u2580\u2584\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2580\u2580\u2588\u2584\u2591\u2580\u2588\u2584\u2591\u2591\u2588\u2584\u2591\u2591\u2591\u2580\u2588\u2591\u2591\u2591\u2591\n\u2591\u2584\u2588\u2591\u2584\u2580\u2591\u2591\u2584\u2584\u2584\u2591\u2588\u2591\u2591\u2591\u2584\u2580\u2584\u2588\u2584\u2591\u2580\u2588\u2591\u2591\u2588\u2584\u2591\u2591\u2580\u2588\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\n\u2584\u2588\u2591\u2591\u2588\u2591\u2591\u2591\u2580\u2580\u2580\u2591\u2588\u2591\u2591\u2584\u2588\u2591\u2580\u2580\u2580\u2591\u2591\u2588\u2591\u2591\u2591\u2588\u2584\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\n\u2588\u2588\u2591\u2591\u2591\u2580\u2584\u2591\u2591\u2591\u2584\u2588\u2580\u2591\u2591\u2591\u2580\u2584\u2584\u2584\u2584\u2584\u2588\u2580\u2591\u2591\u2591\u2580\u2588\u2591\u2591\u2588\u2584\u2591\u2591\u2591\u2588\u2591\u2591\u2591\n\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2584\u2588\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\n\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2588\u2588\u2580\u2591\u2591\u2591\u2591\u2588\u2584\u2591\u2591\u2591\n\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2588\u2584\n\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2584\u2588\u2588\n\u2591\u2588\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2580\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2588\u2584\n\u2591\u2580\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2588\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2584\u2584\u2588\u2588\n\u2591\u2584\u2588\u2588\u2584\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2580\u2584\u2584\u2584\u2584\u2580\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2580\u2580\u2588\u2584\n\u2591\u2591\u2580\u2580\u2580\u2580\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2588\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2584\u2588\u2588\n\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\n","color: #ffe400;"),console.log("%c\n\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588    \u2588\u2588\u2557\n\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d   \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588  \u2588\u2588\u2554\u255d\n\u2588\u2588\u2554\u2588\u2588\u2588\u2588\u2554\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557     \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d   \u2588\u2588\u2554\u2550\u255d \n\u2588\u2588\u2551\u255a\u2588\u2588\u2554\u255d\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255d     \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557   \u2588\u2588\u2551 \n\u2588\u2588\u2551 \u255a\u2550\u255d \u2588\u2588\u2551\u2588\u2588\u2551  \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d   \u2588\u2588\u2551 \n\u255a\u2550\u255d     \u255a\u2550\u255d\u255a\u2550\u255d  \u255a\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d   \u255a\u2550\u2550\u2550\u2550\u2550\u255d    \u255a\u2550\u255d","color: #ffe400;"),console.log("%c\n \u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588    \u2588\u2588\u2557\u2588\u2588\u2588\u2557  \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557     \u2588\u2588\u2557   \u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2557 \u2588\u2588\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2588\u2557  \u2588\u2588\u2557\n\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d \u2588\u2588  \u2588\u2588\u2554\u255d\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255d\u2588\u2588\u2551     \u2588\u2588\u2551   \u2588\u2588\u2551\u255a\u2550\u2550\u2588\u2588\u2554\u2550\u2550\u255d\u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2557 \u2588\u2588\u2551\n \u2588\u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2554\u2550\u255d \u2588\u2588\u2554\u2588\u2588\u2557\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551     \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2554\u2588\u2588\u2557\u2588\u2588\u2551\n      \u2588\u2588\u2557  \u2588\u2588\u2551   \u2588\u2588\u2551\u255a\u2588\u2588\u2588\u2588\u2551\u2588\u2588\u2554\u2550\u2550\u255d  \u2588\u2588\u2551     \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551   \u2588\u2588\u2551\u2588\u2588\u2551\u255a\u2588\u2588\u2588\u2588\u2551\n \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d  \u2588\u2588\u2551   \u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2551\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2557\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d   \u2588\u2588\u2551   \u2588\u2588\u2551\u255a\u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255d\u2588\u2588\u2551 \u255a\u2588\u2588\u2588\u2551\n \u255a\u2550\u2550\u2550\u2550\u2550\u255d   \u255a\u2550\u255d   \u255a\u2550\u255d  \u255a\u2550\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u255d    \u255a\u2550\u255d   \u255a\u2550\u255d \u255a\u2550\u2550\u2550\u2550\u2550\u255d \u255a\u2550\u255d  \u255a\u2550\u2550\u255d","color: #ffe400;"),console.log("%c ","\n    background-image: url(".concat(e,");\n    padding-bottom: 100px;\n    padding-left: 100px;\n    margin: 20px;\n    background-size: contain;\n    background-position: center center;\n    background-repeat: no-repeat;\n  "))}()}},[[252,6,7]]]);
//# sourceMappingURL=main.79e53425.chunk.js.map