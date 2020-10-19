(this["webpackJsonpsynelution-fb-manager"]=this["webpackJsonpsynelution-fb-manager"]||[]).push([[14],{243:function(e,t,a){"use strict";a.d(t,"a",(function(){return O}));var n=a(14),r=a.n(n),c=a(20),i=a(31),l=a(321),o=a(328),u=a(329),s=a(323),m=a(99),p=a(325),d=a(0),f=a.n(d),b=a(241),g=a(118),v=a(327),E=Object(l.a)((function(e){return{video:{width:"100%",height:"100%",objectFit:"cover",transition:"0.3s"},button:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:2,opacity:0,visibility:"hidden",transition:"0.3s",color:"#fff"},videoContainer:{zIndex:99,position:"absolute",left:0,top:0,width:"100%",height:"100%",background:"#000","&:hover .MuiIconButton-root":{opacity:1,visibility:"visible"},"&:hover video":{opacity:.7}}}})),h=function(e){var t=Object(d.useRef)(),a=Object(d.useState)("init"),n=Object(i.a)(a,2),r=n[0],c=n[1],l=E();return Object(d.useEffect)((function(){t.current&&"init"!==r&&(r?t.current.pause():t.current.play())}),[r]),f.a.createElement("div",{className:l.videoContainer},f.a.createElement("video",Object.assign({ref:t,className:l.video,loop:!0},e)),f.a.createElement(v.a,{className:l.button,onClick:function(e){e.stopPropagation(),c(!r)}},f.a.createElement(g.a,{icon:r?"play":"pause"})))},j=Object(l.a)((function(e){return{root:function(){return{overflow:"hidden",position:"relative",paddingTop:"100%","& > .MuiCardContent-root":{position:"absolute",top:0,left:0,width:"100%",height:"100%",padding:e.spacing(3)},backgroundSize:"cover",backgroundPosition:"center"}},upload:function(t){var a=t.isDragActive,n=t.hide;return{position:"relative",width:"100%",height:"100%",border:"2px dashed ".concat(a?e.palette.primary.main:e.palette.grey[200]),backgroundColor:e.palette.grey[50],padding:e.spacing(3),transition:"0.3s",opacity:n&&!a?0:1,"& .svg-inline--fa":{transition:"0.3s",fontSize:"38px",marginBottom:e.spacing(2),color:a?e.palette.primary.main:e.palette.grey[400]}}}}})),O=function(e){var t=e.setFile,a=void 0===t?function(){}:t,n=e.setDataUrl,l=void 0===n?function(){}:n,v=e.preview,E=void 0===v?null:v,O=e.children,y=Object(d.useState)(),C=Object(i.a)(y,2),k=C[0],w=C[1],x=Object(d.useState)(),F=Object(i.a)(x,2),S=F[0],D=F[1],N=Object(d.useCallback)(function(){var e=Object(c.a)(r.a.mark((function e(t){var n,i;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t[0],a(n),(i=new FileReader).onabort=function(){return console.log("file reading was aborted")},i.onerror=function(){return console.log("file reading has failed")},i.onload=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=i.result,w(t),l(t);case 3:case"end":return e.stop()}}),e)}))),i.readAsDataURL(n);case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[a,l]),P=Object(b.a)({onDrop:N,maxFiles:1,multiple:!1}),z=P.getRootProps,I=P.getInputProps,L=P.isDragActive,A=j({isDragActive:L,hide:k||S,image:k});return Object(d.useEffect)((function(){if(E&&E.path)return E.image?w(E.path):E.video?D(E.path):void 0}),[E]),console.log(k),f.a.createElement(f.a.Fragment,null,f.a.createElement(o.a,Object.assign({className:A.root,style:k?{backgroundImage:"url(".concat(k,")")}:null},z()),S?f.a.createElement(h,{src:S}):null,f.a.createElement(u.a,null,f.a.createElement(s.a,{className:A.upload,variant:"outlined",elevation:0,color:"secondary"},f.a.createElement(m.a,{container:!0,justify:"center",alignContent:"center",style:{height:"100%"}},f.a.createElement("input",I()),f.a.createElement(g.a,{icon:"cloud-upload-alt"}),f.a.createElement(m.a,{container:!0,justify:"center"},L?f.a.createElement(p.a,{align:"center"},"Drop the files here ..."):f.a.createElement(p.a,{align:"center"},"Drag 'n' drop some files here, or click to select files"))))),O))}},350:function(e,t,a){"use strict";a.r(t);var n=a(31),r=a(321),c=a(344),i=a(345),l=a(99),o=a(101),u=a(323),s=a(0),m=a.n(s),p=a(14),d=a.n(p),f=a(20),b=a(354),g=a(333),v=a(355),E=a(336),h=a(337),j=a(347),O=a(357),y=a(341),C=a(320),k=a(243),w=a(118),x=Object(r.a)((function(e){return{input:{marginBottom:e.spacing(1)}}})),F=function(e){var t=e.addClient,a=void 0===t?function(){}:t,r=x(),c=Object(s.useState)(!1),i=Object(n.a)(c,2),l=i[0],o=i[1],u=Object(s.useState)(""),p=Object(n.a)(u,2),F=p[0],S=p[1],D=Object(s.useState)(""),N=Object(n.a)(D,2),P=N[0],z=N[1],I=Object(s.useState)(),L=Object(n.a)(I,2),A=L[0],W=L[1],R=Object(s.useState)(!1),B=Object(n.a)(R,2),J=B[0],M=B[1],U=function(){var e=Object(f.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(F&&A&&!J&&P){e.next=2;break}return e.abrupt("return");case 2:return M(!0),(t=new FormData).append("name",F),t.append("facebookName",P),t.append("file",A),e.prev=7,e.next=10,a(t);case 10:M(!1),S(""),z(""),W(null),Q(),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(7),M(!1);case 20:case"end":return e.stop()}}),e,null,[[7,17]])})));return function(){return e.apply(this,arguments)}}(),Q=function(){return o(!1)};return m.a.createElement(m.a.Fragment,null,m.a.createElement(b.a,{title:"create client",position:"bottom"},m.a.createElement(g.a,{color:"primary",onClick:function(){return o(!0)}},m.a.createElement(w.a,{size:"lg",icon:"plus"}))),m.a.createElement(v.a,{open:l,onClose:Q,"aira-labelledby":"create-client-dialog"},m.a.createElement(E.a,{id:"create-client-dialog"},"Create Client"),m.a.createElement(h.a,{style:{minWidth:"350px"}},m.a.createElement(j.a,{className:r.input,onChange:function(e){return S(e.target.value)},value:F,autoFocus:!0,fullWidth:!0,label:"name",type:"text"}),m.a.createElement(j.a,{className:r.input,onChange:function(e){return z(e.target.value)},value:P,fullWidth:!0,label:"Facebook page title",type:"text"}),m.a.createElement(O.a,{style:{margin:"16px 0 8px"}},"Profile Picture"),m.a.createElement(k.a,{setFile:W})),m.a.createElement(y.a,null,m.a.createElement(C.a,{onClick:Q},"Cancel"),m.a.createElement(C.a,{startIcon:m.a.createElement(w.a,{icon:"save",style:{fontSize:"100%"}}),color:"primary",disabled:!F||J,onClick:U},"Save"))))},S=a(275),D=a(342),N=a(302),P=a(276),z=a(340),I=a(343),L=a(32);function A(e){return m.a.createElement(S.a,Object.assign({button:!0,component:L.b},e))}var W=function(e){var t=e.name,a=e.profilePicture,n=e.slug;e.length;return m.a.createElement(m.a.Fragment,null,m.a.createElement(A,{to:"".concat(n,"/posts/fb")},m.a.createElement(D.a,null,m.a.createElement(N.a,{alt:t,src:a})),m.a.createElement(P.a,{primary:t})))},R=function(e){var t=e.clients;return m.a.createElement(z.a,null,t.map((function(e,a){return m.a.createElement(m.a.Fragment,{key:e.slug},m.a.createElement(W,e),t.length-1===a?null:m.a.createElement(I.a,null))})))},B=a(148),J=a(147),M=a(339),U=a(338),Q=a(277),T=function(e){var t=e.setFilteredList,a=void 0===t?function(){}:t,r=e.searchProperty,c=void 0===r?"":r,i=e.list,l=void 0===i?[]:i,o=Object(s.useState)(""),u=Object(n.a)(o,2),p=u[0],d=u[1];Object(s.useEffect)((function(){if(l){var e=l.filter((function(e){return-1!==e[c].toLowerCase().search(p.toLowerCase())}));a(e)}}),[p,l,c,a]);return m.a.createElement(M.a,null,m.a.createElement(O.a,{htmlFor:"search"},"search"),m.a.createElement(U.a,{type:"text",id:"search",onChange:function(e){d(e.target.value)},endAdornment:m.a.createElement(Q.a,{position:"end"},m.a.createElement(w.a,{icon:"search"}))}))},q=a(233),G=Object(r.a)((function(e){return{root:{}}}));t.default=function(){var e=Object(s.useState)(null),t=Object(n.a)(e,2),a=t[0],r=t[1],p=Object(J.c)(),d=G(),f=Object(J.b)(["clients",{}],B.c),b=f.isLoading,g=f.data,v=Object(J.a)(B.e,{onSuccess:function(e){p.invalidateQueries("clients")}}),E=Object(n.a)(v,1)[0];return b?null:m.a.createElement(m.a.Fragment,null,m.a.createElement(q.a,null,m.a.createElement("title",null,"Dashboard")),m.a.createElement("div",{className:d.root},m.a.createElement(c.a,{maxWidth:"lg"},m.a.createElement(i.a,null,m.a.createElement(l.a,{container:!0,justify:"space-between"},m.a.createElement(T,{list:g,setFilteredList:r,searchProperty:"name"}),m.a.createElement(F,{addClient:E})))),m.a.createElement(c.a,{maxWidth:"lg"},m.a.createElement(o.a,{clone:!0,mt:2},m.a.createElement(u.a,null,g.length>0?m.a.createElement(R,{clients:a||g}):m.a.createElement("div",null))))))}}}]);
//# sourceMappingURL=14.f646b16f.chunk.js.map