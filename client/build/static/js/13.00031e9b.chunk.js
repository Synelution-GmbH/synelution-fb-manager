(this["webpackJsonpsynelution-fb-manager"]=this["webpackJsonpsynelution-fb-manager"]||[]).push([[13],{493:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(478),r=n(1),i=n.n(r),c=(n(485),n(527)),o=function(e){var t=e.asset,n=e.className,r=e.smallImg,o=Object(a.a)(e,["asset","className","smallImg"]);return t&&t.path?t.image?i.a.createElement("img",Object.assign({},o,{className:n,src:r?t.thumb:t.path,alt:""})):i.a.createElement(c.a,{className:n,containerStyles:{position:"relative",marginBottom:"8px"},src:t.path}):null}},513:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var a=n(47),r=n.n(a),i=n(68),c=n(107),o=n(478),l=n(145),s=n(1),u=n.n(s),d=n(1123),m=n(1088),p=n(479),f=n(514),b=function(e){var t=[new window.ClipboardItem(Object(l.a)({},e.type,e))];return navigator.clipboard.write(t)},g=function(e){var t=e.src;return new Promise((function(e,n){var a=document.createElement("canvas"),r=a.getContext("2d"),i=new Image;i.onload=function(){a.height=i.height,a.width=i.width,r.drawImage(i,0,0);t.replace(/\.\w{1,}$/g,".png");a.toBlob((function(t){e(t)}),"image/png",1)},i.src=t}))},v=function(e){var t=e.value,n=e.type,a=Object(o.a)(e,["value","type"]),l=Object(s.useState)(!1),v=Object(c.a)(l,2),x=v[0],h=v[1],j=function(){var e=Object(i.a)(r.a.mark((function e(n){var a,i,c;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.stopPropagation(),e.next=3,Object(f.a)();case 3:if(e.prev=3,-1===t.search(/\.(gif|jpe?g|bmp)$/g)){e.next=12;break}return e.next=7,g({src:t});case 7:return a=e.sent,e.next=10,b(a);case 10:e.next=25;break;case 12:if(-1===t.search(/\.(png)$/g)){e.next=23;break}return e.next=15,fetch(t);case 15:return i=e.sent,e.next=18,i.blob();case 18:return c=e.sent,e.next=21,b(c);case 21:e.next=25;break;case 23:return e.next=25,navigator.clipboard.writeText(t);case 25:h(!0),e.next=31;break;case 28:e.prev=28,e.t0=e.catch(3),console.log(e.t0);case 31:case"end":return e.stop()}}),e,null,[[3,28]])})));return function(t){return e.apply(this,arguments)}}();switch(Object(s.useEffect)((function(){x&&setTimeout((function(){h(!1)}),1e3)}),[x]),n){case"icon":return u.a.createElement(d.a,{title:x?"Copied":"Copy",placement:"top"},u.a.createElement(m.a,Object.assign({variant:"contained"},a,{color:"primary",onClick:j,size:"medium",style:{padding:"10px",fontSize:"inherit",minWidth:"auto"}}),u.a.createElement(p.a,{icon:"copy"})));default:return u.a.createElement(m.a,Object.assign({variant:"contained"},a,{color:"primary",onClick:j,size:"medium",style:{padding:"8px 16px"},endIcon:u.a.createElement(p.a,{icon:"copy",style:{marginLeft:"8px"}})}),x?"Copied":"Copy")}}},514:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(47),r=n.n(a),i=n(68),c=function(){var e=Object(i.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.permissions.query({name:"clipboard-write",allowWithoutGesture:!1});case 3:return t=e.sent,n=t.state,e.abrupt("return","granted"===n);case 8:return e.prev=8,e.t0=e.catch(0),e.abrupt("return",!1);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}()},527:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n(107),r=n(478),i=n(1),c=n.n(i),o=n(1089),l=n(1095),s=n(479),u=Object(o.a)((function(e){return{video:{width:"100%",height:"100%",objectFit:"cover",transition:"0.3s"},button:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",zIndex:2,opacity:0,visibility:"hidden",transition:"0.3s",color:"#fff"},videoContainer:{zIndex:99,position:"absolute",left:0,top:0,width:"100%",height:"100%",fontSize:0,"&:before":{content:'""',left:0,top:0,position:"absolute",width:"100%",height:"100%",background:"#000",opacity:0,transition:"0.3s"},"&:hover .MuiIconButton-root":{opacity:1,visibility:"visible"},"&:hover:before":{opacity:.3}}}})),d=function(e){var t=e.containerStyles,n=Object(r.a)(e,["containerStyles"]),o=Object(i.useRef)(),d=Object(i.useState)("init"),m=Object(a.a)(d,2),p=m[0],f=m[1],b=u();return Object(i.useEffect)((function(){o.current&&"init"!==p&&(p?o.current.pause():o.current.play())}),[p]),c.a.createElement("div",{className:b.videoContainer,style:t},c.a.createElement("video",Object.assign({ref:o,className:b.video,loop:!0},n)),c.a.createElement(l.a,{className:b.button,onClick:function(e){e.stopPropagation(),f(!p)}},c.a.createElement(s.a,{icon:p?"play":"pause"})))}},533:function(e,t,n){"use strict";n.d(t,"b",(function(){return I})),n.d(t,"a",(function(){return L}));var a=n(107),r=n(1),i=n.n(r),c=n(517),o=n(534),l=n(494),s=n(478),u=n(228),d=n(1089),m=n(1099),p=n(458),f=n(1100),b=n(1123),g=n(1073),v=n(1093),x=n(609),h=(n(607),n(608)),j=n(612),O=n(479),E=n(531),y=function(e){var t=e.children,n=Object(s.a)(e,["children"]),c=Object(E.b)((function(){return{xy:[0,0]}})),o=Object(a.a)(c,2),l=o[0].xy,u=o[1],d=Object(r.useRef)({xOffset:0,yOffset:0}),m=Object(r.useRef)(),p=function(e){d.current.initialX=e.clientX-d.current.xOffset,d.current.initialY=e.clientY-d.current.yOffset,d.current.active=!0,document.body.style.cursor="grabbing",document.body.style.pointerEvents="none",m.current&&(m.current.style.cursor="grabbing")},f=function(){d.current.initialX=d.current.currentX,d.current.initialY=d.current.currentY,d.current.active=!1,document.body.style.cursor="auto",document.body.style.pointerEvents="all",m.current&&(m.current.style.cursor="grab")},b=function(e){d.current.active&&(e.preventDefault(),d.current.currentX=e.clientX-d.current.initialX,d.current.currentY=e.clientY-d.current.initialY,d.current.xOffset=d.current.currentX,d.current.yOffset=d.current.currentY,u({xy:[d.current.currentX,d.current.currentY]}))};Object(r.useEffect)((function(){if(m.current)return m.current.addEventListener("mousedown",p,!1),window.addEventListener("mouseup",f,!1),window.addEventListener("mousemove",b,!1),function(){m.current&&(m.current.removeEventListener("mousedown",p,!1),window.removeEventListener("mouseup",f,!1),window.removeEventListener("mousemove",b,!1))}}));return i.a.createElement(E.a.div,Object.assign({},n,{ref:m,style:{pointerEvents:"all",willChange:"transform",cursor:"grab",transform:l.interpolate((function(e,t){return"translate3d(".concat(e,"px,").concat(t,"px,0)")}))}}),"function"===typeof t?t({setTransform:function(e,t){d.current={xOffset:e,yOffset:t},u({xy:[e,t]})}}):t)},k=Object(d.a)((function(e){return{avatar:{overflow:"visible"},closePicker:{position:"absolute",top:"18px",left:"100%",width:"30px",cursor:"pointer",justifyContent:"center",backgroundColor:e.palette.primary.main,padding:"6px 8px",borderBottomRightRadius:"4px",borderTopRightRadius:"4px",color:"#fff",display:"flex",transition:"0.3s","&:hover ":{backgroundColor:e.palette.primary.dark}},picker:function(t){var n=t.open;return{top:"100%",position:"absolute",opacity:n?1:0,visibility:n?"visible":"hidden",zIndex:n?100:10,"& .emoji-mart":{boxShadow:"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)!important",border:"none",padding:e.spacing(1)},"& .emoji-mart-anchor":{cursor:"pointer"},"& .emoji-mart .emoji-mart-emoji":{cursor:"pointer"},"& .emoji-mart .emoji-mart-emoji span":{cursor:"pointer"}}}}})),w=i.a.memo((function(e){var t=e.onSelect,n=e.className,c=e.renderPicker,o=void 0===c||c,l=Object(s.a)(e,["onSelect","className","renderPicker"]),u=Object(r.useState)(),d=Object(a.a)(u,2),m=d[0],p=d[1],f=k({open:m});return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",null,i.a.createElement(g.a,Object.assign({},l,{className:f.avatar+" "+n,variant:"rounded",onClick:function(){return p(!m)}}),i.a.createElement(O.a,{icon:m?"times":"smile"})),i.a.createElement(y,{className:f.picker},(function(e){var n=e.setTransform;return o?i.a.createElement("div",{style:{transition:"0.3s",opacity:m?1:0,transform:m?"scale(1)":"scale(0.8)",transformOrigin:"center top"}},i.a.createElement(b.a,{title:"close",placement:"top"},i.a.createElement("div",{className:f.closePicker,onClick:function(){return p(!1)}},i.a.createElement(O.a,{icon:"times"}))),i.a.createElement(b.a,{title:"reset position"},i.a.createElement("div",{className:f.closePicker,style:{top:"50px"},onClick:function(){return n(0,0)}},i.a.createElement(O.a,{icon:"redo"}))),i.a.createElement(j.a,{onClick:function(){return console.log("click")},onLeave:function(){return console.log("leave")},notFoundEmoji:"sob",title:"Emojies",set:"facebook",data:h,onSelect:function(e){t(e.native)}})):null}))))})),S=n(513),C=Object(u.a)(l.a)((function(e){return{padding:e.theme.spacing(2)}})),N=Object(d.a)((function(e){return{root:{height:"100%",overflow:"visible","& .MuiAvatar-root.tool":{backgroundColor:e.palette.primary.main,transition:"0.3s","&:hover":{backgroundColor:e.palette.primary.dark}},"& .emoji-picker":{cursor:"pointer"},"::spelling-error":{color:"red"},"& .editor":{flexGrow:1}},toolbar:{padding:"".concat(e.spacing(1),"px ").concat(e.spacing(2),"px"),backgroundColor:e.palette.grey[100],width:"100%"}}})),z=function(e){var t=e.onChange,n=e.toolbar,a=e.children,c=e.serializedValue,o=e.value,u=e.editor,d=e.style,h=void 0===d?null:d,j=e.disabled,O=void 0!==j&&j,E=Object(s.a)(e,["onChange","toolbar","children","serializedValue","value","editor","style","disabled"]),y=Object(x.a)(),k=y.ref,z=y.inView,F=N(),I=Object(r.useRef)({focus:{offset:0,path:[0,0]},anchor:{offset:0,path:[0,0]}}),R=Object(r.useCallback)((function(e){u.selection||(u.selection=I.current),u.insertText(e)}),[u]);return i.a.createElement(m.a,{ref:k,className:F.root,style:h},i.a.createElement(p.a,{container:!0,direction:"column",alignItems:"stretch",style:{height:"100%"}},i.a.createElement(l.c,{editor:u,value:o,onChange:t},i.a.createElement(C,Object.assign({},E,{readOnly:O,spellCheck:!0,className:"editor",placeholder:"Beginn typing !!",onBlur:function(){return I.current=u.selection}}))),n?i.a.createElement(f.a,{className:F.toolbar,variant:"dense",p:1},i.a.createElement(p.a,{container:!0,justify:"space-between",alignItems:"center"},i.a.createElement(p.a,{item:!0},i.a.createElement(p.a,{container:!0,justify:"flex-start"},i.a.createElement(w,{className:"emoji-picker tool",renderPicker:z,onSelect:R}))),i.a.createElement(p.a,{item:!0},i.a.createElement(p.a,{container:!0,justify:"flex-end"},a,i.a.createElement(S.a,{value:c}),i.a.createElement(b.a,{title:"character count",placement:"bottom"},i.a.createElement(g.a,{variant:"rounded",color:"primary",className:"tool",style:{marginLeft:"8px"}},i.a.createElement(v.a,null,c.length))))))):null))};z.defaultProps={toolbar:!0};n(485),n(553);var F=n(1101),I=function(e){e.id;var t=e.content,n=void 0===t?null:t,c=e.editorRef,o=(e.children,e.onSave),l=void 0===o?function(){}:o,s=e.editorProps,u=void 0===s?{}:s,d=e.disabled,m=void 0!==d&&d,p=e.saveDelay,f=void 0===p?1e3:p,b=Object(r.useState)(n),g=Object(a.a)(b,2),v=g[0],x=g[1],h=Object(r.useRef)();return i.a.createElement(F.a,Object.assign({className:"ie-editor editor"},u,{ref:function(e){return c.current=e},value:v,disabled:m,onChange:function(e){var t=e.target.value;clearTimeout(h.current),h.current=setTimeout((function(){console.log("save"),console.log(t),l({serializedValue:t})}),f),x(t)}}))},R=[{type:"paragraph",children:[{text:""}]}],B=function(e){return e.map((function(e){return c.c.string(e)})).join("\n")},P=function(e){return e.split("\n").map((function(e){return{children:[{text:e}]}}))},L=function(e){e.id;var t=e.content,n=void 0===t?null:t,s=e.editorRef,u=e.children,d=e.onSave,m=void 0===d?function(){}:d,p=e.editorProps,f=void 0===p?{}:p,b=e.disabled,g=void 0!==b&&b,v=e.saveDelay,x=void 0===v?1e3:v,h=Object(r.useState)(n?P(n):R),j=Object(a.a)(h,2),O=j[0],E=j[1],y=Object(r.useRef)(),k=Object(r.useMemo)((function(){return Object(o.a)(Object(l.d)(Object(c.i)()))}),[]);Object(r.useEffect)((function(){s&&(s.current=k)}),[]),Object(r.useEffect)((function(){if(!n)return E(R);E(P(n))}),[n]);var w=B(O);return i.a.createElement(z,Object.assign({},f,{editor:k,value:O,disabled:g,serializedValue:w,onChange:function(e){if(1===k.operations.length&&"set_selection"===k.operations[0].type)return E(e);clearTimeout(y.current),y.current=setTimeout((function(){m({value:e,serializedValue:B(e)})}),x),E(e)}}),u)}},561:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(107),r=n(1),i=n.n(r),c=n(757),o=n(755);function l(e){return i.a.createElement(o.a,Object.assign({elevation:6,variant:"filled"},e))}var s=function(e){var t=e.text,n=e.toggle,o=e.severity,s=void 0===o?"error":o,u=e.autoHideDuration,d=void 0===u?3e4:u,m=Object(r.useState)(!1),p=Object(a.a)(m,2),f=p[0],b=p[1];Object(r.useEffect)((function(){t&&b(!0)}),[n]);var g=function(){return b(!1)};return i.a.createElement(c.a,{open:f,autoHideDuration:d,onClose:g},i.a.createElement(l,{onClose:g,severity:s},t))}},592:function(e,t,n){"use strict";n.d(t,"a",(function(){return v}));var a=n(478),r=n(1089),i=n(1099),c=n(1113),o=n(458),l=n(1073),s=n(1093),u=n(1),d=n.n(u),m=n(479),p=n(493),f='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',b=Object(r.a)((function(e){return{card:{borderRadius:"3px",margin:"0 8px 16px",fontFamily:f,boxShadow:"none",border:"1px solid #dbdbdb",fontSize:"16px","-webkitFontSmoothing":"antialiased",maxWidth:"600px"},cardContent:{padding:"16px 16px 16px"},iconContainer:{padding:"8px 8px 8px"},icon:{fontSize:"24px",margin:"0 8px"},title:{fontWeight:600,fontSize:"14px",fontFamily:f,lineHeight:"18px"},text:{fontFamily:f,fontSize:"14px",lineHeight:"18px",whiteSpace:"pre-wrap",wordBreak:"break-word",fontWeight:400,color:"#050505",unicodeBidi:"-webkit-isolate","& .editor":{margin:"-20px -4px -6px",boxShadow:"none"}},asset:{width:"100%"},profile:{width:"32px",height:"32px"}}})),g=function(e){var t=e.assets,n=(e.assetOrder,Object(a.a)(e,["assets","assetOrder"]));return!t||t.length<=0?null:d.a.createElement(p.a,Object.assign({},n,{asset:t[0]}))},v=function(e){var t=e.client,n=e.editorComponent,a=e.assets,r=e.assetOrder,p=e.children,f=b(),v=Object(u.useMemo)((function(){return Math.floor(500*Math.random())+500}),[]);return d.a.createElement(i.a,{className:f.card},d.a.createElement(c.a,{className:f.cardContent},d.a.createElement(o.a,{container:!0,wrap:"nowrap",alignItems:"center"},d.a.createElement(l.a,{className:f.profile,src:t.profilePicture,alt:""}),d.a.createElement("div",{style:{paddingLeft:"14px"}},d.a.createElement(s.a,{className:f.title,variant:"h6"},t.slug)))),d.a.createElement(g,{className:f.asset,assetOrder:r,assets:a}),d.a.createElement(c.a,{className:f.iconContainer},d.a.createElement(o.a,{container:!0},d.a.createElement(m.a,{className:f.icon,prefix:"ig",icon:"like"}),d.a.createElement(m.a,{className:f.icon,prefix:"ig",icon:"comment"}),d.a.createElement(m.a,{className:f.icon,prefix:"ig",icon:"share"}),d.a.createElement(o.a,{container:!0,style:{flexGrow:1,width:"auto"},justify:"flex-end"},d.a.createElement(m.a,{className:f.icon,prefix:"ig",icon:"save"}))),d.a.createElement("span",{style:{fontSize:"14px",display:"inline-block",fontWeight:600,padding:"6px 8px 0"}},v," likes")),d.a.createElement("div",{variant:"div",className:f.text},n),d.a.createElement("div",{style:{borderBottom:"1px solid #efefef",marginBottom:"9px"}}),p)}},593:function(e,t,n){},595:function(e,t,n){"use strict";n.d(t,"a",(function(){return P}));var a=n(1089),r=n(1099),i=n(1113),c=n(458),o=n(1073),l=n(1093),s=n(1),u=n.n(s),d=n(479),m=n(478),p=n(493),f=n(107),b=n(145),g=n(485),v=n(753),x=n(751),h=n(754),j=n(752),O=(n(593),Object(a.a)((function(e){return{button:{width:"48px",height:"48px",backgroundColor:"#e4e6eb",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},buttonContainer:function(e){var t=e.right;return{cursor:"pointer",padding:"16px",position:"absolute",right:t?0:"auto",left:t?"auto":0,top:0,height:"100%",display:"flex",alignItems:"center",backgroundColor:"rgba(0,0,0,0.1)",opacity:.6,transition:"0.25s","&:hover":{transform:t?"translateX(6px)":"translateX(-6px)",opacity:1},"& svg":{fontSize:"24px"}}},exitButton:{position:"absolute",top:"16px",left:"16px",zIndex:100,cursor:"pointer","& svg":{fontSize:"24px"}}}}))),E=function(e){var t=O();return u.a.createElement("div",Object.assign({},e,{className:t.button+" "+t.exitButton}),u.a.createElement(d.a,{icon:"times"}))},y=function(e){var t=e.direction,n=void 0===t?"right":t,a=e.className,r=Object(m.a)(e,["direction","className"]),i=O({right:"right"===n});return u.a.createElement("div",Object.assign({},r,{className:i.buttonContainer+" "+a}),u.a.createElement("div",{className:i.button},u.a.createElement(d.a,{icon:"chevron-".concat(n)})))},k=n(594);v.a.use([x.a]);var w=Object(a.a)((function(){var e,t;return{gallery:{marginBottom:"6px","& .swiper-slide .img":{fontSize:0},"& .swiper-slide":{margin:"0 4px",width:"302px",borderRadius:"max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",overflow:"hidden",border:"1px solid #e2e4e7"},"& .slide img":{objectFit:"cover",cursor:"pointer",position:"relative",width:"302px",height:"302px"}},galleryWrapper:{width:"auto",display:"flex",justifyContent:"flex-start",alignItems:"flex-start",flexWrap:"nowrap"},slider:{display:"flex",justifyContent:"center",alignItems:"center"},slide:{maxWidth:"1200px",maxHeight:"90vh",userSelect:"none","& img":{objectFit:"contain"}},link:{display:"block",textDecoration:"none",color:"inherit","&:active, &:visited":{color:"inherit"}},slideContent:{height:"73px",boxSizing:"border-box",padding:"8px 12px 11px",fontSize:"16px",display:"flex",flexFlow:"column",justifyContent:"center",alignItems:"flex-start"},text:(e={display:"block",lineClamp:1,lineHeight:1.2308},Object(b.a)(e,"display","-webkit-box"),Object(b.a)(e,"boxOrient","vertical"),Object(b.a)(e,"overflow","hidden"),Object(b.a)(e,"fontSize",".8125rem"),Object(b.a)(e,"margin",0),Object(b.a)(e,"fontFamily","Segoe UI, Helvetica, Arial, sans-serif"),e),title:(t={lineHeight:"1.3333",fontSize:".9375em",display:"block"},Object(b.a)(t,"display","-webkit-box"),Object(b.a)(t,"boxOrient","vertical"),Object(b.a)(t,"overflow","hidden"),Object(b.a)(t,"lineClamp",2),Object(b.a)(t,"fontWeight",600),Object(b.a)(t,"margin",0),Object(b.a)(t,"fontFamily","Segoe UI, Helvetica, Arial, sans-serif"),t),sliderButton:{zIndex:100,opacity:1,backgroundColor:"transparent",transform:"translateX(0)!important","& > div":{backgroundColor:"#fff",transition:"0.3s",boxShadow:"0 2px 8px rgba(0,0,0,0.1)","&:hover":{backgroundColor:"#e4e6eb"}}}}})),S=function(e){var t=e.assets,n=e.assetOrder,a=Object(m.a)(e,["assets","assetOrder"]),r=w(),i=Object(s.useMemo)((function(){return Object(g.d)(t,(function(e){return e}),"name")}),[t]),c=Object(s.useRef)(),o=Object(s.useState)(!1),l=Object(f.a)(o,2),d=l[0],p=l[1],b=Object(s.useState)(!1),v=Object(f.a)(b,2),x=v[0],O=v[1];return u.a.createElement("div",{style:{paddingLeft:"10px"}},u.a.createElement(h.a,Object.assign({},{loop:!1,speed:500,slidesPerView:"auto",setWrapperSize:!0},{simulateTouch:!1,onSwiper:function(e){c.current=e,p(c.current.isBeginning),O(c.current.isEnd)},className:r.gallery}),n.map((function(e,t){return u.a.createElement(j.a,{href:i[e].link,target:"_blank",rel:"noreferrer noopener",tag:i[e].link?"a":"div",key:e,className:r.link},u.a.createElement(C,Object.assign({asset:i[e]},a)))})),u.a.createElement(y,{className:r.sliderButton,direction:"left",onClick:function(){c.current&&(c.current.slidePrev(),p(c.current.isBeginning),O(c.current.isEnd))},style:{opacity:d?0:1,visibility:d?"hidden":"visible"}}),u.a.createElement(y,{className:r.sliderButton,direction:"right",onClick:function(){c.current&&(c.current.slideNext(),p(c.current.isBeginning),O(c.current.isEnd))},style:{opacity:x?0:1,visibility:x?"hidden":"visible"}})))},C=function(e){var t=e.asset,n=(e.path,Object(m.a)(e,["asset","path"])),a=w(),r=Object(s.useRef)();return Object(s.useEffect)((function(){Object(g.c)()&&(Object(k.webkitLineClamp)(r.current.querySelector(".".concat(a.title)),2),Object(k.webkitLineClamp)(r.current.querySelector(".".concat(a.text)),1))}),[]),u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{className:"img"},u.a.createElement(p.a,Object.assign({asset:t},n))),u.a.createElement("div",{ref:r,className:a.slideContent},u.a.createElement("p",{className:a.title},t.title),u.a.createElement("p",{className:a.text},t.content)))},N=n(1122),z=Object(a.a)((function(e){return{gallery:{position:"relative",marginBottom:"6px","& img":{height:"100%",width:"100%",objectFit:"cover",position:"absolute",top:0,left:0},"& .MuiGrid-item":{cursor:"pointer",position:"relative",paddingRight:"1.5px",paddingLeft:"1.5px","&:first-child":{marginBottom:"3px",paddingLeft:"0px"},"&:nth-child(2)":{paddingLeft:"0px"},"& .content-sizer":{position:"relative",width:"100%",paddingTop:"50%"},"&:last-child":{paddingRight:0}}},slider:{display:"flex",justifyContent:"center",alignItems:"center"},slide:{maxWidth:"1200px",maxHeight:"90vh",userSelect:"none","& img":{objectFit:"contain"}},overlay:{backgroundColor:"rgba(0,0,0,0.4)",position:"absolute",top:0,left:0,width:"100%",height:"100%",fontSize:"2rem",fontWeight:500,color:"#fff",fontFamily:"Segoe UI, Helvetica, Arial, sans-serif"}}})),F=function(e){var t=e.assets,n=e.assetOrder,a=Object(m.a)(e,["assets","assetOrder"]),r=z(),i=Object(s.useState)(n[0]),o=Object(f.a)(i,2),l=o[0],d=o[1],b=Object(s.useState)(!1),v=Object(f.a)(b,2),x=v[0],h=v[1],j=Object(s.useMemo)((function(){return Object(g.d)(t,(function(e){return e}),"name")}),[t]);Object(g.g)(),Object(s.useEffect)((function(){x&&setTimeout((function(){var e=n[O("right")],t=n[O("left")];!function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=new Image,e[t].src=t<0||arguments.length<=t?void 0:arguments[t]}(j[e].path,j[t].path)}),200)}),[x,l]);var O=function(e){var t=n.length,a="right"===e?1:-1;return(n.indexOf(l)+a+t)%t},k=function(e){var t=O(e);d(n[t])};return u.a.createElement(u.a.Fragment,null,u.a.createElement(c.a,{container:!0,className:r.gallery},n.map((function(e,n){var i=n>0&&t.length>=3,o=t.length>=4;return n>=4?null:u.a.createElement(c.a,{key:e,item:!0,xs:i?o?4:6:12,onClick:function(){d(e),h(!0)}},u.a.createElement("div",{className:"content-sizer",style:{paddingTop:i?"100%":"50%"}},u.a.createElement(p.a,Object.assign({asset:j[e],"data-object-fit":0===n?"cover":null,smallImg:i},a)),t.length>4&&3===n?u.a.createElement("div",{className:r.slider+" "+r.overlay},u.a.createElement("span",null,"+",t.length-3)):null))}))),u.a.createElement(N.a,{onClose:function(){return h(!1)},className:r.slider,disableAutoFocus:!0,open:x},u.a.createElement(u.a.Fragment,null,u.a.createElement(E,{onClick:function(){return h(!1)}}),u.a.createElement(y,{direction:"left",onClick:function(){return k("left")}}),u.a.createElement(I,{className:r.slide,path:j[l].path}),u.a.createElement(y,{onClick:function(){return k("right")}}))))},I=function(e){var t=e.path,n=Object(m.a)(e,["path"]);return Object(g.g)(),u.a.createElement("img",Object.assign({},n,{src:t,alt:""}))},R=function(e){var t=e.assets,n=e.assetOrder,a=Object(m.a)(e,["assets","assetOrder"]);return!t||t.length<=0?null:1===t.length?u.a.createElement(p.a,Object.assign({},a,{asset:t[0]})):t.filter((function(e){return e.content})).length>0?u.a.createElement(S,Object.assign({},a,{assetOrder:n,assets:t})):u.a.createElement(F,Object.assign({},a,{assetOrder:n,assets:t}))},B=Object(a.a)((function(e){return{card:{borderRadius:"max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",margin:"0 8px 16px",fontFamily:"Helvetica",boxShadow:"0 1px 2px rgba(0,0,0,0.2)",fontSize:"16px","-webkitFontSmoothing":"antialiased",maxWidth:"500px",position:"relative"},cardContent:{padding:"12px 16px 12px"},title:{fontWeight:600,fontSize:".9375em",fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",lineHeight:1.3333},date:{lineHeight:1.2308,fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",fontSize:".8125em",color:"#65676b"},text:{fontFamily:"Segoe UI, Helvetica, Arial, sans-serif",fontSize:".9375em",lineHeight:1.34,whiteSpace:"pre-wrap",wordBreak:"break-word",fontWeight:400,color:"#050505",unicodeBidi:"-webkit-isolate","& .editor":{margin:"-28px -4px -8px",boxShadow:"none"}},asset:{width:"100%"}}})),P=function(e){var t=e.client,n=e.editorComponent,a=e.dateFormatted,s=e.assets,m=e.children,p=e.assetOrder,f=B();return u.a.createElement(r.a,{className:f.card},u.a.createElement(i.a,{className:f.cardContent},u.a.createElement(c.a,{container:!0,wrap:"nowrap"},u.a.createElement(o.a,{src:t.profilePicture,alt:""}),u.a.createElement("div",{style:{flexGrow:1,paddingLeft:"6px",marginBottom:"8px"}},u.a.createElement(l.a,{className:f.title,variant:"h6"},t.facebookName),u.a.createElement(l.a,{className:f.date,variant:"caption"},a," \xb7 ",u.a.createElement(d.a,{icon:"globe-americas"}))))),u.a.createElement("div",{variant:"div",className:f.text},n),u.a.createElement(R,{className:f.asset,assetOrder:p,assets:s}),m)}},756:function(e,t,n){"use strict";n.r(t);var a=n(478),r=n(1),i=n.n(r),c=n(492),o=n(14),l=n(149),s=n(526),u=n(1115),d=n(458),m=n(107),p=n(1089),f=n(1113),b=n(1123),g=n(1088),v=n(525),x=n.n(v),h=n(479),j=n(533),O=n(518),E=n(494),y=n(561),k=n(1124),w=n(1104),S=n(1105),C=n(1114),N=n(1117),z=n(1112),F=n(459),I=n(486),R=Object(p.a)((function(e){return{buttonProgress:{color:e.palette.success.main,position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),B=function(e){var t=e.id,n=e.onSave,c=void 0===n?function(){}:n,o=Object(a.a)(e,["id","onSave"]),l=R(),s=Object(O.b)(),u=Object(r.useState)(!1),d=Object(m.a)(u,2),p=d[0],f=d[1],b=Object(r.useState)(),v=Object(m.a)(b,2),x=v[0],h=v[1],j=Object(r.useState)(),E=Object(m.a)(j,2),y=E[0],B=E[1],P=Object(I.l)().user,L=function(){return f(!1)};return i.a.createElement(i.a.Fragment,null,i.a.createElement(g.a,Object.assign({},o,{onClick:function(){return f(!0)}}),o.children),i.a.createElement(k.a,{open:p,onClose:L},i.a.createElement(w.a,null,"Bild Korrekturen"),i.a.createElement(S.a,null,i.a.createElement(C.a,null,"Bitte beschreiben Sie Ihre \xc4nderungsw\xfcnsche zur Abbildung im unten angezeigten Textfeld."),i.a.createElement(N.a,{value:x,onChange:function(e){return h(e.target.value)},label:"\xc4nderungsw\xfcnsche",multiline:!0,rows:3,fullWidth:!0,margin:"dense",variant:"outlined",focused:!0,autoFocus:!0})),i.a.createElement(z.a,null,i.a.createElement(g.a,{onClick:L},"Abbrechen"),i.a.createElement(g.a,{disabled:y||!x,variant:"contained",color:"primary",onClick:function(){if(x){B(!0);var e=P.username,n=P.email;s.emit("client change",{id:t,imageChanges:{text:x},clientName:e,clientEmail:n},(function(e){h(""),L(),c(),B(!1)}))}}},"Speichern",y?i.a.createElement(F.a,{className:l.buttonProgress,size:24}):null))))},P=Object(p.a)((function(e){return{button:function(t){return t.success?{backgroundColor:e.palette.success.main,"&:hover":{backgroundColor:e.palette.success.dark}}:null},buttonProgress:{color:e.palette.primary.main,position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),L=function(e){var t=e.approved,n=e.id,a=e.QUERY,o=Object(c.d)(),l=Object(O.b)(),s=Object(r.useState)(),u=Object(m.a)(s,2),d=u[0],p=u[1],f=P({success:t}),b=Object(I.l)().user;return Object(r.useEffect)((function(){p(!1)}),[t]),i.a.createElement(i.a.Fragment,null,i.a.createElement(g.a,{variant:"contained",className:f.button,startIcon:i.a.createElement(h.a,{icon:"check-circle"}),disabled:d,onClick:function(){if(!t){p(!0);var e=b.username,r=b.email;l.emit("client change",{id:n,approved:!0,clientName:e,clientEmail:r},(function(e){console.log("invalidate query"),o.invalidateQueries(a)}))}}},t?"Freigegeben":"Freigeben",d?i.a.createElement(F.a,{className:f.buttonProgress,size:24}):null))},H=n(595),T=n(592),W=n(485),Y=Object(p.a)((function(e){return{cardContent:{padding:"6px 16px 16px!important"}}})),U=function(e){var t=e.type,n=Object(a.a)(e,["type"]);return"fb"===t?i.a.createElement(H.a,Object.assign({},n,{type:t})):i.a.createElement(T.a,Object.assign({},n,{type:t}))},D=function(e){var t=e.QUERY,n=e.date,o=e.approved,l=e.id,s=e.content,u=e.type,p=Object(a.a)(e,["QUERY","date","approved","id","content","type"]),v=Object(c.d)(),k=Y({type:u}),w=Object(r.useRef)(),S=Object(O.b)(),C=Object(r.useMemo)((function(){return x()(n).format("D. MMMM")}),[n]),N=Object(r.useState)(null),z=Object(m.a)(N,2),F=z[0],R=z[1],P=Object(r.useState)(!1),H=Object(m.a)(P,2),T=H[0],D=H[1],M=Object(r.useState)({toggle:!1,text:""}),Q=Object(m.a)(M,2),A=Q[0],X=Q[1],V=Object(I.l)().user;return Object(r.useEffect)((function(){w.current&&T&&(W.a?w.current.focus():E.b.focus(w.current))}),[T]),i.a.createElement(U,Object.assign({},p,{type:u,dateFormatted:C,editorComponent:W.a?i.a.createElement(j.b,{editorRef:w,disabled:!T,content:s,saveDelay:300,onSave:function(e){var n=e.serializedValue;R(n),v.invalidateQueries(t)},id:l}):i.a.createElement(j.a,{editorRef:w,disabled:!T,content:s,saveDelay:300,editorProps:{toolbar:!1,style:{boxShadow:T?"box-shadow: inset 0px -3px 10px rgb(0 0 0 / 0.5)":"none"}},onSave:function(e){var n=e.serializedValue;R(n),v.invalidateQueries(t)},id:l})}),i.a.createElement(f.a,{className:k.cardContent},i.a.createElement(d.a,{container:!0,justify:"space-between"},i.a.createElement(L,{approved:o,id:l,QUERY:t}),i.a.createElement(d.a,{item:!0},i.a.createElement(B,{id:l,style:{marginRight:"8px"},color:"primary",onSave:function(){X({toggle:!A.toggle,text:"Bild Korrektur wurde gespeichert!",severity:"success"})}},"Bild Korrekturen"),i.a.createElement(b.a,{title:"\xc4ndern Sie den Text gleich direkt am Post!",placement:"top"},i.a.createElement(g.a,{variant:"contained",color:"primary",startIcon:i.a.createElement(h.a,{style:{fontSize:"100%"},icon:T?"check-circle":"pen"}),disabled:T&&!F,onClick:function(){if(T&&F){var e=V.username,t=V.email;S.emit("client change",{id:l,content:F,clientCorrected:!0,clientName:e,clientEmail:t},(function(){X({toggle:!A.toggle,text:"Korrektur wurde gespeichert!",severity:"success"})})),R(null)}D(!T)}},T?"Speichern":"Korrigieren"))))),i.a.createElement(y.a,Object.assign({autoHideDuration:15e3},A)))},M=n(47),Q=n.n(M),A=n(42),X=n(68),V=Object(p.a)((function(e){return{buttonProgress:{color:e.palette.success.main,position:"absolute",top:"50%",left:"50%",marginTop:-12,marginLeft:-12}}})),G=function(e){var t=e.id,n=e.QUERY,a=V(),o=Object(I.l)(),s=o.user,u=o.setUser,d=Object(r.useState)(!1),p=Object(m.a)(d,2),f=p[0],b=p[1],v=Object(r.useState)(""),x=Object(m.a)(v,2),h=x[0],j=x[1],O=Object(r.useState)(""),E=Object(m.a)(O,2),y=E[0],C=E[1],R=Object(r.useState)(!0),B=Object(m.a)(R,2),P=B[0],L=B[1],H=Object(c.d)(),T=function(){return b(!1)},W=function(){var e=Object(X.a)(Q.a.mark((function e(a){var r;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a.preventDefault(),h){e.next=3;break}return e.abrupt("return",C("Geben Sie einen Code ein"));case 3:return L(!0),e.prev=4,e.next=7,Object(I.a)({code:h,id:t});case 7:r=e.sent,H.setQueryData(n,(function(){return r.queryData})),u(Object(A.a)(Object(A.a)({},r.code),{},{username:r.code.name,role:"guest"})),T(),L(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(4),C(e.t0.response.data),L(!1);case 18:case"end":return e.stop()}}),e,null,[[4,14]])})));return function(t){return e.apply(this,arguments)}}();return Object(r.useEffect)((function(){Object(X.a)(Q.a.mark((function e(){var a;return Q.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,L(!0),e.next=4,Object(I.a)({code:"check",id:t});case 4:a=e.sent,H.setQueryData(n,(function(){return a.queryData})),u(Object(A.a)(Object(A.a)({},a.code),{},{username:a.code.name,role:"guest"})),T(),L(!1),console.log(a),e.next=18;break;case 12:if(e.prev=12,e.t0=e.catch(0),console.log(e.t0),L(!1),s){e.next=18;break}return e.abrupt("return",b(!0));case 18:case"end":return e.stop()}}),e,null,[[0,12]])})))()}),[]),Object(r.useEffect)((function(){}),[s]),console.log(P),i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{loading:P}),i.a.createElement(k.a,{open:f,onBackdropClick:function(e){e.preventDefault()}},i.a.createElement("form",{onSubmit:W},i.a.createElement(w.a,null,"Geben Sie Ihren Code ein \u0505(\u2256\u203f\u2256\u0505)"),i.a.createElement(S.a,null,i.a.createElement(N.a,{value:h,onChange:function(e){return j(e.target.value)},label:"Code",fullWidth:!0,margin:"dense",variant:"outlined",focused:!0,autoFocus:!0,error:!!y,helperText:y})),i.a.createElement(z.a,null,i.a.createElement(g.a,{disabled:!h,color:"primary",onClick:W},"Absenden",P?i.a.createElement(F.a,{className:a.buttonProgress,size:24}):null)))))},q=(n(685),function(e){var t=e.posts,n=e.client,r=e.QUERY;return i.a.createElement(i.a.Fragment,null,i.a.createElement(u.a,{maxWidth:"lg"},i.a.createElement(d.a,{container:!0,justify:"center",alignItems:"flex-start",alignContent:"flex-start"},t.map((function(e){var t=e._id,c=Object(a.a)(e,["_id"]);return i.a.createElement(i.a.Fragment,{key:t},i.a.createElement(D,Object.assign({},c,{QUERY:r,id:t,client:n})),i.a.createElement("br",null))})))))});t.default=function(){var e=Object(o.h)().id,t=Object(I.l)().user,n=Object(r.useMemo)((function(){return["client-link",{id:e}]}),[e]),a=Object(c.c)(n,(function(){return Object(s.b)(e)}),{enabled:t}),m=a.isLoading,p=a.data;return i.a.createElement(i.a.Fragment,null,i.a.createElement(l.a,{loading:m}),i.a.createElement(u.a,{style:{padding:"1rem",marginBottom:"1rem"}},i.a.createElement(d.a,{container:!0,alignItems:"center",justify:"center"},i.a.createElement("img",{src:"/assets/logo.svg",style:{maxWidth:"300px",marginRight:"1rem"},alt:"logo"}))),i.a.createElement(G,{id:e,QUERY:n}),p&&t?i.a.createElement(q,{QUERY:n,client:p.client,posts:p.posts}):null)}}}]);
//# sourceMappingURL=13.00031e9b.chunk.js.map