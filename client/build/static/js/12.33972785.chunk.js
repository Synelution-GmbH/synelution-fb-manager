(this["webpackJsonpsynelution-fb-manager"]=this["webpackJsonpsynelution-fb-manager"]||[]).push([[12],{510:function(e,t,a){"use strict";a.d(t,"a",(function(){return g}));var n=a(47),r=a.n(n),i=a(68),c=a(107),o=a(477),l=a(146),s=a(1),u=a.n(s),m=a(678),d=a(476),p=a(511),f=function(e){var t=[new window.ClipboardItem(Object(l.a)({},e.type,e))];return navigator.clipboard.write(t)},b=function(e){var t=e.src;return new Promise((function(e,a){var n=document.createElement("canvas"),r=n.getContext("2d"),i=new Image;console.log("asd"),i.onload=function(){n.height=i.height,n.width=i.width,r.drawImage(i,0,0);var a=t.replace(/\.\w{1,}$/g,".png");console.log(a),n.toBlob((function(t){e(t)}),"image/png",1)},i.src=t}))},g=function(e){var t=e.value,a=Object(o.a)(e,["value"]),n=Object(s.useState)(!1),l=Object(c.a)(n,2),g=l[0],v=l[1],x=function(){var e=Object(i.a)(r.a.mark((function e(a){var n,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a.stopPropagation(),e.next=3,Object(p.a)();case 3:if(e.sent,e.prev=4,-1===t.search(/\.(gif|jpe?g|bmp)$/g)){e.next=13;break}return e.next=8,b({src:t});case 8:return n=e.sent,e.next=11,f(n);case 11:e.next=26;break;case 13:if(-1===t.search(/\.(png)$/g)){e.next=24;break}return e.next=16,fetch(t);case 16:return i=e.sent,e.next=19,i.blob();case 19:return c=e.sent,e.next=22,f(c);case 22:e.next=26;break;case 24:return e.next=26,navigator.clipboard.writeText(t);case 26:v(!0),e.next=32;break;case 29:e.prev=29,e.t0=e.catch(4),console.log(e.t0);case 32:case"end":return e.stop()}}),e,null,[[4,29]])})));return function(t){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){g&&setTimeout((function(){v(!1)}),1e3)}),[g]),u.a.createElement(m.a,Object.assign({},a,{color:"primary",onClick:x,variant:"contained",size:"medium",style:{padding:"8px 16px"},endIcon:u.a.createElement(d.a,{icon:"copy",style:{marginLeft:"8px"}})}),g?"Copied":"Copy")}},511:function(e,t,a){"use strict";a.d(t,"a",(function(){return c}));var n=a(47),r=a.n(n),i=a(68),c=function(){var e=Object(i.a)(r.a.mark((function e(){var t,a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.permissions.query({name:"clipboard-write",allowWithoutGesture:!1});case 3:return t=e.sent,a=t.state,e.abrupt("return","granted"===a);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},512:function(e,t,a){"use strict";a.d(t,"a",(function(){return s}));var n=a(107),r=a(1),i=a.n(r),c=a(711),o=a(706);function l(e){return i.a.createElement(o.a,Object.assign({elevation:6,variant:"filled"},e))}var s=function(e){var t=e.text,a=e.toggle,o=e.severity,s=void 0===o?"error":o,u=e.autoHideDuration,m=void 0===u?3e4:u,d=Object(r.useState)(!1),p=Object(n.a)(d,2),f=p[0],b=p[1];Object(r.useEffect)((function(){t&&b(!0)}),[a]);var g=function(){return b(!1)};return i.a.createElement(c.a,{open:f,autoHideDuration:m,onClose:g},i.a.createElement(l,{onClose:g,severity:s},t))}},536:function(e,t,a){"use strict";a.d(t,"b",(function(){return i})),a.d(t,"a",(function(){return c}));var n=a(84),r=a.n(n),i=function(e){return r.a.post("/client-link",e).then((function(e){return e.data}))},c=function(e){return r.a.get("/client-link/".concat(e)).then((function(e){return e.data}))}},537:function(e,t,a){"use strict";a.d(t,"a",(function(){return B}));var n=a(107),r=a(1),i=a.n(r),c=a(538),o=a(602),l=a(495),s=a(228),u=a(679),m=a(686),d=a(457),p=a(703),f=a(712),b=a(660),g=a(683),v=a(477),x=(a(592),a(593)),E=a(598),h=a(459),j=a(690),O=a(476),y=Object(u.a)((function(e){return{avatar:{overflow:"visible"},picker:function(t){var a=t.open;return{top:"100%",position:"absolute",opacity:a?1:0,visibility:a?"visible":"hidden","& .emoji-mart":{boxShadow:"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)!important",border:"none",padding:e.spacing(1)},"& .emoji-mart-anchor":{cursor:"pointer"}}}}})),w=function(e){var t=e.onSelect,a=e.className,c=Object(v.a)(e,["onSelect","className"]),o=Object(r.useState)(),l=Object(n.a)(o,2),s=l[0],u=l[1],m=y({open:s});return i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,Object.assign({},c,{className:m.avatar+" "+a,variant:"rounded",onClick:function(){return u(!s)}}),i.a.createElement(O.a,{icon:"smile"})),i.a.createElement(h.a,{className:m.picker},i.a.createElement(j.a,{in:s,style:{transformOrigin:"0 0 0"}},i.a.createElement(E.a,{notFoundEmoji:"sob",title:"Emojies",set:"facebook",data:x,onSelect:function(e){t(e.native),u(!1)}}))))},k=a(510),S=Object(s.a)(l.a)((function(e){return{padding:e.theme.spacing(2)}})),C=Object(u.a)((function(e){return{root:{height:"100%",overflow:"visible","& .MuiAvatar-root.tool":{backgroundColor:e.palette.primary.main,transition:"0.3s","&:hover":{backgroundColor:e.palette.primary.dark}},"& .emoji-picker":{cursor:"pointer"},"::spelling-error":{color:"red"},"& .editor":{flexGrow:1}},toolbar:{padding:"".concat(e.spacing(1),"px ").concat(e.spacing(2),"px"),zIndex:20,backgroundColor:e.palette.grey[100],width:"100%"}}})),N=function(e){var t=e.onChange,a=e.toolbar,n=e.children,c=e.serializedValue,o=e.value,s=e.editor,u=e.style,v=void 0===u?null:u,x=e.disabled,E=void 0!==x&&x,h=C(),j=Object(r.useRef)({focus:{offset:0,path:[0,0]},anchor:{offset:0,path:[0,0]}});return i.a.createElement(m.a,{className:h.root,style:v},i.a.createElement(d.a,{container:!0,direction:"column",alignItems:"stretch",style:{height:"100%"}},i.a.createElement(l.c,{editor:s,value:o,onChange:t},i.a.createElement(S,{readOnly:E,spellCheck:!0,className:"editor",placeholder:"Beginn typing !!",onBlur:function(){return j.current=s.selection}})),a?i.a.createElement(p.a,{className:h.toolbar,variant:"dense",p:1},i.a.createElement(d.a,{container:!0,justify:"space-between",alignItems:"center"},i.a.createElement(d.a,{item:!0,sm:4},i.a.createElement(d.a,{container:!0,justify:"flex-start"},i.a.createElement(w,{className:"emoji-picker tool",onSelect:function(e){s.selection||(s.selection=j.current),s.insertText(e)}}))),i.a.createElement(d.a,{item:!0,sm:8},i.a.createElement(d.a,{container:!0,justify:"flex-end"},n,i.a.createElement(k.a,{value:c}),i.a.createElement(f.a,{title:"character count",placement:"bottom"},i.a.createElement(b.a,{variant:"rounded",color:"primary",className:"tool",style:{marginLeft:"8px"}},i.a.createElement(g.a,null,c.length))))))):null))};N.defaultProps={toolbar:!0};var F=[{type:"paragraph",children:[{text:""}]}],z=function(e){return e.map((function(e){return c.c.string(e)})).join("\n")},R=function(e){return e.split("\n").map((function(e){return{children:[{text:e}]}}))},B=function(e){e.id;var t=e.content,a=void 0===t?null:t,s=e.editorRef,u=e.children,m=e.onSave,d=void 0===m?function(){}:m,p=e.editorProps,f=void 0===p?{}:p,b=e.disabled,g=void 0!==b&&b,v=e.saveDelay,x=void 0===v?1e3:v,E=Object(r.useState)(a?R(a):F),h=Object(n.a)(E,2),j=h[0],O=h[1],y=Object(r.useRef)(),w=Object(r.useMemo)((function(){return Object(o.a)(Object(l.d)(Object(c.i)()))}),[]);Object(r.useEffect)((function(){s&&(s.current=w)}),[]),Object(r.useEffect)((function(){if(!a)return O(F);O(R(a))}),[a]);var k=z(j);return i.a.createElement(N,Object.assign({},f,{editor:w,value:j,disabled:g,serializedValue:k,onChange:function(e){clearTimeout(y.current),y.current=setTimeout((function(){console.log("save"),d({value:e,serializedValue:z(e)})}),x),O(e)}}),u)}},618:function(e,t,a){"use strict";a.r(t);var n=a(477),r=a(1),i=a.n(r),c=a(493),o=a(14),l=a(150),s=a(536),u=a(702),m=a(457),d=a(107),p=a(679),f=a(687),b=a(678),g=a(509),v=a.n(g),x=a(476),E=a(537),h=a(488),j=a(495),O=a(512),y=a(713),w=a(694),k=a(695),S=a(2),C=(a(21),a(60)),N=a(683),F=r.forwardRef((function(e,t){return r.createElement(N.a,Object(S.a)({component:"p",variant:"body1",color:"textSecondary",ref:t},e))})),z=Object(C.a)({root:{marginBottom:12}},{name:"MuiDialogContentText"})(F),R=a(705),B=a(699),I=a(458),H=Object(p.a)((function(e){return{buttonProgress:{color:e.palette.success.main,position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),M=function(e){var t=e.id,a=e.onSave,c=void 0===a?function(){}:a,o=Object(n.a)(e,["id","onSave"]),l=H(),s=Object(h.b)(),u=Object(r.useState)(!1),m=Object(d.a)(u,2),p=m[0],f=m[1],g=Object(r.useState)(),v=Object(d.a)(g,2),x=v[0],E=v[1],j=Object(r.useState)(),O=Object(d.a)(j,2),S=O[0],C=O[1],N=function(){return f(!1)};return i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,Object.assign({},o,{onClick:function(){return f(!0)}}),o.children),i.a.createElement(y.a,{open:p,onClose:N},i.a.createElement(w.a,null,"Bild Korrekturen"),i.a.createElement(k.a,null,i.a.createElement(z,null,"Bitte beschreiben Sie Ihre \xc4nderungsw\xfcnsche zur Abbildung im unten angezeigten Textfeld."),i.a.createElement(R.a,{value:x,onChange:function(e){return E(e.target.value)},label:"\xc4nderungsw\xfcnsche",multiline:!0,rows:3,fullWidth:!0,margin:"dense",variant:"outlined",focused:!0,autoFocus:!0})),i.a.createElement(B.a,null,i.a.createElement(b.a,{onClick:N},"Abbrechen"),i.a.createElement(b.a,{disabled:S||!x,variant:"contained",color:"primary",onClick:function(){x&&(C(!0),s.emit("client change",{id:t,imageChanges:{text:x}},(function(e){E(""),N(),c(),C(!1)})))}},"Speichern",S?i.a.createElement(I.a,{className:l.buttonProgress,size:24}):null))))},P=Object(p.a)((function(e){return{button:function(t){return t.success?{backgroundColor:e.palette.success.main,"&:hover":{backgroundColor:e.palette.success.dark}}:null},buttonProgress:{color:e.palette.primary.main,position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),U=function(e){var t=e.approved,a=e.id,n=e.QUERY,o=Object(c.c)(),l=Object(h.b)(),s=Object(r.useState)(),u=Object(d.a)(s,2),m=u[0],p=u[1],f=P({success:t});return Object(r.useEffect)((function(){p(!1)}),[t]),i.a.createElement(i.a.Fragment,null,i.a.createElement(b.a,{variant:"contained",className:f.button,startIcon:i.a.createElement(x.a,{icon:"check-circle"}),disabled:m,onClick:function(){p(!0),l.emit("client change",{id:a,approved:!t},(function(e){o.invalidateQueries(n)}))}},t?"Freigegeben":"Freigeben",m?i.a.createElement(I.a,{className:f.buttonProgress,size:24}):null))},W=a(686),Q=a(660),T=function(e){var t=e.asset,a=e.className;return t&&t.path?t.image?i.a.createElement("img",{className:a,src:t.path}):i.a.createElement("video",{className:a,src:t.path}):null},A=Object(p.a)((function(e){return{card:{borderRadius:"max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",margin:"0 8px 16px",fontFamily:"Helvetica",boxShadow:"0 1px 2px rgba(0,0,0,0.2)",fontSize:"16px","-webkitFontSmoothing":"antialiased",maxWidth:"500px"},cardContent:{padding:"12px 16px 12px"},title:{fontWeight:600,fontSize:".9375em",fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",lineHeight:1.3333},date:{lineHeight:1.2308,fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",fontSize:".8125em",color:"#65676b"},text:{fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",fontSize:".9375em",lineHeight:1.34,whiteSpace:"pre-wrap",wordBreak:"break-word",fontWeight:400,color:"#050505",unicodeBidi:"-webkit-isolate","& .editor":{margin:"-28px -4px -8px",boxShadow:"none"}},asset:{width:"100%"}}})),D=function(e){var t=e.client,a=e.editorComponent,n=e.dateFormatted,r=e.asset,c=e.children,o=A();return i.a.createElement(W.a,{className:o.card},i.a.createElement(f.a,{className:o.cardContent},i.a.createElement(m.a,{container:!0,wrap:"nowrap"},i.a.createElement(Q.a,{src:t.profilePicture,alt:""}),i.a.createElement("div",{style:{flexGrow:1,paddingLeft:"6px",marginBottom:"8px"}},i.a.createElement(N.a,{className:o.title,variant:"h6"},t.facebookName),i.a.createElement(N.a,{className:o.date,variant:"caption"},n," \xb7 ",i.a.createElement(x.a,{icon:"globe-americas"}))))),i.a.createElement("div",{variant:"div",className:o.text},a),i.a.createElement(T,{className:o.asset,asset:r}),c)},L='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',Y=Object(p.a)((function(e){return{card:{borderRadius:"3px",margin:"0 8px 16px",fontFamily:L,boxShadow:"none",border:"1px solid #dbdbdb",fontSize:"16px","-webkitFontSmoothing":"antialiased",maxWidth:"600px"},cardContent:{padding:"16px 16px 16px"},iconContainer:{padding:"8px 8px 8px"},icon:{fontSize:"24px",margin:"0 8px"},title:{fontWeight:600,fontSize:"14px",fontFamily:L,lineHeight:"18px"},text:{fontFamily:L,fontSize:"14px",lineHeight:"18px",whiteSpace:"pre-wrap",wordBreak:"break-word",fontWeight:400,color:"#050505",unicodeBidi:"-webkit-isolate","& .editor":{margin:"-20px -4px -6px",boxShadow:"none"}},asset:{width:"100%"},profile:{width:"32px",height:"32px"}}})),K=function(e){var t=e.client,a=e.editorComponent,n=e.asset,c=e.children,o=Y(),l=Object(r.useMemo)((function(){return Math.floor(500*Math.random())+500}),[]);return i.a.createElement(W.a,{className:o.card},i.a.createElement(f.a,{className:o.cardContent},i.a.createElement(m.a,{container:!0,wrap:"nowrap",alignItems:"center"},i.a.createElement(Q.a,{className:o.profile,src:t.profilePicture,alt:""}),i.a.createElement("div",{style:{paddingLeft:"14px"}},i.a.createElement(N.a,{className:o.title,variant:"h6"},t.slug)))),i.a.createElement(T,{className:o.asset,asset:n}),i.a.createElement(f.a,{className:o.iconContainer},i.a.createElement(m.a,{container:!0},i.a.createElement(x.a,{className:o.icon,prefix:"ig",icon:"like"}),i.a.createElement(x.a,{className:o.icon,prefix:"ig",icon:"comment"}),i.a.createElement(x.a,{className:o.icon,prefix:"ig",icon:"share"}),i.a.createElement(m.a,{container:!0,style:{flexGrow:1,width:"auto"},justify:"flex-end"},i.a.createElement(x.a,{className:o.icon,prefix:"ig",icon:"save"}))),i.a.createElement("span",{style:{fontSize:"14px",display:"inline-block",fontWeight:600,padding:"6px 8px 0"}},l," likes")),i.a.createElement("div",{variant:"div",className:o.text},a),i.a.createElement("div",{style:{borderBottom:"1px solid #efefef",marginBottom:"9px"}}),c)},G=Object(p.a)((function(e){return{cardContent:{padding:"6px 16px 16px!important"}}})),V=function(e){var t=e.type,a=Object(n.a)(e,["type"]);return"fb"===t?i.a.createElement(D,Object.assign({},a,{type:t})):i.a.createElement(K,Object.assign({},a,{type:t}))},$=function(e){var t=e.QUERY,a=e.date,o=e.approved,l=e.id,s=e.content,u=e.type,p=Object(n.a)(e,["QUERY","date","approved","id","content","type"]),g=Object(c.c)(),y=G({type:u}),w=Object(r.useRef)(),k=Object(h.b)(),S=Object(r.useMemo)((function(){return v()(a).format("D. MMMM")}),[a]),C=Object(r.useState)(null),N=Object(d.a)(C,2),F=N[0],z=N[1],R=Object(r.useState)(!1),B=Object(d.a)(R,2),I=B[0],H=B[1],P=Object(r.useState)({toggle:!1,text:""}),W=Object(d.a)(P,2),Q=W[0],T=W[1];return Object(r.useEffect)((function(){w.current&&I&&j.b.focus(w.current)}),[I]),i.a.createElement(V,Object.assign({},p,{type:u,dateFormatted:S,editorComponent:i.a.createElement(E.a,{editorRef:w,disabled:!I,content:s,saveDelay:300,editorProps:{toolbar:!1,style:{boxShadow:"none"}},onSave:function(e){var a=e.serializedValue;z(a),g.invalidateQueries(t)},id:l})}),i.a.createElement(f.a,{className:y.cardContent},i.a.createElement(m.a,{container:!0,justify:"space-between"},i.a.createElement(U,{approved:o,id:l,QUERY:t}),i.a.createElement(m.a,{item:!0},i.a.createElement(M,{id:l,style:{marginRight:"8px"},color:"primary",onSave:function(){T({toggle:!Q.toggle,text:"Bild Korrektur wurde gespeichert!",severity:"success"})}},"Bild Korrekturen"),i.a.createElement(b.a,{variant:"contained",color:"primary",startIcon:i.a.createElement(x.a,{style:{fontSize:"100%"},icon:I?"check-circle":"pen"}),disabled:I&&!F,onClick:function(){I&&F&&(k.emit("client change",{id:l,content:F,clientCorrected:!0},(function(){T({toggle:!Q.toggle,text:"Korrektur wurde gespeichert!",severity:"success"})})),z(null)),H(!I)}},I?"Speichern":"Korrigieren")))),i.a.createElement(O.a,Object.assign({autoHideDuration:15e3},Q)))},J=function(e){var t=e.posts,a=e.client,r=e.QUERY;return i.a.createElement(u.a,{maxWidth:"lg"},i.a.createElement(m.a,{container:!0,justify:"center",alignItems:"flex-start",alignContent:"flex-start"},t.map((function(e){var t=e._id,c=Object(n.a)(e,["_id"]);return i.a.createElement(i.a.Fragment,{key:t},i.a.createElement($,Object.assign({},c,{QUERY:r,id:t,client:a})),i.a.createElement("br",null))}))))};t.default=function(){var e=Object(o.h)().id,t=Object(r.useMemo)((function(){return["client-link",{id:e}]}),[e]),a=Object(c.b)(t,(function(){return Object(s.a)(e)})),n=a.isLoading,d=a.data;return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{loading:n}),i.a.createElement(u.a,{style:{padding:"1rem",marginBottom:"1rem"}},i.a.createElement(m.a,{container:!0,alignItems:"center",justify:"center"},i.a.createElement("img",{src:"/assets/logo.svg",style:{maxWidth:"300px",marginRight:"1rem"}}))),d?i.a.createElement(J,{QUERY:t,client:d.client,posts:d.posts}):null)}}}]);
//# sourceMappingURL=12.33972785.chunk.js.map