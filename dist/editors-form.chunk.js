(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{360:function(e,t,n){"use strict";var o=n(0),a=n(4),l=n.n(a),r=n(12);function i(){return(i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var c=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n};t.a=function(e){return o.createElement(r.a,null,function(t){var n,a=t.getPrefixCls,r=e.prefixCls,u=e.type,m=void 0===u?"horizontal":u,p=e.orientation,d=void 0===p?"center":p,f=e.className,y=e.children,b=e.dashed,h=c(e,["prefixCls","type","orientation","className","children","dashed"]),g=a("divider",r),v=d.length>0?"-".concat(d):d,E=l()(f,g,"".concat(g,"-").concat(m),(s(n={},"".concat(g,"-with-text").concat(v),y),s(n,"".concat(g,"-dashed"),!!b),n));return o.createElement("div",i({className:E},h,{role:"separator"}),y&&o.createElement("span",{className:"".concat(g,"-inner-text")},y))})}},614:function(e,t,n){},618:function(e,t,n){"use strict";n.r(t);var o=n(28),a=(n(124),n(392)),l=(n(384),n(63)),r=(n(200),n(103)),i=(n(202),n(10)),s=n(0),c=n(34),u=(n(69),n(375)),m=(n(373),n(354)),p=(n(428),n(422)),d=n.n(p),f=n(2),y=n(27),b=n(378);var h=d.a.create()(({form:{getFieldDecorator:e,validateFieldsAndScroll:t}})=>{const n=s.useContext(y.b);if(!n)throw new Error("Store is null");const o=Object(i.a)(()=>({selectedFormLayout:null,handleSubmit:function(e){e.preventDefault(),e.stopPropagation();let{form:o}=n.formStore;t((e,t)=>{e||(u.a.info({message:`Form - ${o.name}`,description:"Form properties applied successfully"}),o.layout=t.layout,o.formLayoutOptions=t.formLayoutOptions)})}}));let a=Object(f.toJS)(n.formStore.form),{formLayoutOptions:l}=a;return Object(i.b)(()=>s.createElement(d.a,Object.assign({},b.a,{onSubmit:e=>o.handleSubmit(e),layout:"horizontal"}),s.createElement(d.a.Item,{label:"Validation disables paging",help:"Allow page navigation when validation failures exist on current page"},e("formLayoutOptions.validationDisablesPaging",{valuePropName:"defaultChecked",initialValue:l.validationDisablesPaging})(s.createElement(m.default,null))),s.createElement(d.a.Item,{label:"Show Page Number",help:"Show current/total pages in the form header"},e("formLayoutOptions.showSteps",{valuePropName:"defaultChecked",initialValue:l.showSteps})(s.createElement(m.default,null))),s.createElement(d.a.Item,{label:"Show Page Title",help:"Show the title of each page"},e("formLayoutOptions.showPageTitles",{valuePropName:"defaultChecked",initialValue:l.showPageTitles})(s.createElement(m.default,null))),s.createElement(d.a.Item,{label:"Show Section Title",help:"Show section title above section content"},e("formLayoutOptions.showSectionTitles",{valuePropName:"defaultChecked",initialValue:l.showSectionTitles})(s.createElement(m.default,null))),s.createElement(d.a.Item,{label:"Show Section Border",help:"Show borders around a section block"},e("formLayoutOptions.showSectionBorders",{valuePropName:"defaultChecked",initialValue:l.showSectionBorders})(s.createElement(m.default,null))),s.createElement(d.a.Item,Object.assign({},b.b),s.createElement(c.a,{type:"primary",htmlType:"submit",style:{marginTop:"15px"}},"Apply"))))}),g=n(24),v=n(360),E=(n(214),n(371)),w=(n(370),n(374)),C=(n(377),n(32)),O=(n(99),n(5)),k=n.n(O),S=n(7),L=n.n(S),x=n(6),N=n.n(x),P=n(8),T=n.n(P),j=n(11),F=n(13),D=n(75),I=n(459),A=n(43),M=function(e){function t(){return L()(this,t),N()(this,e.apply(this,arguments))}return T()(t,e),t.prototype.shouldComponentUpdate=function(e){return!!e.hiddenClassName||!!e.visible},t.prototype.render=function(){var e=this.props.className;this.props.hiddenClassName&&!this.props.visible&&(e+=" "+this.props.hiddenClassName);var t=k()({},this.props);return delete t.hiddenClassName,delete t.visible,t.className=e,s.createElement("div",k()({},t))},t}(s.Component),z=0;function R(e,t){var n=e["page"+(t?"Y":"X")+"Offset"],o="scroll"+(t?"Top":"Left");if("number"!=typeof n){var a=e.document;"number"!=typeof(n=a.documentElement[o])&&(n=a.body[o])}return n}function V(e,t){var n=e.style;["Webkit","Moz","Ms","ms"].forEach(function(e){n[e+"TransformOrigin"]=t}),n.transformOrigin=t}var _=function(e){function t(n){L()(this,t);var o=N()(this,e.call(this,n));return o.inTransition=!1,o.onAnimateLeave=function(){var e=o.props.afterClose;o.wrap&&(o.wrap.style.display="none"),o.inTransition=!1,o.removeScrollingEffect(),e&&e()},o.onDialogMouseDown=function(){o.dialogMouseDown=!0},o.onMaskMouseUp=function(){o.dialogMouseDown&&(o.timeoutId=setTimeout(function(){o.dialogMouseDown=!1},0))},o.onMaskClick=function(e){Date.now()-o.openTime<300||e.target!==e.currentTarget||o.dialogMouseDown||o.close(e)},o.onKeyDown=function(e){var t=o.props;if(t.keyboard&&e.keyCode===F.a.ESC)return e.stopPropagation(),void o.close(e);if(t.visible&&e.keyCode===F.a.TAB){var n=document.activeElement,a=o.sentinelStart;e.shiftKey?n===a&&o.sentinelEnd.focus():n===o.sentinelEnd&&a.focus()}},o.getDialogElement=function(){var e=o.props,t=e.closable,n=e.prefixCls,a={};void 0!==e.width&&(a.width=e.width),void 0!==e.height&&(a.height=e.height);var l=void 0;e.footer&&(l=s.createElement("div",{className:n+"-footer",ref:o.saveRef("footer")},e.footer));var r=void 0;e.title&&(r=s.createElement("div",{className:n+"-header",ref:o.saveRef("header")},s.createElement("div",{className:n+"-title",id:o.titleId},e.title)));var i=void 0;t&&(i=s.createElement("button",{type:"button",onClick:o.close,"aria-label":"Close",className:n+"-close"},e.closeIcon||s.createElement("span",{className:n+"-close-x"})));var c=k()({},e.style,a),u={width:0,height:0,overflow:"hidden"},m=o.getTransitionName(),p=s.createElement(M,{key:"dialog-element",role:"document",ref:o.saveRef("dialog"),style:c,className:n+" "+(e.className||""),visible:e.visible,onMouseDown:o.onDialogMouseDown},s.createElement("div",{tabIndex:0,ref:o.saveRef("sentinelStart"),style:u,"aria-hidden":"true"}),s.createElement("div",{className:n+"-content"},i,r,s.createElement("div",k()({className:n+"-body",style:e.bodyStyle,ref:o.saveRef("body")},e.bodyProps),e.children),l),s.createElement("div",{tabIndex:0,ref:o.saveRef("sentinelEnd"),style:u,"aria-hidden":"true"}));return s.createElement(A.default,{key:"dialog",showProp:"visible",onLeave:o.onAnimateLeave,transitionName:m,component:"",transitionAppear:!0},e.visible||!e.destroyOnClose?p:null)},o.getZIndexStyle=function(){var e={},t=o.props;return void 0!==t.zIndex&&(e.zIndex=t.zIndex),e},o.getWrapStyle=function(){return k()({},o.getZIndexStyle(),o.props.wrapStyle)},o.getMaskStyle=function(){return k()({},o.getZIndexStyle(),o.props.maskStyle)},o.getMaskElement=function(){var e=o.props,t=void 0;if(e.mask){var n=o.getMaskTransitionName();t=s.createElement(M,k()({style:o.getMaskStyle(),key:"mask",className:e.prefixCls+"-mask",hiddenClassName:e.prefixCls+"-mask-hidden",visible:e.visible},e.maskProps)),n&&(t=s.createElement(A.default,{key:"mask",showProp:"visible",transitionAppear:!0,component:"",transitionName:n},t))}return t},o.getMaskTransitionName=function(){var e=o.props,t=e.maskTransitionName,n=e.maskAnimation;return!t&&n&&(t=e.prefixCls+"-"+n),t},o.getTransitionName=function(){var e=o.props,t=e.transitionName,n=e.animation;return!t&&n&&(t=e.prefixCls+"-"+n),t},o.addScrollingEffect=function(){1===(0,o.props.getOpenCount)()&&(Object(I.a)(),document.body.style.overflow="hidden")},o.removeScrollingEffect=function(){0===(0,o.props.getOpenCount)()&&(document.body.style.overflow="",Object(I.a)(!0))},o.close=function(e){var t=o.props.onClose;t&&t(e)},o.saveRef=function(e){return function(t){o[e]=t}},o.titleId="rcDialogTitle"+z++,o}return T()(t,e),t.prototype.componentDidMount=function(){this.componentDidUpdate({}),(this.props.forceRender||!1===this.props.getContainer&&!this.props.visible)&&this.wrap&&(this.wrap.style.display="none")},t.prototype.componentDidUpdate=function(e){var t,n,o,a,l,r=this.props,i=this.props.mousePosition;if(r.visible){if(!e.visible){this.openTime=Date.now(),this.addScrollingEffect(),this.tryFocus();var s=j.findDOMNode(this.dialog);if(i){var c=(n=(t=s).getBoundingClientRect(),o={left:n.left,top:n.top},a=t.ownerDocument,l=a.defaultView||a.parentWindow,o.left+=R(l),o.top+=R(l,!0),o);V(s,i.x-c.left+"px "+(i.y-c.top)+"px")}else V(s,"")}}else if(e.visible&&(this.inTransition=!0,r.mask&&this.lastOutSideFocusNode)){try{this.lastOutSideFocusNode.focus()}catch(e){this.lastOutSideFocusNode=null}this.lastOutSideFocusNode=null}},t.prototype.componentWillUnmount=function(){var e=this.props,t=e.visible,n=e.getOpenCount;!t&&!this.inTransition||n()||this.removeScrollingEffect(),clearTimeout(this.timeoutId)},t.prototype.tryFocus=function(){Object(D.a)(this.wrap,document.activeElement)||(this.lastOutSideFocusNode=document.activeElement,this.sentinelStart.focus())},t.prototype.render=function(){var e=this.props,t=e.prefixCls,n=e.maskClosable,o=this.getWrapStyle();return e.visible&&(o.display=null),s.createElement("div",null,this.getMaskElement(),s.createElement("div",k()({tabIndex:-1,onKeyDown:this.onKeyDown,className:t+"-wrap "+(e.wrapClassName||""),ref:this.saveRef("wrap"),onClick:n?this.onMaskClick:null,onMouseUp:n?this.onMaskMouseUp:null,role:"dialog","aria-labelledby":e.title?this.titleId:null,style:o},e.wrapProps),this.getDialogElement()))},t}(s.Component),B=_;_.defaultProps={className:"",mask:!0,visible:!1,keyboard:!0,closable:!0,maskClosable:!0,destroyOnClose:!1,prefixCls:"rc-dialog"};var q=n(457),U=function(e){var t=e.visible,n=e.getContainer,o=e.forceRender;return!1===n?s.createElement(B,k()({},e,{getOpenCount:function(){return 2}})):s.createElement(q.a,{visible:t,forceRender:o,getContainer:n},function(t){return s.createElement(B,k()({},e,t))})},W=n(1),$=n(4),K=n.n($),J=n(53),H=n(90),Z=n(16),X=n(36),Y=n(12);function G(e){return(G="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function Q(){return(Q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function ee(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function te(e,t){return!t||"object"!==G(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function ne(e){return(ne=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function oe(e,t){return(oe=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var ae,le=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)t.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(n[o[a]]=e[o[a]])}return n},re=[];"undefined"!=typeof window&&window.document&&window.document.documentElement&&Object(J.a)(document.documentElement,"click",function(e){ae={x:e.pageX,y:e.pageY},setTimeout(function(){return ae=null},100)});var ie=function(e){function t(){var e;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(e=te(this,ne(t).apply(this,arguments))).handleCancel=function(t){var n=e.props.onCancel;n&&n(t)},e.handleOk=function(t){var n=e.props.onOk;n&&n(t)},e.renderFooter=function(t){var n=e.props,o=n.okText,a=n.okType,l=n.cancelText,r=n.confirmLoading;return s.createElement("div",null,s.createElement(c.a,Q({onClick:e.handleCancel},e.props.cancelButtonProps),l||t.cancelText),s.createElement(c.a,Q({type:a,loading:r,onClick:e.handleOk},e.props.okButtonProps),o||t.okText))},e.renderModal=function(t){var n,o,a,l=t.getPopupContainer,r=t.getPrefixCls,i=e.props,c=i.prefixCls,u=i.footer,m=i.visible,p=i.wrapClassName,d=i.centered,f=i.getContainer,y=i.closeIcon,b=le(i,["prefixCls","footer","visible","wrapClassName","centered","getContainer","closeIcon"]),h=r("modal",c),g=s.createElement(X.a,{componentName:"Modal",defaultLocale:Object(H.b)()},e.renderFooter),v=s.createElement("span",{className:"".concat(h,"-close-x")},y||s.createElement(Z.a,{className:"".concat(h,"-close-icon"),type:"close"}));return s.createElement(U,Q({},b,{getContainer:void 0===f?l:f,prefixCls:h,wrapClassName:K()((n={},o="".concat(h,"-centered"),a=!!d,o in n?Object.defineProperty(n,o,{value:a,enumerable:!0,configurable:!0,writable:!0}):n[o]=a,n),p),footer:void 0===u?g:u,visible:m,mousePosition:ae,onClose:e.handleCancel,closeIcon:v}))},e}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&oe(e,t)}(t,s["Component"]),n=t,(o=[{key:"render",value:function(){return s.createElement(Y.a,null,this.renderModal)}}])&&ee(n.prototype,o),a&&ee(n,a),t}();function se(e){return(se="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function ce(){return(ce=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function ue(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function me(e,t){return!t||"object"!==se(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function pe(e){return(pe=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function de(e,t){return(de=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}ie.defaultProps={width:520,transitionName:"zoom",maskTransitionName:"fade",confirmLoading:!1,visible:!1,okType:"primary"},ie.propTypes={prefixCls:W.string,onOk:W.func,onCancel:W.func,okText:W.node,cancelText:W.node,centered:W.bool,width:W.oneOfType([W.number,W.string]),confirmLoading:W.bool,visible:W.bool,footer:W.node,title:W.node,closable:W.bool,closeIcon:W.node};var fe=function(e){function t(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),(n=me(this,pe(t).call(this,e))).onClick=function(){var e,t=n.props,o=t.actionFn,a=t.closeModal;o?(o.length?e=o(a):(e=o())||a(),e&&e.then&&(n.setState({loading:!0}),e.then(function(){a.apply(void 0,arguments)},function(e){console.error(e),n.setState({loading:!1})}))):a()},n.state={loading:!1},n}var n,o,a;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&de(e,t)}(t,s["Component"]),n=t,(o=[{key:"componentDidMount",value:function(){if(this.props.autoFocus){var e=j.findDOMNode(this);this.timeoutId=setTimeout(function(){return e.focus()})}}},{key:"componentWillUnmount",value:function(){clearTimeout(this.timeoutId)}},{key:"render",value:function(){var e=this.props,t=e.type,n=e.children,o=e.buttonProps,a=this.state.loading;return s.createElement(c.a,ce({type:t,onClick:this.onClick,loading:a},o),n)}}])&&ue(n.prototype,o),a&&ue(n,a),t}(),ye=n(19);function be(){return(be=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}var he=!!j.createPortal,ge=function(e){var t=e.onCancel,n=e.onOk,o=e.close,a=e.zIndex,l=e.afterClose,r=e.visible,i=e.keyboard,c=e.centered,u=e.getContainer,m=e.maskStyle,p=e.okButtonProps,d=e.cancelButtonProps,f=e.iconType,y=void 0===f?"question-circle":f;Object(ye.a)(!("iconType"in e),"Modal","The property 'iconType' is deprecated. Use the property 'icon' instead.");var b,h,g,v=void 0===e.icon?y:e.icon,E=e.okType||"primary",w=e.prefixCls||"ant-modal",C="".concat(w,"-confirm"),O=!("okCancel"in e)||e.okCancel,k=e.width||416,S=e.style||{},L=void 0===e.mask||e.mask,x=void 0!==e.maskClosable&&e.maskClosable,N=Object(H.b)(),P=e.okText||(O?N.okText:N.justOkText),T=e.cancelText||N.cancelText,j=null!==e.autoFocusButton&&(e.autoFocusButton||"ok"),F=e.transitionName||"zoom",D=e.maskTransitionName||"fade",I=K()(C,"".concat(C,"-").concat(e.type),e.className),A=O&&s.createElement(fe,{actionFn:t,closeModal:o,autoFocus:"cancel"===j,buttonProps:d},T),M="string"==typeof v?s.createElement(Z.a,{type:v}):v;return s.createElement(ie,{prefixCls:w,className:I,wrapClassName:K()((b={},h="".concat(C,"-centered"),g=!!e.centered,h in b?Object.defineProperty(b,h,{value:g,enumerable:!0,configurable:!0,writable:!0}):b[h]=g,b)),onCancel:function(){return o({triggerCancel:!0})},visible:r,title:"",transitionName:F,footer:"",maskTransitionName:D,mask:L,maskClosable:x,maskStyle:m,style:S,width:k,zIndex:a,afterClose:l,keyboard:i,centered:c,getContainer:u},s.createElement("div",{className:"".concat(C,"-body-wrapper")},s.createElement("div",{className:"".concat(C,"-body")},M,s.createElement("span",{className:"".concat(C,"-title")},e.title),s.createElement("div",{className:"".concat(C,"-content")},e.content)),s.createElement("div",{className:"".concat(C,"-btns")},A,s.createElement(fe,{type:E,actionFn:n,closeModal:o,autoFocus:"ok"===j,buttonProps:p},P))))};function ve(e){var t=document.createElement("div");document.body.appendChild(t);var n=be({},e,{close:l,visible:!0});function o(){j.unmountComponentAtNode(t)&&t.parentNode&&t.parentNode.removeChild(t);for(var n=arguments.length,o=new Array(n),a=0;a<n;a++)o[a]=arguments[a];var r=o.some(function(e){return e&&e.triggerCancel});e.onCancel&&r&&e.onCancel.apply(e,o);for(var i=0;i<re.length;i++){if(re[i]===l){re.splice(i,1);break}}}function a(e){j.render(s.createElement(ge,be({getContainer:!1},e)),t)}function l(){for(var e=arguments.length,t=new Array(e),l=0;l<e;l++)t[l]=arguments[l];n=be({},n,{visible:!1,afterClose:o.bind.apply(o,[this].concat(t))}),he?a(n):o.apply(void 0,t)}return a(n),re.push(l),{destroy:l,update:function(e){a(n=be({},n,e))}}}function Ee(){return(Ee=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var o in n)Object.prototype.hasOwnProperty.call(n,o)&&(e[o]=n[o])}return e}).apply(this,arguments)}function we(e){return ve(Ee({type:"warning",icon:s.createElement(Z.a,{type:"exclamation-circle"}),okCancel:!1},e))}ie.info=function(e){return ve(Ee({type:"info",icon:s.createElement(Z.a,{type:"info-circle"}),okCancel:!1},e))},ie.success=function(e){return ve(Ee({type:"success",icon:s.createElement(Z.a,{type:"check-circle"}),okCancel:!1},e))},ie.error=function(e){return ve(Ee({type:"error",icon:s.createElement(Z.a,{type:"close-circle"}),okCancel:!1},e))},ie.warning=we,ie.warn=we,ie.confirm=function(e){return ve(Ee({type:"confirm",okCancel:!0},e))},ie.destroyAll=function(){for(;re.length;){var e=re.pop();e&&e()}};var Ce=ie,Oe=(n(29),n(614),n(357)),ke=(n(460),n(391));n(393);const Se=e=>{const t=Object(i.a)(()=>({get shouldRender(){let{formLayout:t,itemLayoutOptions:n,dimension:o}=e;return t&&n&&o&&!!n.wrapperCol[o]}}));let{formLayout:n,dimension:a}=e,{wrapperCol:r,labelCol:c}=e.itemLayoutOptions,u=r[a].span,m=r[a].offset||0,p=c[a].span,d=c[a].offset||0;return Object(i.b)(()=>s.createElement("div",{style:{background:"#ffff"}},t.shouldRender&&"horizontal"==n&&s.createElement(l.a,{className:"fl-layout-demo-row"},s.createElement(o.a,{span:d}," "),s.createElement(o.a,{span:p,style:{background:"rgba(0,160,233,0.6)",padding:"2px"}},s.createElement("strong",{style:{color:"white"}},"Label - ",(100*(p+d)/24).toFixed(2),"%")),s.createElement(o.a,{span:m}," "),s.createElement(o.a,{span:u,style:{background:"rgba(0,120,200,0.8)",padding:"2px"}},s.createElement("strong",{style:{color:"white"}},"Field - ",(100*(u+m)/24).toFixed(2),"%"))),t.shouldRender&&"vertical"==n&&s.createElement("div",null,s.createElement(l.a,{className:"fl-layout-demo-row"},s.createElement(o.a,{span:d}," "),s.createElement(o.a,{span:p,style:{background:"rgba(0,160,233,0.6)",padding:"2px"}},s.createElement("strong",{style:{color:"white"}},"Label - ",(100*(p+d)/24).toFixed(2),"%"))),s.createElement(l.a,{className:"fl-layout-demo-row",style:{marginTop:"15px"}},s.createElement(o.a,{span:m}," "),s.createElement(o.a,{span:u,style:{background:"rgba(0,120,200,0.8)",padding:"2px"}},s.createElement("strong",{style:{color:"white"}},"Field - ",(100*(u+m)/24).toFixed(2),"%"))))))},Le={xs:"Extra Small",sm:"Small",md:"Medium",lg:"Large",xl:"Extra Large"},xe={labelCol:{xs:{span:10},sm:{span:10}},wrapperCol:{xs:{span:14},sm:{span:14}}},Ne={wrapperCol:{xs:{span:8,offset:16},sm:{span:8,offset:16}}};var Pe=E.a.create()(e=>{if(!s.useContext(y.b))throw new Error("Store is null");const t=Object(i.a)(()=>({isAdding:!1,isEditing:!1,selectedDimension:null,itemLayout:new g.f({}),setDimension:function(e){this.selectedDimension=e},setLayoutProperty:function(e,t){let n,{selectedDimension:o}=this;n=e.indexOf("wrapper")>-1?this.itemLayout.wrapperCol[o]:this.itemLayout.labelCol[o],e.indexOf("Span")>-1?n.span=t:n.offset=t},get asRows(){let{labelCol:t,wrapperCol:n}=e.itemLayoutOptions,o=[],a={};return t&&t.used.forEach(n=>{a[n]||(a[n]={formLayout:e.formLayout,dimension:n}),a[n].labelSpan=t[n]?t[n].span:4,a[n].labelOffset=t[n]?t[n].offset:0}),n&&n.used.forEach(t=>{a[t]||(a[t]={formLayout:e.formLayout,dimension:t}),a[t].wrapperSpan=n[t]?n[t].span:8,a[t].wrapperOffset=n[t]?n[t].offset:0}),Object.keys(a).forEach(e=>{o.push(a[e])}),o},get availableDimensions(){let{wrapperCol:t}=e.itemLayoutOptions;return t?t.unused:g.a},setIsAdding:function(){let e=this.availableDimensions[0];this.itemLayout.wrapperCol.add(e,{offset:0,span:12}),this.itemLayout.labelCol.add(e,{offset:0,span:12}),this.selectedDimension=e,this.isAdding=!0},reset:function(){this.isAdding=!1,this.isEditing=!1,this.itemLayout=new g.f({}),this.selectedDimension=null},setIsEditing:function(t){this.selectedDimension=t.dimension,this.itemLayout.wrapperCol.add(t.dimension,e.itemLayoutOptions.wrapperCol[t.dimension]),this.itemLayout.labelCol.add(t.dimension,e.itemLayoutOptions.labelCol[t.dimension]),this.isEditing=!0},confirmRemove:function(e){let t=this;Ce.confirm({title:"Are you sure ?",content:`Clicking OK will remove field layout targeting "${Le[e.dimension]}"`,onOk(){t.remove(e)},onCancel(){}})},remove:function(t){let{itemLayoutOptions:n}=e;n.labelCol[t.dimension]=null,n.wrapperCol[t.dimension]=null,e.onSave(n)},save:function(){this.isAdding=!1,this.isEditing=!1,e.onSave(this.itemLayout),this.reset()}}));let n=[{title:"Dimension",dataIndex:"dimension",key:"dimension"},{title:"Label",children:[{title:"Offset",dataIndex:"labelOffset",key:"labelOffset"},{title:"Span",dataIndex:"labelSpan",key:"labelSpan"}]},{title:"Field",children:[{title:"Offset",dataIndex:"wrapperOffset",key:"wrapperOffset"},{title:"Span",dataIndex:"wrapperSpan",key:"wrapperSpan"}]},{title:"Actions",key:"action",render:(e,n)=>s.createElement("span",null,s.createElement(c.a,{shape:"circle",type:"default",onClick:e=>{t.setIsEditing(n)},icon:"tool",size:"small",style:{marginRight:"5px"}}),s.createElement(c.a,{shape:"circle",type:"danger",onClick:e=>{t.confirmRemove(n)},icon:"delete",size:"small"}))}],{getFieldDecorator:o}=e.form;return console.log("Selected Dimension",t.selectedDimension),Object(i.b)(()=>s.createElement(C.a,{size:"small",bodyStyle:{padding:0}},s.createElement(ke.a,{title:()=>s.createElement("span",null,"Field Layouts ",s.createElement("small",null,"click (+) to see preview")),size:"small",bordered:!1,pagination:!1,dataSource:t.asRows,columns:n,defaultExpandAllRows:!1,rowKey:"dimension",expandedRowRender:t=>s.createElement(Se,{formLayout:e.formLayout,dimension:t.dimension,itemLayoutOptions:e.itemLayoutOptions}),footer:()=>t.availableDimensions.length>0?s.createElement(c.a,{onClick:()=>t.setIsAdding()},"Add"):s.createElement(s.Fragment,null)}),(t.isAdding||t.isEditing)&&t.selectedDimension&&s.createElement(C.a,{size:"small",title:t.isAdding?"Add Field Layout":`Edit Field Layout - ${t.selectedDimension}`,style:{marginTop:"15px"}},s.createElement(Se,{formLayout:e.formLayout,itemLayoutOptions:t.itemLayout,dimension:t.selectedDimension}),s.createElement("p",null,"Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed"),s.createElement(E.a,Object.assign({},xe,{layout:"horizontal"}),s.createElement(E.a.Item,{label:"Target Screen Width",help:s.createElement("ul",null,s.createElement("li",null,"Extra Small (below 768px)"),s.createElement("li",null,"Small (768px - 992px)"),s.createElement("li",null,"Medium (992px - 1200px)"),s.createElement("li",null,"Large (1200px - 1440px)"),s.createElement("li",null,"Extra Large (1440px and above)"))},o("dimension",{initialValue:t.selectedDimension,rules:[{type:"string"},{required:!0,message:"A dimension"}]})(s.createElement(w.a,{onChange:e=>{t.setDimension(e)}},t.availableDimensions.map(e=>s.createElement(w.a.Option,{key:e},Le[e]))))),s.createElement(E.a.Item,{label:"Label Offset",help:"Left offset for label"},o("labelOffset",{initialValue:t.itemLayout.labelCol[t.selectedDimension]?t.itemLayout.labelCol[t.selectedDimension].offset:0,rules:[{type:"number"}]})(s.createElement(Oe.default,{step:1,min:0,max:24,onChange:e=>{t.setLayoutProperty("labelOffset",e)}}))),s.createElement(E.a.Item,{label:"Label Width",help:"Label available width"},o("labelSpan",{initialValue:t.itemLayout.labelCol[t.selectedDimension]?t.itemLayout.labelCol[t.selectedDimension].span:4,rules:[{type:"number"}]})(s.createElement(Oe.default,{step:1,min:0,max:24,onChange:e=>{t.setLayoutProperty("labelSpan",e)}}))),s.createElement(E.a.Item,{label:"Field Offset",help:"Left offset for fields"},o("wrapperOffset",{initialValue:t.itemLayout.wrapperCol[t.selectedDimension]?t.itemLayout.wrapperCol[t.selectedDimension].offset:2,rules:[{type:"number"}]})(s.createElement(Oe.default,{step:1,min:0,max:24,onChange:e=>{t.setLayoutProperty("wrapperOffset",e)}}))),s.createElement(E.a.Item,{label:"Field width",help:"Field available width"},o("wrapperSpan",{initialValue:t.itemLayout.wrapperCol[t.selectedDimension]?t.itemLayout.wrapperCol[t.selectedDimension].span:8,rules:[{type:"number"}]})(s.createElement(Oe.default,{step:1,min:1,max:24,onChange:e=>{t.setLayoutProperty("wrapperSpan",e)}}))),s.createElement(E.a.Item,Object.assign({},Ne),s.createElement(c.a,{size:"small",type:"primary",style:{marginRight:"15px"},onClick:t.save},"Save"),s.createElement(c.a,{size:"small",type:"danger",style:{marginTop:"15px"},onClick:t.reset},"Cancel"))))))});const Te={labelCol:{xs:{span:10},sm:{span:10}},wrapperCol:{xs:{span:14},sm:{span:14}}},je={wrapperCol:{xs:{span:2,offset:22},sm:{span:2,offset:22}}};var Fe=E.a.create()(({form:{getFieldDecorator:e,getFieldValue:t,validateFieldsAndScroll:n}})=>{const o=s.useContext(y.b);if(!o)throw new Error("Store is null");const a=Object(i.a)(()=>({selectedFormLayout:o.formStore.form.layout,selectedLabelAlign:o.formStore.form.formLayoutOptions.labelAlign,setProperty:function(e,t){let n=t&&"object"==typeof t&&t.target?t.target.value:t;this[e]=n},handleSubmit:function(e){e.preventDefault(),e.stopPropagation();let{form:t}=o.formStore;console.log("Submitting"),n((e,n)=>{e||(t.layout=this.selectedFormLayout,t.formLayoutOptions.labelAlign=this.selectedLabelAlign,u.a.info({message:`Form - ${t.name}`,description:`Form layout set to "${t.layout}" `}))})},get hasFormLayoutChanged(){let{form:e}=o.formStore;return this.selectedFormLayout!=e.layout||this.selectedLabelAlign!=e.formLayoutOptions.labelAlign},saveItemLayout:function(e){let{form:t}=o.formStore;g.a.map(n=>{e.labelCol[n]&&(t.itemLayoutOptions.labelCol||(t.itemLayoutOptions.labelCol=new g.g),t.itemLayoutOptions.labelCol.add(n,e.labelCol[n])),e.wrapperCol[n]&&(t.itemLayoutOptions.wrapperCol||(t.itemLayoutOptions.wrapperCol=new g.g),t.itemLayoutOptions.wrapperCol.add(n,e.wrapperCol[n]))}),t.formLayoutOptions.labelAlign=this.selectedLabelAlign,u.a.info({message:`Form - ${t.name}`,description:"Field layout updated successfully"})}}));return Object(i.b)(()=>s.createElement("div",null,s.createElement(E.a,Object.assign({},Te,{onSubmit:e=>a.handleSubmit(e),layout:"horizontal"}),s.createElement("p",null,"Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),s.createElement(v.a,null),s.createElement(E.a.Item,{label:"Form Layout",help:s.createElement("ul",null,s.createElement("li",null,"Horizontal：Labels placed next to controls."),s.createElement("li",null,"Vertical：Labels placed above controls (default)."),s.createElement("li",null,"Inline：All controls render in one line."))},e("selectedFormLayout",{initialValue:a.selectedFormLayout,rules:[{type:"string"},{required:!0,message:"A Layout is required"}]})(s.createElement(w.a,{onChange:e=>{a.setProperty("selectedFormLayout",e)}},s.createElement(w.a.Option,{key:"horizontal"},"Horizontal"),s.createElement(w.a.Option,{key:"vertical"},"Vertical"),s.createElement(w.a.Option,{key:"inline"},"Inline")))),s.createElement(E.a.Item,{label:"Label Alignment",help:"Horizontal position of the labels"},e("selectedLabelAlign",{initialValue:a.selectedLabelAlign,rules:[{type:"string"},{required:!0,message:"An alignment is required"}]})(s.createElement(w.a,{onChange:e=>{a.setProperty("selectedLabelAlign",e)}},s.createElement(w.a.Option,{key:"left"},"Left"),s.createElement(w.a.Option,{key:"right"},"Right")))),a.hasFormLayoutChanged&&s.createElement(E.a.Item,Object.assign({},je),s.createElement(c.a,{size:"small",type:"primary",htmlType:"submit"},"Save"))),s.createElement(v.a,null),s.createElement(Pe,{onSave:a.saveItemLayout,formLayout:a.selectedFormLayout,itemLayoutOptions:o.formStore.form.itemLayoutOptions})))}),De=n(351);n(372),n(427),n(429);n(9).tz.names().map(e=>({label:e,value:e}));var Ie=d.a.create()(({form:{getFieldDecorator:e,validateFieldsAndScroll:t}})=>{const n=s.useContext(y.b);if(!n)throw new Error("Store is null");const o=Object(i.a)(()=>({handleSubmit:function(e){e.preventDefault(),e.stopPropagation();let{form:o}=n.formStore;t((e,t)=>{e||(u.a.info({message:`Form - ${o.name}`,description:"Form properties applied successfully"}),o.description=t.desc,o.layout=t.layout,o.content.title=t.content.title,o.content.subtitle=t.content.subtitle)})}}));let a=n.showFormEditor?Object(f.toJS)(n.formStore.form):null;return Object(i.b)(()=>a&&s.createElement(d.a,Object.assign({},b.a,{onSubmit:e=>o.handleSubmit(e),layout:"horizontal"}),s.createElement(d.a.Item,{required:!0,label:"Name"},e("name",{initialValue:a.name,rules:[{type:"string"}]})(s.createElement(De.default,null))),s.createElement(d.a.Item,{required:!0,label:"Description"},e("desc",{initialValue:a.description,rules:[{type:"string"}]})(s.createElement(De.default,null))),s.createElement(d.a.Item,{required:!0,label:"Title"},e("content.title",{initialValue:a.content.title,rules:[{type:"string"}]})(s.createElement(De.default,null))),s.createElement(d.a.Item,{label:"Subtitle"},e("content.subtitle",{initialValue:a.content.subtitle,rules:[{type:"string"}]})(s.createElement(De.default,null))),s.createElement(d.a.Item,Object.assign({},b.b),s.createElement(c.a,{type:"primary",htmlType:"submit",style:{marginTop:"15px"}},"Apply"))))});n.d(t,"FormEditorView",function(){return Ae});const Ae=()=>{const e=s.useContext(y.b);if(!e)throw new Error("Store is null");return Object(i.b)(()=>e.showFormEditor?s.createElement(a.a,{title:`Form "${e.formStore.form.name}" `,onClose:()=>e.setFormEditorVisible(!1),visible:1==e.showFormEditor,width:700,style:{overflow:"hidden"}},s.createElement(r.a,{size:"small"},s.createElement(r.a.TabPane,{tab:"Settings",key:"1"},s.createElement(l.a,null,s.createElement(o.a,{span:24},s.createElement(Ie,null)))),s.createElement(r.a.TabPane,{tab:"Content",key:"2"},s.createElement(l.a,null,s.createElement(o.a,{span:24},s.createElement(h,null)))),s.createElement(r.a.TabPane,{tab:"Layout",key:"3"},s.createElement(l.a,null,s.createElement(o.a,{span:24},s.createElement(Fe,null)))))):s.createElement(s.Fragment,null))}}}]);
//# sourceMappingURL=editors-form.chunk.js.map