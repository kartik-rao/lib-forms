window["Forms"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonpForms"] = window["webpackJsonpForms"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([441,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

(function() { module.exports = window["antd"]; }());

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ }),

/***/ 298:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 105,
	"./af.js": 105,
	"./ar": 106,
	"./ar-dz": 107,
	"./ar-dz.js": 107,
	"./ar-kw": 108,
	"./ar-kw.js": 108,
	"./ar-ly": 109,
	"./ar-ly.js": 109,
	"./ar-ma": 110,
	"./ar-ma.js": 110,
	"./ar-sa": 111,
	"./ar-sa.js": 111,
	"./ar-tn": 112,
	"./ar-tn.js": 112,
	"./ar.js": 106,
	"./az": 113,
	"./az.js": 113,
	"./be": 114,
	"./be.js": 114,
	"./bg": 115,
	"./bg.js": 115,
	"./bm": 116,
	"./bm.js": 116,
	"./bn": 117,
	"./bn.js": 117,
	"./bo": 118,
	"./bo.js": 118,
	"./br": 119,
	"./br.js": 119,
	"./bs": 120,
	"./bs.js": 120,
	"./ca": 121,
	"./ca.js": 121,
	"./cs": 122,
	"./cs.js": 122,
	"./cv": 123,
	"./cv.js": 123,
	"./cy": 124,
	"./cy.js": 124,
	"./da": 125,
	"./da.js": 125,
	"./de": 126,
	"./de-at": 127,
	"./de-at.js": 127,
	"./de-ch": 128,
	"./de-ch.js": 128,
	"./de.js": 126,
	"./dv": 129,
	"./dv.js": 129,
	"./el": 130,
	"./el.js": 130,
	"./en-SG": 131,
	"./en-SG.js": 131,
	"./en-au": 132,
	"./en-au.js": 132,
	"./en-ca": 133,
	"./en-ca.js": 133,
	"./en-gb": 134,
	"./en-gb.js": 134,
	"./en-ie": 135,
	"./en-ie.js": 135,
	"./en-il": 136,
	"./en-il.js": 136,
	"./en-nz": 137,
	"./en-nz.js": 137,
	"./eo": 138,
	"./eo.js": 138,
	"./es": 139,
	"./es-do": 140,
	"./es-do.js": 140,
	"./es-us": 141,
	"./es-us.js": 141,
	"./es.js": 139,
	"./et": 142,
	"./et.js": 142,
	"./eu": 143,
	"./eu.js": 143,
	"./fa": 144,
	"./fa.js": 144,
	"./fi": 145,
	"./fi.js": 145,
	"./fo": 146,
	"./fo.js": 146,
	"./fr": 147,
	"./fr-ca": 148,
	"./fr-ca.js": 148,
	"./fr-ch": 149,
	"./fr-ch.js": 149,
	"./fr.js": 147,
	"./fy": 150,
	"./fy.js": 150,
	"./ga": 151,
	"./ga.js": 151,
	"./gd": 152,
	"./gd.js": 152,
	"./gl": 153,
	"./gl.js": 153,
	"./gom-latn": 154,
	"./gom-latn.js": 154,
	"./gu": 155,
	"./gu.js": 155,
	"./he": 156,
	"./he.js": 156,
	"./hi": 157,
	"./hi.js": 157,
	"./hr": 158,
	"./hr.js": 158,
	"./hu": 159,
	"./hu.js": 159,
	"./hy-am": 160,
	"./hy-am.js": 160,
	"./id": 161,
	"./id.js": 161,
	"./is": 162,
	"./is.js": 162,
	"./it": 163,
	"./it-ch": 164,
	"./it-ch.js": 164,
	"./it.js": 163,
	"./ja": 165,
	"./ja.js": 165,
	"./jv": 166,
	"./jv.js": 166,
	"./ka": 167,
	"./ka.js": 167,
	"./kk": 168,
	"./kk.js": 168,
	"./km": 169,
	"./km.js": 169,
	"./kn": 170,
	"./kn.js": 170,
	"./ko": 171,
	"./ko.js": 171,
	"./ku": 172,
	"./ku.js": 172,
	"./ky": 173,
	"./ky.js": 173,
	"./lb": 174,
	"./lb.js": 174,
	"./lo": 175,
	"./lo.js": 175,
	"./lt": 176,
	"./lt.js": 176,
	"./lv": 177,
	"./lv.js": 177,
	"./me": 178,
	"./me.js": 178,
	"./mi": 179,
	"./mi.js": 179,
	"./mk": 180,
	"./mk.js": 180,
	"./ml": 181,
	"./ml.js": 181,
	"./mn": 182,
	"./mn.js": 182,
	"./mr": 183,
	"./mr.js": 183,
	"./ms": 184,
	"./ms-my": 185,
	"./ms-my.js": 185,
	"./ms.js": 184,
	"./mt": 186,
	"./mt.js": 186,
	"./my": 187,
	"./my.js": 187,
	"./nb": 188,
	"./nb.js": 188,
	"./ne": 189,
	"./ne.js": 189,
	"./nl": 190,
	"./nl-be": 191,
	"./nl-be.js": 191,
	"./nl.js": 190,
	"./nn": 192,
	"./nn.js": 192,
	"./pa-in": 193,
	"./pa-in.js": 193,
	"./pl": 194,
	"./pl.js": 194,
	"./pt": 195,
	"./pt-br": 196,
	"./pt-br.js": 196,
	"./pt.js": 195,
	"./ro": 197,
	"./ro.js": 197,
	"./ru": 198,
	"./ru.js": 198,
	"./sd": 199,
	"./sd.js": 199,
	"./se": 200,
	"./se.js": 200,
	"./si": 201,
	"./si.js": 201,
	"./sk": 202,
	"./sk.js": 202,
	"./sl": 203,
	"./sl.js": 203,
	"./sq": 204,
	"./sq.js": 204,
	"./sr": 205,
	"./sr-cyrl": 206,
	"./sr-cyrl.js": 206,
	"./sr.js": 205,
	"./ss": 207,
	"./ss.js": 207,
	"./sv": 208,
	"./sv.js": 208,
	"./sw": 209,
	"./sw.js": 209,
	"./ta": 210,
	"./ta.js": 210,
	"./te": 211,
	"./te.js": 211,
	"./tet": 212,
	"./tet.js": 212,
	"./tg": 213,
	"./tg.js": 213,
	"./th": 214,
	"./th.js": 214,
	"./tl-ph": 215,
	"./tl-ph.js": 215,
	"./tlh": 216,
	"./tlh.js": 216,
	"./tr": 217,
	"./tr.js": 217,
	"./tzl": 218,
	"./tzl.js": 218,
	"./tzm": 219,
	"./tzm-latn": 220,
	"./tzm-latn.js": 220,
	"./tzm.js": 219,
	"./ug-cn": 221,
	"./ug-cn.js": 221,
	"./uk": 222,
	"./uk.js": 222,
	"./ur": 223,
	"./ur.js": 223,
	"./uz": 224,
	"./uz-latn": 225,
	"./uz-latn.js": 225,
	"./uz.js": 224,
	"./vi": 226,
	"./vi.js": 226,
	"./x-pseudo": 227,
	"./x-pseudo.js": 227,
	"./yo": 228,
	"./yo.js": 228,
	"./zh-cn": 229,
	"./zh-cn.js": 229,
	"./zh-hk": 230,
	"./zh-hk.js": 230,
	"./zh-tw": 231,
	"./zh-tw.js": 231
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 298;

/***/ }),

/***/ 441:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(0);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "ReactDOM"
var external_ReactDOM_ = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/@kartikrao/lib-forms-core/lib/models/factory.js + 9 modules
var models_factory = __webpack_require__(74);

// EXTERNAL MODULE: ./node_modules/@kartikrao/lib-forms-core/lib/views/FormView.js + 19 modules
var FormView = __webpack_require__(290);

// EXTERNAL MODULE: ./node_modules/antd/es/col/index.js + 1 modules
var es_col = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/antd/es/col/style/css.js
var css = __webpack_require__(238);

// EXTERNAL MODULE: ./node_modules/antd/es/icon/index.js + 4 modules
var es_icon = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/antd/es/icon/style/css.js
var style_css = __webpack_require__(240);

// EXTERNAL MODULE: ./node_modules/antd/es/layout/index.js
var layout = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/antd/es/layout/style/css.js
var layout_style_css = __webpack_require__(241);

// EXTERNAL MODULE: ./node_modules/antd/es/menu/index.js + 45 modules
var menu = __webpack_require__(31);

// EXTERNAL MODULE: ./node_modules/antd/es/menu/style/css.js + 1 modules
var menu_style_css = __webpack_require__(273);

// EXTERNAL MODULE: ./node_modules/mobx/lib/mobx.module.js
var mobx_module = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js + 30 modules
var react_beautiful_dnd_esm = __webpack_require__(19);

// EXTERNAL MODULE: ./node_modules/antd/es/card/index.js + 21 modules
var card = __webpack_require__(32);

// EXTERNAL MODULE: ./node_modules/antd/es/card/style/css.js + 2 modules
var card_style_css = __webpack_require__(272);

// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(53);

// CONCATENATED MODULE: ./src/components/canvas/ComponentMenu.tsx









const Container = styled_components_browser_esm["a" /* default */].div `
    padding: 4px;
    background-color: white;
`;
const Item = styled_components_browser_esm["a" /* default */].div `

`;
const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ 
    // some basic styles to make the items look a bit nicer
    userSelect: 'none', 
    // fontSize: '12px',
    // change background colour if dragging
    background: isDragging ? '#ededed' : '#fff' }, draggableStyle));
const basicGroup = {
    dropId: 'NewTextItem',
    dropType: 'Field',
    key: 'Text',
    title: 'Basic',
    icon: '',
    groups: [
        { key: 'text', title: 'Text', dragType: 'Field', dragId: 'input', icon: 'font-size' },
        { key: 'number', title: 'Number', dragType: 'Field', dragId: 'number', icon: 'calculator' },
        { key: 'select', title: 'Select', dragType: 'Field', dragId: 'select', icon: 'menu-unfold' },
        { key: 'checkbox', title: 'Checkbox', dragType: 'Field', dragId: 'checkbox', icon: 'check-square' },
        { key: 'radio', title: 'Radio', dragType: 'Field', dragId: 'radio', icon: 'check-circle' },
        { key: 'textarea', title: 'Text Area', dragType: 'Field', dragId: 'textarea', icon: 'profile' },
        { key: 'textblock', title: 'Text Block', dragType: 'Field', dragId: 'textblock', icon: 'read' }
    ]
};
const dateTimeGroup = {
    dropId: 'NewCalendarItem',
    dropType: 'Field',
    key: 'Calendar',
    title: 'Date and Time',
    icon: '',
    groups: [
        { key: 'datepicker', title: 'Date', dragType: 'Field', dragId: 'datepicker', icon: 'calendar' },
        { key: 'daterange', title: 'Range', dragType: 'Field', dragId: 'daterange', icon: 'calendar' },
        { key: 'monthpicker', title: 'Month', dragType: 'Field', dragId: 'monthpicker', icon: 'calendar' },
        { key: 'timepicker', title: 'Time', dragType: 'Field', dragId: 'timepicker', icon: 'calendar' },
        { key: 'yearpicker', title: 'Year', dragType: 'Field', dragId: 'yearpicker', icon: 'calendar' },
    ]
};
const choiceGroup = {
    dropId: 'NewChoiceGroupItem',
    dropType: 'Field',
    key: 'Choice',
    title: 'Grouped Choice',
    icon: '',
    groups: [
        { key: 'checkboxgroup', title: 'Checkbox Group', dragType: 'Field', dragId: 'checkboxgroup', icon: 'check-square' },
        { key: 'radiogroup', title: 'Radio Group', dragType: 'Field', dragId: 'radiogroup', icon: 'check-circle' },
        { key: 'cascader', title: 'Cascaded Select', dragType: 'Field', dragId: 'cascader', icon: 'menu-unfold' }
    ]
};
const interactiveGroup = {
    dropId: 'NewInteractiveItem',
    dropType: 'Field',
    key: 'Interactive',
    title: 'Interactive',
    icon: '',
    groups: [
        { key: 'slider', title: 'Slider', dragType: 'Field', dragId: 'slider', icon: 'control' },
        { key: 'starrating', title: 'Star Rating', dragType: 'Field', dragId: 'starrating', icon: 'star' },
        { key: 'switch', title: 'Switch', dragType: 'Field', dragId: 'switch', icon: 'poweroff' },
        { key: 'transfer', title: 'Upload', dragType: 'Field', dragId: 'transfer', icon: 'file-zip' }
    ]
};
class ComponentMenu_ComponentMenu extends external_React_["Component"] {
    constructor() {
        super(...arguments);
        this.droppableIndex = 0;
        this.asDroppableGroup = ({ dropId, dropType, key, title, icon, groups }) => {
            return external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => {
                return external_React_["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    external_React_["createElement"](menu["b" /* default */], { inlineCollapsed: this.submenuCollapsed, mode: "inline", theme: this.menuTheme },
                        external_React_["createElement"](menu["b" /* default */].SubMenu, { key: key, title: external_React_["createElement"]("span", null, title) }, groups.map((item, key) => {
                            return external_React_["createElement"](menu["b" /* default */].Item, { key: key, title: item.title },
                                external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: item.dragType, draggableId: item.dragId, index: this.droppableIndex++ }, (provided, snapshot) => (external_React_["createElement"](Item, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                                    external_React_["createElement"]("span", null,
                                        external_React_["createElement"](es_icon["a" /* default */], { type: item.icon }),
                                        " ",
                                        item.title),
                                    provided.placeholder))));
                        }))));
            });
        };
        this.asDroppable = (dropId, dropType, title, dragType, dragId, icon) => {
            return external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => (external_React_["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                external_React_["createElement"](menu["b" /* default */], { mode: this.menuMode, theme: this.menuTheme },
                    external_React_["createElement"](menu["b" /* default */].Item, { title: title },
                        external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (external_React_["createElement"](Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                            external_React_["createElement"]("span", null,
                                external_React_["createElement"](es_icon["a" /* default */], { type: icon }),
                                title),
                            provided.placeholder))))))));
        };
        this.asDraggableCard = (dropId, dropType, title, dragType, dragId, icon) => {
            return external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: dropId, type: dropType, isDropDisabled: true }, (provided, snapshot) => (external_React_["createElement"](Item, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: dragType, draggableId: dragId, index: this.droppableIndex++ }, (provided, snapshot) => (external_React_["createElement"](card["a" /* default */].Grid, { style: { border: 'none', width: '33%', textAlign: 'center', padding: '2px' } },
                    external_React_["createElement"](Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps, { style: getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                        external_React_["createElement"]("span", null,
                            external_React_["createElement"](es_icon["a" /* default */], { type: icon }),
                            external_React_["createElement"]("br", null),
                            title),
                        provided.placeholder)))))));
        };
    }
    render() {
        return external_React_["createElement"](card["a" /* default */], { bordered: false, title: "Controls", bodyStyle: { padding: '1px' } },
            external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: external_React_["createElement"]("small", null, "Containers") },
                this.asDraggableCard("NewPage", "Page", "Page", "Page", "p1", "layout"),
                this.asDraggableCard("NewSection", "Section", "Section", "Section", "s1", "menu"),
                this.asDraggableCard("NewColumn", "Column", "Column", "Column", "c1", "column-width")),
            external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: external_React_["createElement"]("small", null, "Basic") },
                this.asDraggableCard("NewTextField", "Field", "Text", "Field", "input", "font-size"),
                this.asDraggableCard("NewTextField", "Field", "Number", "Field", "number", "calculator"),
                this.asDraggableCard("NewTextField", "Field", "Check", "Field", "checkbox", "check-square"),
                this.asDraggableCard("NewTextField", "Field", "Radio", "Field", "radio", "check-circle"),
                this.asDraggableCard("NewTextField", "Field", "TextArea", "Field", "textarea", "profile"),
                this.asDraggableCard("NewTextField", "Field", "TextBlock", "Field", "textblock", "read"),
                this.asDraggableCard("NewTextField", "Field", "Checks", "Field", "checkboxgroup", "check-square"),
                this.asDraggableCard("NewTextField", "Field", "Radios", "Field", "radiogroup", "check-circle"),
                this.asDraggableCard("NewTextField", "Field", "Select", "Field", "select", "menu"),
                this.asDraggableCard("NewTextField", "Field", "Cascader", "Field", "cascader", "menu-unfold")),
            external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: external_React_["createElement"]("small", null, "Date and Time") },
                this.asDraggableCard("NewTextField", "Field", "Date", "Field", "datepicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Range", "Field", "daterange", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Month", "Field", "monthpicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Time", "Field", "timepicker", "calendar"),
                this.asDraggableCard("NewTextField", "Field", "Year", "Field", "yearpicker", "calendar")),
            external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { fontSize: '12px', padding: '0px', marginBottom: '1px' }, bordered: false, title: external_React_["createElement"]("small", null, "Interactive") },
                this.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control"),
                this.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star"),
                this.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff"),
                this.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")));
    }
}

// EXTERNAL MODULE: ./node_modules/antd/es/badge/index.js + 2 modules
var badge = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/antd/es/badge/style/css.js
var badge_style_css = __webpack_require__(434);

// EXTERNAL MODULE: ./node_modules/antd/es/divider/index.js
var divider = __webpack_require__(288);

// EXTERNAL MODULE: ./node_modules/antd/es/divider/style/css.js
var divider_style_css = __webpack_require__(436);

// EXTERNAL MODULE: ./node_modules/antd/es/button/index.js + 3 modules
var es_button = __webpack_require__(291);

// EXTERNAL MODULE: ./node_modules/antd/es/button/style/css.js
var button_style_css = __webpack_require__(438);

// EXTERNAL MODULE: ./node_modules/mobx-react/dist/mobx-react.module.js + 1 modules
var mobx_react_module = __webpack_require__(11);

// CONCATENATED MODULE: ./src/components/canvas/ComponentTree.tsx
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












const ItemList = styled_components_browser_esm["a" /* default */].div `
    min-height: 50px;
`;
const ComponentTree_Container = styled_components_browser_esm["a" /* default */].div `
    cursor: 'grab'
`;
const getBadgeStyle = (type) => {
    switch (type) {
        case "Page": return "magenta";
        case "Section": return "geekblue";
        case "Column": return "gold";
        case "Field": return "green";
    }
};
const ComponentTree_getItemStyle = (isDragging, draggableStyle) => (Object.assign({ 
    // some basic styles to make the items look a bit nicer
    userSelect: 'none', marginLeft: '12px', marginTop: '8px' }, draggableStyle));
class ComponentTree_FieldItem extends external_React_["Component"] {
    render() {
        let fld = this.props.fld;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Field", draggableId: fld.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](ComponentTree_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: ComponentTree_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Field"), text: `Field - ${fld.label}` })),
            provided.placeholder)));
    }
}
class ComponentTree_ColumnItem extends external_React_["Component"] {
    render() {
        let col = this.props.col;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Column", draggableId: col.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](ComponentTree_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: ComponentTree_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Column"), text: `Column - ${col.name}` })),
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    col.fields.map((f, index) => {
                        return external_React_["createElement"](ComponentTree_FieldItem, { key: f.uuid, fld: f, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
}
class ComponentTree_SectionItem extends external_React_["Component"] {
    render() {
        let sec = this.props.sec;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Section", draggableId: sec.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](ComponentTree_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: ComponentTree_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Section"), text: `Section - ${sec.name}` })),
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    sec.columns.map((col, index) => {
                        return external_React_["createElement"](ComponentTree_ColumnItem, { key: col.uuid, col: col, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
}
class ComponentTree_PageItem extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.state = { isExpanded: false };
    }
    render() {
        let page = this.props.page;
        return (external_React_["createElement"]("div", { style: { padding: '4px' } },
            external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Page", draggableId: page.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](ComponentTree_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: ComponentTree_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                external_React_["createElement"](es_button["a" /* default */], { type: "primary", size: "small", icon: "edit", style: { marginRight: '5px', userSelect: 'none' } }),
                external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Page"), text: `Page - ${page.title}` })),
                external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
                    return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                        page.sections.map((sec, index) => {
                            return external_React_["createElement"](ComponentTree_SectionItem, { key: sec.uuid, sec: sec, index: index });
                        }),
                        provided.placeholder);
                }),
                provided.placeholder)))));
    }
}
let ComponentTree_ComponentTree = class ComponentTree extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.nodeMap = {};
        this.props = props;
    }
    render() {
        let { formStore, editorStore } = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;
        return external_React_["createElement"](card["a" /* default */], { title: "Layout", bordered: false, style: { height: '100%' }, bodyStyle: { height: '100%', padding: '8px', overflow: 'auto', paddingBottom: '48px' } },
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: "pages", type: "Page" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    pages.map((page, index) => {
                        return external_React_["createElement"]("div", { key: page.uuid },
                            external_React_["createElement"](ComponentTree_PageItem, { key: page.uuid, page: page, index: index }),
                            external_React_["createElement"](divider["a" /* default */], { style: { margin: '12px 0' } }));
                    }),
                    provided.placeholder);
            }));
    }
};
ComponentTree_ComponentTree = __decorate([
    mobx_react_module["a" /* observer */]
], ComponentTree_ComponentTree);


// CONCATENATED MODULE: ./src/components/canvas/Canvas.tsx
var Canvas_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















const { Content } = layout["a" /* default */];
class Canvas_Canvas extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleNewItem = (result) => {
            const { destination, type } = result;
            const { form } = this.props.store.formStore;
            const dIndex = destination.index;
            if (type == "Page") {
                let page = this.factory.makePages({
                    id: `page-${form.content.pages.length}`,
                    title: "Untitled Page",
                    name: "Untitled Page",
                    sections: []
                })[0];
                form.addPage(page, dIndex);
            }
            else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId];
                    let section = this.factory.makeSections({
                        id: `section-${page.sections.length}`,
                        name: `Untitled Section`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId];
                    let column = this.factory.makeColumns({
                        id: `column-${section.columns.length}`,
                        name: 'Untitled Column',
                        fields: []
                    })[0];
                    section.addColumn(column, dIndex);
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId];
                    let field = this.factory.makeFields({
                        id: `field-${column.fields.length}`,
                        name: "Untitled Field",
                        label: `Untitled ${result.draggableId}`,
                        inputType: result.draggableId,
                        componentProps: {},
                        fieldOptions: {}
                    })[0];
                    column.addField(field, dIndex);
                }
            }
            return;
        };
        this.handleMoveItem = (result) => {
            const { source, destination, type } = result;
            const { form } = this.props.store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            if (type == "Page") {
                form.swapPages(source.index, destination.index);
            }
            else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
                console.log(`onDragEnd - ${type} sameParent=[${sameParent}]`);
                if (type == "Section") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapSections(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let section = prev.sections[sIndex];
                    prev.removeSection(sIndex);
                    next.addSection(section, dIndex);
                }
                else if (type == "Column") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapColumns(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.columns[sIndex];
                    prev.removeColumn(sIndex);
                    next.addColumn(column, dIndex);
                }
                else if (type == "Field") {
                    let prev = this.itemMap[sParentId];
                    if (sameParent) {
                        prev.swapFields(sIndex, dIndex);
                        return;
                    }
                    let next = this.itemMap[dParentId];
                    let column = prev.fields[sIndex];
                    prev.removeField(sIndex);
                    next.addField(column, dIndex);
                }
            }
        };
        this.onDragEnd = (result) => {
            const { source, type } = result;
            console.log(`onDragEnd - ${type}`, result);
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            }
            else {
                this.handleMoveItem(result);
            }
        };
        this.state = {
            siderCollapsed: false
        };
        this.onSiderCollapse = (siderCollapsed) => {
            this.setState({ siderCollapsed });
        };
        this.toggleSider = () => {
            this.setState({ siderCollapsed: !this.state.siderCollapsed });
        };
        this.factory = new models_factory["a" /* Factory */](this.props.store.formStore);
    }
    get itemMap() {
        let { form } = this.props.store.formStore;
        let { pages } = form.content;
        let itemMap = {};
        pages.forEach((p) => {
            itemMap[p.uuid] = p;
            p.sections.forEach((s, si) => {
                itemMap[s.uuid] = s;
                s.columns.forEach((c, ci) => {
                    itemMap[c.uuid] = c;
                    c.fields.forEach((f, fi) => {
                        itemMap[f.uuid] = f;
                    });
                });
            });
        });
        return itemMap;
    }
    render() {
        let { formStore } = this.props.store;
        return external_React_["createElement"](layout["a" /* default */], { className: "fl-full-height-nopad" },
            external_React_["createElement"](menu["b" /* default */], { mode: "horizontal", theme: "light", multiple: true, className: "fl-shadow-sides" },
                external_React_["createElement"](menu["b" /* default */].Item, { title: "Form Controls", onClick: this.toggleSider, key: "controls" },
                    external_React_["createElement"](es_icon["a" /* default */], { theme: this.state.siderCollapsed ? 'outlined' : 'filled', type: "control" }))),
            external_React_["createElement"](layout["a" /* default */].Content, null,
                external_React_["createElement"](react_beautiful_dnd_esm["a" /* DragDropContext */], { onDragEnd: this.onDragEnd },
                    external_React_["createElement"](layout["a" /* default */], { className: "fl-full-height-nopad" },
                        external_React_["createElement"](layout["a" /* default */].Sider, { trigger: null, collapsed: this.state.siderCollapsed, style: { zIndex: 11 }, collapsible: true, onCollapse: this.onSiderCollapse, theme: "light", collapsedWidth: 0 },
                            external_React_["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                external_React_["createElement"](ComponentMenu_ComponentMenu, null))),
                        external_React_["createElement"](Content, { style: { overflow: "hidden", padding: '0' } },
                            external_React_["createElement"](es_col["a" /* default */], { span: 8, style: { height: '100%' } },
                                external_React_["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    external_React_["createElement"](ComponentTree_ComponentTree, { store: this.props.store }))),
                            external_React_["createElement"](es_col["a" /* default */], { span: 16, style: { height: '100%' } },
                                external_React_["createElement"]("div", { className: "fl-grey-box fl-shadow-sides fl-full-height" },
                                    external_React_["createElement"](FormView["a" /* FormView */], { store: formStore }))))))));
    }
}
Canvas_decorate([
    mobx_module["c" /* computed */]
], Canvas_Canvas.prototype, "itemMap", null);

// EXTERNAL MODULE: ./node_modules/@kartikrao/lib-forms-core/lib/models/condition.predicate.js
var condition_predicate = __webpack_require__(34);

// CONCATENATED MODULE: ./src/store/EditorStore.ts
var EditorStore_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class EditorStore_EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.field.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.field.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.field.setCondition(condition);
                return;
            }
            this.field.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.field.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.field.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.field.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.field.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.field[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.field.componentProps[key] = value;
        };
        this.setField = (f) => {
            this.field = f;
        };
        this.initialize(data);
    }
    initialize(data) {
        this.field = data.field;
        this.formStore = data.formStore;
        this.factory = data.factory;
        return;
    }
    get availableConditionSources() {
        let { formStore } = this;
        let fieldList = [];
        Object.keys(this.formStore.idFieldMap).forEach((id, index) => {
            fieldList.push({
                key: index,
                id: id,
                label: formStore.idFieldMap[id].label,
                name: formStore.idFieldMap[id].name
            });
        });
        return fieldList;
    }
    get availableExpressions() {
        let expressions = [];
        condition_predicate["a" /* default */].PredicateConditions.forEach((p) => {
            expressions.push({ value: p, name: p });
        });
        return expressions;
    }
    get availableOperators() {
        let operators = [];
        condition_predicate["a" /* default */].PredicateOperators.forEach((o) => {
            operators.push({ value: o, name: o });
        });
        return operators;
    }
    get hasCondition() {
        return !!this.field.condition;
    }
    get numPredicates() {
        return this.field.condition ? this.field.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.field;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.field.setCondition(null);
        }
    }
    get visible() {
        return !!this.field;
    }
}
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "initialize", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "availableConditionSources", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "availableExpressions", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "availableOperators", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "hasCondition", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "numPredicates", null);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "addCondition", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "removePredicate", null);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "addPredicate", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setCondition", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "addValidationRule", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "updateValidationRule", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "removeValidationRule", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setFieldProperty", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setComponentProperty", void 0);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setField", void 0);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "visible", null);
Object(mobx_module["f" /* decorate */])(EditorStore_EditorStore, {
    field: mobx_module["k" /* observable */]
});
/* harmony default export */ var store_EditorStore = (EditorStore_EditorStore);

// EXTERNAL MODULE: ./node_modules/@kartikrao/lib-forms-core/lib/store/FormStore.js
var FormStore = __webpack_require__(289);

// CONCATENATED MODULE: ./src/store/RootStore.ts
var RootStore_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




Object(mobx_module["d" /* configure */])({ enforceActions: "always" });
class RootStore_RootStore {
    constructor(data) {
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = new FormStore["a" /* default */]();
        let factory = new models_factory["a" /* Factory */](this.formStore);
        this.editorStore = new store_EditorStore({ formStore: this.formStore, factory: factory, field: null });
        this.formData = factory.makeForm(data);
    }
}
RootStore_decorate([
    mobx_module["b" /* action */]
], RootStore_RootStore.prototype, "initialize", null);
Object(mobx_module["f" /* decorate */])(RootStore_RootStore, {
    formData: mobx_module["k" /* observable */]
});
/* harmony default export */ var store_RootStore = (RootStore_RootStore);

// CONCATENATED MODULE: ./src/index.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderForm", function() { return renderForm; });






function renderForm(selector, initialState) {
    let store = new store_RootStore(initialState);
    Object(external_ReactDOM_["render"])(external_React_default.a.createElement(layout["a" /* default */], { style: { height: '100vh', overflow: 'hidden' } },
        external_React_default.a.createElement(Canvas_Canvas, { store: store })), document.querySelector(selector));
}
;


/***/ })

/******/ });
//# sourceMappingURL=main.js.map