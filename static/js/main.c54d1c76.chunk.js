(this["webpackJsonpscroll-spy-example"]=this["webpackJsonpscroll-spy-example"]||[]).push([[0],{10:function(e,t,r){},15:function(e,t,r){},16:function(e,t,r){"use strict";r.r(t);r(10);var n=r(0),a=r.n(n),c=r(6),i=r.n(c),o=r(8),l=r(4),u=r(1),s=r(7),d=a.a.createContext(void 0),m=a.a.createContext(void 0);function p(e){var t=e.children,r=e.options,n=void 0===r?{threshold:.5}:r,c=a.a.useState([]),i=Object(s.a)(c,2),o=i[0],p=i[1],h=a.a.useRef(new window.IntersectionObserver((function(e){e.forEach((function(e){e.intersectionRatio>(n.threshold||.5)&&(window.history.pushState(null,"","#".concat(e.target.id)),p((function(t){return t.map((function(t){return t.id===e.target.id?Object(u.a)(Object(u.a)({},t),{},{isActive:!0}):Object(u.a)(Object(u.a)({},t),{},{isActive:!1})}))})))}))}),n)).current,f=a.a.useMemo((function(){return{nodes:o,sortedNodeTree:o.reduce((function(e,t){if(t.parent){var r=e[t.parent]||{},n=r[t.topic||"unsorted"]||[];return Object(u.a)(Object(u.a)({},e),{},{[t.parent]:Object(u.a)(Object(u.a)({},r),{},{[t.topic||"unsorted"]:[].concat(Object(l.a)(n),[t])})})}var a=e[t.topic||"unsorted"]||[];return Object(u.a)(Object(u.a)({},e),{},{[t.topic||"unsorted"]:[].concat(Object(l.a)(a),[t])})}),{})}}),[o]),v=a.a.useMemo((function(){return{addNode:function(e,t){var r=t.title,n=t.parentTopic,a=t.topic;e&&(h.observe(e),p((function(t){return[].concat(Object(l.a)(t),[{title:r,id:e.id,isActive:!1,topic:n?a:void 0,parent:n||a}])})))}}}),[h]);return a.a.useEffect((function(){return function(){return h.disconnect()}}),[h]),a.a.createElement(d.Provider,{value:f},a.a.createElement(m.Provider,{value:v},t))}function h(e){var t=e.children,r=e.title,n=e.id,c=e.inheritedTopic,i=e.parentTopic,l=Object(o.a)(e,["children","title","id","inheritedTopic","parentTopic"]),u=function(){var e=a.a.useContext(m);if(!e)throw new Error("useScrollSpy must be used within the ScrollSpyProvider");return e.addNode}();return a.a.createElement("div",Object.assign({id:n,ref:function(e){return u(e,{title:r,topic:c,parentTopic:i})}},l),t)}function f(e){var t=e.children,r=e.name,n=e.inheritedTopic,c=a.a.Children.map(t,(function(e){return a.a.isValidElement(e)?a.a.cloneElement(e,{inheritedTopic:r,parentTopic:n}):e}));return a.a.createElement("div",null,c)}function v(e){return e.map((function(e){return a.a.createElement("li",{key:e.id},a.a.createElement("a",{style:{display:"block",fontWeight:e.isActive?"bold":"normal",color:e.isActive?"var(--color-fuchsia)":"#5850ec"},href:"#".concat(e.id)},e.title))}))}function E(){var e=function(){var e=a.a.useContext(d);if(!e)throw new Error("useScrollSpyState must be used within the ScrollSpyProvider");return e}().sortedNodeTree;return a.a.createElement("div",{className:"navbar-container"},a.a.createElement("ul",null,Object.keys(e).map((function(t){return Array.isArray(e[t])?v(e[t]):a.a.createElement("div",{key:t},a.a.createElement("h2",null,t),Object.keys(e[t]).map((function(r){return a.a.createElement("ul",{key:r},"unsorted"!==r&&a.a.createElement("h3",{style:{fontWeight:e[t][r].some((function(e){return e.isActive}))?"bold":"normal"}},r),v(e[t][r]))})))}))))}r(15);var b=function(e){var t=e.children,r=e.color;return a.a.createElement("div",{style:{background:"var(--color-".concat(r,")"),height:"100vh"}},a.a.createElement("h1",null,t))};var y=function(){return a.a.createElement(p,null,a.a.createElement(E,null),a.a.createElement(f,{name:"Introduction"},a.a.createElement(h,{id:"welcome",title:"Welcome!"},a.a.createElement(b,{color:"purple"},"Welcome!")),a.a.createElement(f,{name:"Prepare"},a.a.createElement(h,{id:"get-your-supplies",title:"Get your supplies ready"},a.a.createElement(b,{color:"navy"},"Get your supplies ready")),a.a.createElement(h,{id:"watch-mars-base",title:"Watch: Mars Base"},a.a.createElement(b,{color:"blue"},"Watch this video")),a.a.createElement(h,{id:"read-space-suits",title:"Read space suits"},a.a.createElement(b,{color:"aqua"},"Read space suits"))),a.a.createElement(f,{name:"Design your repair kit"},a.a.createElement(h,{id:"gather-materials",title:"Gather your materials"},a.a.createElement(b,{color:"teal"},"Gather your materials")))),a.a.createElement(h,{id:"goodbye",title:"Goodbye!"},a.a.createElement(b,{color:"red"},"Byee!")))};i.a.render(a.a.createElement(y,null),document.getElementById("root"))},9:function(e,t,r){e.exports=r(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.c54d1c76.chunk.js.map