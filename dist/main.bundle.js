!function(e){function t(t){for(var n,a,o=t[0],d=t[1],s=t[2],c=0,u=[];c<o.length;c++)a=o[c],Object.prototype.hasOwnProperty.call(l,a)&&l[a]&&u.push(l[a][0]),l[a]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);for(g&&g(t);u.length;)u.shift()();return i.push.apply(i,s||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,a=1;a<r.length;a++){var d=r[a];0!==l[d]&&(n=!1)}n&&(i.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},a={12:0},l={12:0},i=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.e=function(e){var t=[];a[e]?t.push(a[e]):0!==a[e]&&{1:1,2:1,4:1,9:1}[e]&&t.push(a[e]=new Promise(function(t,r){for(var n=({0:"vendor~cascader~editors-field~editors-form~editors-page~editors-section~input~transfer",1:"common",2:"vendor~editors-field~editors-form~editors-page~editors-section",3:"vendor~editors-form~editors-section~slider",4:"vendor~editors-field~editors-form",5:"vendor~editors-field~number",6:"checkbox",7:"checkboxgroup",8:"editors-field",9:"editors-form",10:"editors-page",11:"editors-section",13:"radio",14:"radiogroup",15:"slider",16:"starrating",17:"switch",18:"textarea",19:"vendor~cascader",21:"vendor~transfer"}[e]||e)+"."+e+".chunk.css",l=o.p+n,i=document.getElementsByTagName("link"),d=0;d<i.length;d++){var s=(g=i[d]).getAttribute("data-href")||g.getAttribute("href");if("stylesheet"===g.rel&&(s===n||s===l))return t()}var c=document.getElementsByTagName("style");for(d=0;d<c.length;d++){var g;if((s=(g=c[d]).getAttribute("data-href"))===n||s===l)return t()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=t,u.onerror=function(t){var n=t&&t.target&&t.target.src||l,i=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=n,delete a[e],u.parentNode.removeChild(u),r(i)},u.href=l,document.getElementsByTagName("head")[0].appendChild(u)}).then(function(){a[e]=0}));var r=l[e];if(0!==r)if(r)t.push(r[2]);else{var n=new Promise(function(t,n){r=l[e]=[t,n]});t.push(r[2]=n);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,o.nc&&d.setAttribute("nonce",o.nc),d.src=function(e){return o.p+""+({0:"vendor~cascader~editors-field~editors-form~editors-page~editors-section~input~transfer",1:"common",2:"vendor~editors-field~editors-form~editors-page~editors-section",3:"vendor~editors-form~editors-section~slider",4:"vendor~editors-field~editors-form",5:"vendor~editors-field~number",6:"checkbox",7:"checkboxgroup",8:"editors-field",9:"editors-form",10:"editors-page",11:"editors-section",13:"radio",14:"radiogroup",15:"slider",16:"starrating",17:"switch",18:"textarea",19:"vendor~cascader",21:"vendor~transfer"}[e]||e)+".chunk.js"}(e);var s=new Error;i=function(t){d.onerror=d.onload=null,clearTimeout(c);var r=l[e];if(0!==r){if(r){var n=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;s.message="Loading chunk "+e+" failed.\n("+n+": "+a+")",s.name="ChunkLoadError",s.type=n,s.request=a,r[1](s)}l[e]=void 0}};var c=setTimeout(function(){i({type:"timeout",target:d})},12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(t)},o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o.oe=function(e){throw console.error(e),e};var d=window.webpackJsonp=window.webpackJsonp||[],s=d.push.bind(d);d.push=t,d=d.slice();for(var c=0;c<d.length;c++)t(d[c]);var g=s;i.push([349,20]),r()}({0:function(e,t){e.exports=React},11:function(e,t){e.exports=ReactDOM},17:function(e,t){e.exports=antd},27:function(e,t,r){"use strict";var n=r(10),a=r(0),l=r(24),i=r(2);const o=()=>{const e={selectedField:null,selectedPage:null,selectedSection:null,selectedColumn:null,showFormEditor:null,formStore:null,factory:null,setFormStore:function(e){this.formStore=e},get availableConditionSources(){let e=[];return Object.keys(this.formStore.idFieldMap).forEach((t,r)=>{e.push({key:r,id:t,label:this.formStore.idFieldMap[t].label,name:this.formStore.idFieldMap[t].name})}),e},get availableExpressions(){let e=[];return l.h.PredicateConditions.forEach(t=>{e.push({value:t,name:t})}),e},get availableOperators(){let e=[];return l.h.PredicateOperators.forEach(t=>{e.push({value:t,name:t})}),e},get hasCondition(){return!!this.selectedField.condition},get numPredicates(){return this.selectedField.condition?this.selectedField.condition.predicates.length:0},addCondition:function(e){this.selectedField.setCondition(l.c.makeCondition(this.formStore,e))},removePredicate:function(e){let{condition:t}=this.selectedField,r=t.predicates.findIndex(t=>t.uuid==e);r>-1&&t.predicates.splice(r,1),0==t.predicates.length&&this.selectedField.setCondition(null)},addPredicate:function(e){if(this.selectedField.condition)this.selectedField.condition.addPredicates(...l.c.makePredicates(this.formStore,e));else{let t=l.c.makeCondition(this.formStore,{predicates:[e]});this.selectedField.setCondition(t)}},setCondition:function(e){this.selectedField.setCondition(e)},addValidationRule:function(e,t){this.selectedField.validator.rule.addConstraint(e,t)},updateValidationRule:function(e,t){this.selectedField.validator.rule.updateConstraint(e,t)},removeValidationRule:function(e){this.selectedField.validator.rule.removeConstraint(e)},setFieldProperty:function(e,t){this.selectedField.componentProps[e]=t},setComponentProperty:function(e,t){this.selectedField.componentProps[e]=t},reset(){this.selectedPage=null,this.selectedColumn=null,this.selectedSection=null,this.selectedField=null},get showFieldEditor(){return!!this.selectedField},get showPageEditor(){return!!this.selectedPage},get showColumnEditor(){return!!this.selectedColumn},get showSectionEditor(){return!!this.selectedSection},setFormEditorVisible:function(e=!1){this.reset(),this.showFormEditor=e},setEditable:function(e){if(this.reset(),e)switch(e._type){case"Page":this.selectedPage=e;break;case"Section":this.selectedSection=e;break;case"Column":this.selectedColumn=e;break;case"Field":this.selectedField=e}},get asJSONForm(){return Object(i.toJS)(this.formStore.form,{exportMapsAsObjects:!0})}};return Object(i.observable)(e)};r.d(t,"b",function(){return d}),r.d(t,"a",function(){return s});const d=a.createContext(null),s=e=>{const t=Object(n.a)(o);return t.setFormStore(e.formStore),a.createElement(d.Provider,{value:t},e.children)}},289:function(e,t,r){},349:function(e,t,r){"use strict";r.r(t);var n=r(3),a=r(24),l=r(49),i=(r(171),r(0)),o=r.n(i),d=r(11),s=r(27),c=r(28),g=(r(124),r(16)),u=(r(132),r(41)),m=(r(172),r(32)),p=(r(99),r(48)),f=(r(199),r(10)),h=r(23),b=(r(289),r(68));const E=b.a.div`
    padding: 4px;
    background-color: white;
`,y=b.a.div``,F=(e,t)=>Object.assign({userSelect:"none",background:e?"#ededed":"#fff"},t),x=()=>{const e=Object(f.a)(()=>({droppableIndex:0,menuTheme:"light",menuMode:"vertical-left",submenuMode:"inline",submenuCollapsed:!1,asDroppableGroup:function({dropId:e,dropType:t,key:r,title:n,icon:a,groups:l}){return i.createElement(h.c,{droppableId:e,type:t,isDropDisabled:!0},(e,t)=>i.createElement(y,Object.assign({isDraggingOver:t.isDraggingOver,ref:e.innerRef},e.droppableProps),i.createElement(u.a,{inlineCollapsed:this.submenuCollapsed,mode:"inline",theme:this.menuTheme},i.createElement(u.a.SubMenu,{key:r,title:i.createElement("span",null,n)},l.map((e,t)=>i.createElement(u.a.Item,{key:t,title:e.title},i.createElement(h.b,{type:e.dragType,draggableId:e.dragId,index:this.droppableIndex++},(t,r)=>i.createElement(y,Object.assign({ref:t.innerRef},t.draggableProps,t.dragHandleProps,{style:F(r.isDragging,t.draggableProps.style)}),i.createElement("span",null,i.createElement(g.a,{type:e.icon})," ",e.title),t.placeholder)))))),e.placeholder))},asDroppable:function(e,t,r,n,a,l){return i.createElement(h.c,{droppableId:e,type:t,isDropDisabled:!0},(e,t)=>i.createElement(y,Object.assign({isDraggingOver:t.isDraggingOver,ref:e.innerRef},e.droppableProps),i.createElement(u.a,{mode:this.menuMode,theme:this.menuTheme},i.createElement(u.a.Item,{title:r},i.createElement(h.b,{type:n,draggableId:a,index:this.droppableIndex++},(e,t)=>i.createElement(E,Object.assign({ref:e.innerRef},e.draggableProps,e.dragHandleProps,{style:F(t.isDragging,e.draggableProps.style)}),i.createElement("span",null,i.createElement(g.a,{type:l}),r),e.placeholder))))))},asDraggableCard:function(e,t,r,n,a,l){return i.createElement(h.c,{isCombineEnabled:!1,droppableId:e,type:t,isDropDisabled:!0,ignoreContainerClipping:!1},(e,t)=>i.createElement(i.Fragment,null,i.createElement(y,Object.assign({isDraggingOver:t.isDraggingOver,ref:e.innerRef},e.droppableProps),i.createElement(h.b,{type:n,draggableId:a,index:this.droppableIndex++},(e,t)=>i.createElement(m.a.Grid,{style:{border:"none",width:"33%",textAlign:"center",padding:"2px"}},i.createElement(E,Object.assign({ref:e.innerRef},e.draggableProps,e.dragHandleProps,{style:F(t.isDragging,e.draggableProps.style)}),i.createElement("span",null,i.createElement(g.a,{type:l}),i.createElement("br",null),r)),t.isDragging&&i.createElement(E,null,i.createElement("span",null,i.createElement(g.a,{type:l}),i.createElement("br",null),r)))))))}}));return Object(f.b)(()=>i.createElement(m.a,{bordered:!1,title:"Palette",bodyStyle:{padding:"1px"}},i.createElement(m.a,{size:"small",bodyStyle:{fontSize:"12px",padding:"0px",marginBottom:"1px"},bordered:!1,title:i.createElement("small",null,"Containers")},e.asDraggableCard("NewPage","Page","Page","Page","p1","layout"),e.asDraggableCard("NewSection","Section","Section","Section","s1","menu"),e.asDraggableCard("NewColumn","Column","Column","Column","c1","column-width")),i.createElement(m.a,{size:"small",bodyStyle:{fontSize:"12px",padding:"0px",marginBottom:"1px"},bordered:!1,title:i.createElement("small",null,"Basic")},e.asDraggableCard("NewTextField","Field","Text","Field","input","font-size"),e.asDraggableCard("NewTextField","Field","Number","Field","number","calculator"),e.asDraggableCard("NewTextField","Field","Check","Field","checkbox","check-square"),e.asDraggableCard("NewTextField","Field","Radio","Field","radio","check-circle"),e.asDraggableCard("NewTextField","Field","TextArea","Field","textarea","profile"),e.asDraggableCard("NewTextField","Field","TextBlock","Field","textblock","read"),e.asDraggableCard("NewTextField","Field","Checks","Field","checkboxgroup","check-square"),e.asDraggableCard("NewTextField","Field","Radios","Field","radiogroup","check-circle"),e.asDraggableCard("NewTextField","Field","Select","Field","select","menu"),e.asDraggableCard("NewTextField","Field","Cascader","Field","cascader","menu-unfold")),i.createElement(m.a,{size:"small",bodyStyle:{fontSize:"12px",padding:"0px",marginBottom:"1px"},bordered:!1,title:i.createElement("small",null,"Date and Time")},e.asDraggableCard("NewTextField","Field","Date","Field","datepicker","calendar"),e.asDraggableCard("NewTextField","Field","Range","Field","daterange","calendar"),e.asDraggableCard("NewTextField","Field","Month","Field","monthpicker","calendar"),e.asDraggableCard("NewTextField","Field","Time","Field","timepicker","calendar"),e.asDraggableCard("NewTextField","Field","Year","Field","yearpicker","calendar")),i.createElement(m.a,{size:"small",bodyStyle:{fontSize:"12px",padding:"0px",marginBottom:"1px"},bordered:!1,title:i.createElement("small",null,"Interactive")},e.asDraggableCard("NewTextField","Field","HTML","Field","htmlfragment","code"),e.asDraggableCard("NewTextField","Field","Slider","Field","slider","control"),e.asDraggableCard("NewTextField","Field","Rating","Field","starrating","star"),e.asDraggableCard("NewTextField","Field","Switch","Field","switch","poweroff"),e.asDraggableCard("NewTextField","Field","Upload","Field","transfer","file-zip"))))};var C=r(37),v=(r(73),r(34));r(69),r(214);const S=b.a.div`
    min-height: 50px;
    flex: 0 0 100px;
`,w=b.a.div`
    cursor: 'grab';
`,P=e=>{switch(e){case"Form":return"cyan";case"Page":return"magenta";case"Section":return"geekblue";case"Column":return"gold";case"Field":return"green";default:return"red"}},D=(e,t)=>Object.assign({userSelect:"none",borderRadius:"10px",border:e?"2px solid red":"none",padding:"0.5rem"},t),O=(e,t)=>({userSelect:"none",padding:"0.5rem 0.5rem 0",marginTop:"4px",border:e?"2px solid #52c41a":"none",borderRadius:"10px"}),k=e=>{const t=i.useContext(s.b);if(!t)throw new Error("Store is null");return i.createElement(h.b,{type:"Field",draggableId:e.fld.uuid,index:e.index},(r,n)=>i.createElement(w,Object.assign({ref:r.innerRef},r.draggableProps,{style:D(n.isDragging,r.draggableProps.style)}),i.createElement(v.a,{type:"dashed",shape:"circle",onClick:()=>t.setEditable(e.fld),size:"small",icon:"edit",className:"fl-tree-button"}),i.createElement(C.a,Object.assign({style:{userSelect:"none"}},r.dragHandleProps,{status:n.isDragging?"processing":"default",color:P("Field"),text:`Field - ${e.fld.label}`})),r.placeholder))},j=e=>{const t=i.useContext(s.b);if(!t)throw new Error("Store is null");return i.createElement(h.b,{type:"Column",draggableId:e.col.uuid,index:e.index},(r,n)=>i.createElement(w,Object.assign({ref:r.innerRef},r.draggableProps,{style:D(n.isDragging,r.draggableProps.style)}),i.createElement(v.a,{type:"dashed",shape:"circle",onClick:()=>t.setEditable(e.col),size:"small",icon:"edit",className:"fl-tree-button"}),i.createElement(C.a,Object.assign({style:{userSelect:"none"}},r.dragHandleProps,{status:n.isDragging?"processing":"default",color:P("Column"),text:`Column - ${e.col.name}`})),i.createElement(h.c,{droppableId:`${e.col.uuid}|fields`,type:"Field"},(t,r)=>i.createElement(S,Object.assign({isDraggingOver:r.isDraggingOver,ref:t.innerRef},t.droppableProps,{style:O(r.isDraggingOver)}),e.col.fields.map((e,t)=>i.createElement(k,{key:e.uuid,fld:e,index:t})),t.placeholder)),r.placeholder))},N=e=>{const t=i.useContext(s.b);if(!t)throw new Error("Store is null");return i.createElement(h.b,{type:"Section",draggableId:e.sec.uuid,index:e.index},(r,n)=>i.createElement(w,Object.assign({ref:r.innerRef},r.draggableProps,{style:D(n.isDragging,r.draggableProps.style)}),i.createElement(v.a,{type:"dashed",shape:"circle",onClick:()=>t.setEditable(e.sec),size:"small",icon:"edit",className:"fl-tree-button"}),i.createElement(C.a,Object.assign({style:{userSelect:"none"}},r.dragHandleProps,{status:n.isDragging?"processing":"default",color:P("Section"),text:`Section - ${e.sec.name}`})),i.createElement(h.c,{droppableId:`${e.sec.uuid}|columns`,type:"Column"},(t,r)=>i.createElement(S,Object.assign({isDraggingOver:r.isDraggingOver,ref:t.innerRef},t.droppableProps,{style:O(r.isDraggingOver)}),e.sec.columns.map((e,t)=>i.createElement(j,{key:e.uuid,col:e,index:t})),t.placeholder)),r.placeholder))},T=e=>{const t=i.useContext(s.b);if(!t)throw new Error("Store is null");let{title:r,subtitle:n,name:a}=e.page;return i.createElement(h.b,{type:"Page",draggableId:e.page.uuid,index:e.index},(r,n)=>i.createElement(w,Object.assign({ref:r.innerRef},r.draggableProps,{style:D(n.isDragging,r.draggableProps.style)}),i.createElement(v.a,{type:"dashed",onClick:()=>{t.setEditable(e.page)},shape:"circle",size:"small",icon:"edit",className:"fl-tree-button"}),i.createElement(C.a,Object.assign({style:{userSelect:"none"}},r.dragHandleProps,{status:n.isDragging?"processing":"default",color:P("Page"),text:`Page - ${e.page.title}`})),i.createElement(h.c,{droppableId:`${e.page.uuid}|sections`,type:"Section"},(t,r)=>i.createElement(S,Object.assign({isDraggingOver:r.isDraggingOver,ref:t.innerRef},t.droppableProps,{style:O(r.isDraggingOver)}),e.page.sections.map((e,t)=>i.createElement(N,{key:e.uuid,sec:e,index:t})),t.placeholder)),r.placeholder))},I=()=>{const e=i.useContext(s.b);if(!e)throw new Error("Store is null");return Object(f.b)(()=>i.createElement(m.a,{title:"Layout",bordered:!1,style:{height:"100%"},bodyStyle:{height:"100%",padding:"10px",overflow:"auto",paddingBottom:"48px"}},i.createElement(v.a,{type:"dashed",onClick:()=>{e.setFormEditorVisible(!0)},shape:"circle",size:"small",icon:"edit",style:{marginRight:"5px",userSelect:"none"}}),i.createElement(C.a,{status:"default",color:P("Form"),text:`Form - ${e.formStore.form.name}`}),i.createElement(h.c,{droppableId:"pages",type:"Page"},(t,r)=>i.createElement(S,{isDraggingOver:r.isDraggingOver,ref:t.innerRef,style:O(r.isDraggingOver)},e.formStore.form.content.pages.map((e,t)=>i.createElement(T,{key:e.uuid,page:e,index:t})),t.placeholder))))};r(346);const{Content:M}=l.a,R=i.lazy(()=>Promise.all([r.e(0),r.e(2),r.e(4),r.e(5),r.e(1),r.e(8)]).then(r.bind(null,619)).then(e=>({default:e.FieldEditorView}))),z=i.lazy(()=>Promise.all([r.e(0),r.e(2),r.e(3),r.e(4),r.e(1),r.e(9)]).then(r.bind(null,618)).then(e=>({default:e.FormEditorView}))),$=i.lazy(()=>Promise.all([r.e(0),r.e(2),r.e(1),r.e(10)]).then(r.bind(null,617))),_=i.lazy(()=>Promise.all([r.e(0),r.e(2),r.e(3),r.e(1),r.e(11)]).then(r.bind(null,620)).then(e=>({default:e.SectionEditorView}))),B=()=>{const e=i.useContext(s.b);if(!e)throw new Error("Store is null");const t=Object(f.a)(()=>({siderCollapsed:!1,get hasContent(){return e.formStore.form.content&&e.formStore.form.content.pages&&e.formStore.form.content.pages.length>0},onSiderCollapse:function(e){this.siderCollapsed=e},toggleSider:function(){this.siderCollapsed=!this.siderCollapsed},get itemMap(){let t={};return e.formStore.form.content.pages.forEach(e=>{t[e.uuid]=e,e.sections.forEach((e,r)=>{t[e.uuid]=e,e.columns.forEach((e,r)=>{t[e.uuid]=e,e.fields.forEach((e,r)=>{t[e.uuid]=e})})})}),t},handleNewItem:function(t){const{destination:r,type:n}=t,{form:l}=e.formStore;if(null==r)return;const i=r.index;let o=(()=>`${Math.ceil(1e6*Math.random())}`)();if("Page"==n){let t=l.content.pages.length,r=a.c.makePages(e.formStore,{id:`${t}`,title:`Page ${t}`,name:`Page ${t}`,sections:[]})[0];l.addPage(r,i)}else{let[l]=r.droppableId.split("|");if("Section"==n){let t=this.itemMap[l],r=a.c.makeSections(e.formStore,{id:`${o}`,name:`Section_${o}`,columns:[]})[0];t.addSection(r,i)}if("Column"==n){let t=this.itemMap[l],r=a.c.makeColumns(e.formStore,{id:`${o}`,name:`Column_${o}`,fields:[]})[0],n=t.columns.length,d=Math.abs(24/(n+1));t.addColumn(r,i),t.columns.forEach(e=>{e.span=d})}if("Field"==n){let r=this.itemMap[l],n=a.c.makeFields(e.formStore,{id:`${o}`,name:`Field_${o}`,label:`Untitled ${t.draggableId}`,inputType:t.draggableId,componentProps:{},fieldOptions:{}})[0];r.addField(n,i)}}},handleMoveItem:function(t){const{source:r,destination:n,type:a}=t,{form:l}=e.formStore,i=r.index,o=n.index;if("Page"==a)l.swapPages(r.index,n.index);else{let[e]=r.droppableId.split("|"),[t]=n.droppableId.split("|"),l=e==t;if("Section"==a){let r=this.itemMap[e];if(l)return void r.swapSections(i,o);let n=this.itemMap[t],a=r.sections[i];r.removeSection(i),n.addSection(a,o)}else if("Column"==a){let r=this.itemMap[e];if(l)return void r.swapColumns(i,o);let n=this.itemMap[t],a=r.columns[i];r.removeColumn(i),n.addColumn(a,o)}else if("Field"==a){let r=this.itemMap[e];if(l)return void r.swapFields(i,o);let n=this.itemMap[t],a=r.fields[i];r.removeField(i),n.addField(a,o)}}},onDragEnd:function(e){const{source:t,type:r}=e;t.droppableId.startsWith("New")?this.handleNewItem(e):this.handleMoveItem(e)}}));return Object(f.b)(()=>i.createElement(l.a,{className:"fl-full-height-nopad"},i.createElement(u.a,{mode:"horizontal",theme:"light",multiple:!0,className:"fl-shadow-sides"},i.createElement(u.a.Item,{title:"Form Controls",onClick:t.toggleSider,key:"controls"},i.createElement(g.a,{theme:t.siderCollapsed?"outlined":"filled",type:"control"}))),i.createElement(l.a.Content,null,i.createElement(h.a,{onDragEnd:t.onDragEnd},i.createElement(l.a,{className:"fl-full-height-nopad"},i.createElement(l.a.Sider,{trigger:null,collapsed:t.siderCollapsed,style:{zIndex:11},collapsible:!0,onCollapse:t.onSiderCollapse,theme:"light",collapsedWidth:0},i.createElement("div",{className:"fl-full-height fl-grey-box fl-shadow-sides"},i.createElement(x,null))),i.createElement(M,{style:{overflow:"hidden",padding:"0"}},i.createElement(c.a,{span:8,style:{height:"100%"}},i.createElement("div",{className:"fl-full-height fl-grey-box fl-shadow-sides"},i.createElement(I,null))),i.createElement(c.a,{span:16,style:{height:"100%"}},i.createElement("div",{className:"fl-shadow-sides fl-full-height",style:{backgroundColor:"white"}},i.createElement(a.d,{formStore:e.formStore},i.createElement(m.a,{bordered:!1,title:"Preview",style:{width:"100%",padding:"1px",borderBottom:"1px"},bodyStyle:{padding:0}}),t.hasContent?i.createElement(a.e,{style:{height:"100%"}}):i.createElement("div",{style:{height:"100%"}},i.createElement(p.a,{description:i.createElement("span",null,"Add a page to this form."),style:{marginTop:"20%"}}))))),i.createElement(i.Suspense,{fallback:"Loading..."},i.createElement(R,null),i.createElement(z,null),i.createElement($,null),i.createElement(_,null))))))))};var A=r(196);function L(e,t){return Object(n.a)(this,void 0,void 0,function*(){const r=Object(a.l)();r.setForm(a.c.makeForm(r,t)),Object(d.render)(o.a.createElement(l.a,{style:{height:"100vh",overflow:"hidden"}},o.a.createElement(o.a.Suspense,{fallback:"Loading..."},o.a.createElement(s.a,{formStore:r},o.a.createElement(B,null)))),document.querySelector(e))})}r.d(t,"default",function(){return L}),Object(A.enableLogging)({action:!0,compute:!1}),L("#root",a.b)},9:function(e,t){e.exports=moment}});
//# sourceMappingURL=main.bundle.js.map