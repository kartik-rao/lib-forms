window.Forms=function(e){function t(t){for(var n,a,i=t[0],l=t[1],c=t[2],p=0,j=[];p<i.length;p++)a=i[p],s[a]&&j.push(s[a][0]),s[a]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(e[n]=l[n]);for(u&&u(t);j.length;)j.shift()();return o.push.apply(o,c||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var l=r[i];0!==s[l]&&(n=!1)}n&&(o.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},s={1:0},o=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},a.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window.webpackJsonpForms=window.webpackJsonpForms||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var u=l;return o.push([637,0]),r()}({345:function(e,t,r){"use strict";var n,s=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),o=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e};Object.defineProperty(t,"__esModule",{value:!0});var a=r(1),i=r(136),l=function(e){function t(t){var r=e.call(this,t)||this;return r.state={confirmDirty:!1},r.handleConfirmBlur=function(e){var t=e.target.value;r.setState({confirmDirty:r.state.confirmDirty||!!t})},r}return s(t,e),t.prototype.handleSubmit=function(e){e.preventDefault(),this.props.form.validateFields(function(e,t){e||console.log("Received values of form: ",t)})},t.prototype.renderPage=function(e,t){var r=this;e.sections.length;return a.createElement("div",{className:"page",key:t},e.sections.map(function(e,t){return r.renderSection(e,t)}))},t.prototype.renderSection=function(e,t){var r=this;e.fields.length;return a.createElement(i.Card,{key:t,title:e.name},e.fields.map(function(e,t){return r.renderField(e,t)}))},t.prototype.onChange=function(e){var t=e.target.id,r=this.props.form,n=r.isFieldsTouched([t]),s=r.isFieldValidating(t),o=r.getFieldError(t);n&&(console.log(this),console.log(arguments),console.log(t,n,s,o))},t.prototype.renderField=function(e,t){var r=e.type,n=this.props.form.getFieldDecorator,s=this.onChange.bind(this),l=(this.handleConfirmBlur.bind(this),n(""+e.id,e.fieldOptions));return a.createElement(i.Form.Item,o({label:e.label,key:t,required:!1},this.props.formItemLayout),"input"==r&&l(a.createElement(i.Input,{onChange:s,type:e.inputType,placeholder:e.placeholder})),"checkbox"==r&&l(a.createElement(i.Checkbox,{onChange:s})),"number"==r&&l(a.createElement(i.InputNumber,{onChange:s})),"select"==r&&l(a.createElement(i.Select,{onSelect:s},e.children.map(function(e,t){return a.createElement(i.Select.Option,{key:t},e.label)}))),"radiogroup"==r&&l(a.createElement(i.Radio.Group,{onChange:s},e.children.map(function(e,t){return a.createElement(i.Radio,{key:t},e.label)}))),"checkboxgroup"==r&&l(a.createElement(i.Checkbox.Group,{onChange:s,options:e.children})),"textarea"==r&&l(a.createElement(i.Input.TextArea,{onChange:s})),"datepicker"==r&&l(a.createElement(i.DatePicker,{onChange:s})),"monthpicker"==r&&l(a.createElement(i.DatePicker.MonthPicker,{onChange:s})),"rangepicker"==r&&l(a.createElement(i.DatePicker.RangePicker,{onChange:s})),"weekpicker"==r&&l(a.createElement(i.DatePicker.WeekPicker,{onChange:s})))},t.prototype.render=function(){var e=this,t=this.props.form;t.getFieldDecorator,t.getFieldError,t.getFieldsValue,t.setFieldsValue,this.props.content.pages.length,this.renderField;return a.createElement("div",null,a.createElement(i.Card,{title:this.props.name},a.createElement(i.Form,{onSubmit:this.handleSubmit.bind(this),layout:this.props.layout},this.props.content.pages.map(function(t,r){return e.renderPage(t,r)}),a.createElement("br",null),a.createElement(i.Form.Item,o({},this.props.formItemLayout),a.createElement(i.Button,{type:"primary",htmlType:"submit"},"Submit")))))},t}(a.Component);t.default=i.Form.create()(l)},571:function(e,t,r){var n={"./af":312,"./af.js":312,"./ar":311,"./ar-dz":310,"./ar-dz.js":310,"./ar-kw":309,"./ar-kw.js":309,"./ar-ly":308,"./ar-ly.js":308,"./ar-ma":307,"./ar-ma.js":307,"./ar-sa":306,"./ar-sa.js":306,"./ar-tn":305,"./ar-tn.js":305,"./ar.js":311,"./az":304,"./az.js":304,"./be":303,"./be.js":303,"./bg":302,"./bg.js":302,"./bm":301,"./bm.js":301,"./bn":300,"./bn.js":300,"./bo":299,"./bo.js":299,"./br":298,"./br.js":298,"./bs":297,"./bs.js":297,"./ca":296,"./ca.js":296,"./cs":295,"./cs.js":295,"./cv":294,"./cv.js":294,"./cy":293,"./cy.js":293,"./da":292,"./da.js":292,"./de":291,"./de-at":290,"./de-at.js":290,"./de-ch":289,"./de-ch.js":289,"./de.js":291,"./dv":288,"./dv.js":288,"./el":287,"./el.js":287,"./en-au":286,"./en-au.js":286,"./en-ca":285,"./en-ca.js":285,"./en-gb":284,"./en-gb.js":284,"./en-ie":283,"./en-ie.js":283,"./en-il":282,"./en-il.js":282,"./en-nz":281,"./en-nz.js":281,"./eo":280,"./eo.js":280,"./es":279,"./es-do":278,"./es-do.js":278,"./es-us":277,"./es-us.js":277,"./es.js":279,"./et":276,"./et.js":276,"./eu":275,"./eu.js":275,"./fa":274,"./fa.js":274,"./fi":273,"./fi.js":273,"./fo":272,"./fo.js":272,"./fr":271,"./fr-ca":270,"./fr-ca.js":270,"./fr-ch":269,"./fr-ch.js":269,"./fr.js":271,"./fy":268,"./fy.js":268,"./gd":267,"./gd.js":267,"./gl":266,"./gl.js":266,"./gom-latn":265,"./gom-latn.js":265,"./gu":264,"./gu.js":264,"./he":263,"./he.js":263,"./hi":262,"./hi.js":262,"./hr":261,"./hr.js":261,"./hu":260,"./hu.js":260,"./hy-am":259,"./hy-am.js":259,"./id":258,"./id.js":258,"./is":257,"./is.js":257,"./it":256,"./it.js":256,"./ja":255,"./ja.js":255,"./jv":254,"./jv.js":254,"./ka":253,"./ka.js":253,"./kk":252,"./kk.js":252,"./km":251,"./km.js":251,"./kn":250,"./kn.js":250,"./ko":249,"./ko.js":249,"./ky":248,"./ky.js":248,"./lb":247,"./lb.js":247,"./lo":246,"./lo.js":246,"./lt":245,"./lt.js":245,"./lv":244,"./lv.js":244,"./me":243,"./me.js":243,"./mi":242,"./mi.js":242,"./mk":241,"./mk.js":241,"./ml":240,"./ml.js":240,"./mn":239,"./mn.js":239,"./mr":238,"./mr.js":238,"./ms":237,"./ms-my":236,"./ms-my.js":236,"./ms.js":237,"./mt":235,"./mt.js":235,"./my":234,"./my.js":234,"./nb":233,"./nb.js":233,"./ne":232,"./ne.js":232,"./nl":231,"./nl-be":230,"./nl-be.js":230,"./nl.js":231,"./nn":229,"./nn.js":229,"./pa-in":228,"./pa-in.js":228,"./pl":227,"./pl.js":227,"./pt":226,"./pt-br":225,"./pt-br.js":225,"./pt.js":226,"./ro":224,"./ro.js":224,"./ru":223,"./ru.js":223,"./sd":222,"./sd.js":222,"./se":221,"./se.js":221,"./si":220,"./si.js":220,"./sk":219,"./sk.js":219,"./sl":218,"./sl.js":218,"./sq":217,"./sq.js":217,"./sr":216,"./sr-cyrl":215,"./sr-cyrl.js":215,"./sr.js":216,"./ss":214,"./ss.js":214,"./sv":213,"./sv.js":213,"./sw":212,"./sw.js":212,"./ta":211,"./ta.js":211,"./te":210,"./te.js":210,"./tet":209,"./tet.js":209,"./tg":208,"./tg.js":208,"./th":207,"./th.js":207,"./tl-ph":206,"./tl-ph.js":206,"./tlh":205,"./tlh.js":205,"./tr":204,"./tr.js":204,"./tzl":203,"./tzl.js":203,"./tzm":202,"./tzm-latn":201,"./tzm-latn.js":201,"./tzm.js":202,"./ug-cn":200,"./ug-cn.js":200,"./uk":199,"./uk.js":199,"./ur":198,"./ur.js":198,"./uz":197,"./uz-latn":196,"./uz-latn.js":196,"./uz.js":197,"./vi":195,"./vi.js":195,"./x-pseudo":194,"./x-pseudo.js":194,"./yo":193,"./yo.js":193,"./zh-cn":192,"./zh-cn.js":192,"./zh-hk":191,"./zh-hk.js":191,"./zh-tw":190,"./zh-tw.js":190};function s(e){var t=o(e);return r(t)}function o(e){var t=n[e];if(!(t+1)){var r=new Error('Cannot find module "'+e+'".');throw r.code="MODULE_NOT_FOUND",r}return t}s.keys=function(){return Object.keys(n)},s.resolve=o,e.exports=s,s.id=571},637:function(e,t,r){"use strict";var n,s=this&&this.__extends||(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])},function(e,t){function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),o=this&&this.__assign||Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},a=this&&this.__rest||function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(n=Object.getOwnPropertySymbols(e);s<n.length;s++)t.indexOf(n[s])<0&&(r[n[s]]=e[n[s]])}return r};Object.defineProperty(t,"__esModule",{value:!0});var i=r(1);r(644),r(638);var l=r(136),c=r(345),u=function(e){function t(t){var r=e.call(this,t)||this;return r.props={},r.state={},r.props=t,r}return s(t,e),t.prototype.render=function(){var e=this.props,t=(e.initialState,a(e,["initialState"]),this.props.form);return i.createElement(l.Layout,{style:{height:"100vh"}},i.createElement(l.Row,null,i.createElement("br",null)),i.createElement(l.Row,{justify:"space-around"},i.createElement(l.Col,{span:16,offset:4},i.createElement(c.default,o({},t)))))},t}(i.Component);t.FormFactory=u},644:function(e,t){}});
//# sourceMappingURL=main.js.map