(this["webpackJsonpsynelution-fb-manager"]=this["webpackJsonpsynelution-fb-manager"]||[]).push([[5],{33:function(e,n,t){"use strict";t.d(n,"b",(function(){return p})),t.d(n,"a",(function(){return m}));var a=t(14),r=t.n(a),o=t(20),c=t(31),i=t(0),l=t.n(i),u=t(23),s=t.n(u),f=t(46),d=Object(i.createContext)({user:null}),p=function(){return Object(i.useContext)(d)},b=function(){s.a.defaults.headers.common.Authorization=window.localStorage.getItem("token")},m=function(e){var n=Object(i.useState)(null),t=Object(c.a)(n,2),a=t[0],u=t[1],p=Object(i.useState)(!0),m=Object(c.a)(p,2),g=m[0],h=m[1];Object(i.useEffect)((function(){a&&b()}),[a]),Object(i.useEffect)((function(){if(!window.localStorage.getItem("token"))return h(!1);b(),v()}),[]);var v=function(){var e=Object(o.a)(r.a.mark((function e(){var n,t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.get("/auth");case 3:n=e.sent,t=n.data,u(t),setTimeout((function(){h(!1)}),200),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(o.a)(r.a.mark((function e(n){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,s.a.post("/login",n);case 3:return t=e.sent,a=t.data,window.localStorage.setItem("token",a.token),u(a.user),e.abrupt("return",a);case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(n){return e.apply(this,arguments)}}();return l.a.createElement(l.a.Fragment,null,l.a.createElement(f.a,{loading:g}),l.a.createElement(d.Provider,Object.assign({value:{user:a,loading:g,logout:function(){window.localStorage.removeItem("token"),u(null)},login:w}},e)))}},46:function(e,n,t){"use strict";t.d(n,"a",(function(){return l}));var a=t(0),r=t.n(a),o=t(101),c=t(99),i=t(100),l=function(e){var n=e.loading;return r.a.createElement(o.a,{clone:!0,bgcolor:"primary.main"},r.a.createElement(c.a,{container:!0,style:{height:"100vh",color:"white",position:"fixed",top:0,opacity:n?1:0,visibility:n?"visible":"hidden",transition:"0.5s",zIndex:1e4},justify:"center",alignItems:"center"},r.a.createElement(i.a,{color:"inherit"})))}},69:function(e,n,t){e.exports=t(96)},75:function(e,n,t){},96:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(39),c=t.n(o),i=t(14),l=t.n(i),u=t(20),s=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function f(e,n){navigator.serviceWorker.register(e).then(function(){var e=Object(u.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.onupdatefound=function(){var e=t.installing;null!=e&&(e.onstatechange=function(){"installed"===e.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(t)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(t)))})};case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){console.error("Error during service worker registration:",e)}))}var d=t(32),p=t(115),b=(t(75),t(33)),m=t(3),g=Object(m.j)((function(e){var n=e.children,t=e.location.pathname;return r.a.useEffect((function(){window.scrollTo(0,0)}),[t]),n||null})),h=t(12),v=t(60),w=t(114),j={spacing:10,fontFamily:["Roboto",'"Helvetica Neue"',"Arial","sans-serif",'"Apple Color Emoji"','"Segoe UI Emoji"','"Segoe UI Symbol"'].join(","),palette:{fb:"linear-gradient(to right,#3578e5 0%,#2362c8 100%)",ig:"linear-gradient(-112deg,#5c0abf 0,#b0377b 100%)"}},y=Object(v.a)(Object(h.a)(Object(h.a)({},j),{},{palette:Object(h.a)(Object(h.a)({},j.palette),{},{primary:{main:"#2362c8"},secondary:{main:"#ffe400"}})})),O=Object(v.a)(Object(h.a)(Object(h.a)({},j),{},{palette:Object(h.a)(Object(h.a)({},j.palette),{},{primary:{main:"#b0377b"},secondary:{main:"#ffe400"}})}));console.log(y);var E=function(e){var n=e.children,t=Object(m.i)("/:client/posts/:type");return Object(a.useEffect)((function(){document.body.style.backgroundColor=y.palette.background.default}),[]),r.a.createElement(w.a,{theme:t&&"ig"===t.params.type?O:y},n)},k=r.a.lazy((function(){return Promise.all([t.e(3),t.e(9),t.e(12)]).then(t.bind(null,348))})),S=r.a.lazy((function(){return t.e(15).then(t.bind(null,323))})),x=function(){return r.a.createElement(a.Suspense,{fallback:null},r.a.createElement(p.a,null),r.a.createElement(g,null,r.a.createElement(E,null,r.a.createElement(b.a,null,r.a.createElement(I,null)))))},I=function(){return Object(b.b)().user?r.a.createElement(k,null):r.a.createElement(S,null)};c.a.render(r.a.createElement(d.a,null,r.a.createElement(x,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var n="".concat("","/").concat("service-worker.js");s?(!function(e,n){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):f(e,n)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(n,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):f(n,e)}))}}()}},[[69,6,7]]]);
//# sourceMappingURL=main.b67e7fdf.chunk.js.map