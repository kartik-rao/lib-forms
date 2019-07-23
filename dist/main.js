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
/******/
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
/******/ 	deferredModules.push([541,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

(function() { module.exports = window["React"]; }());

/***/ }),

/***/ 16:
/***/ (function(module, exports) {

(function() { module.exports = window["moment"]; }());

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

(function() { module.exports = window["antd"]; }());

/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "React"
var external_React_ = __webpack_require__(0);
var external_React_default = /*#__PURE__*/__webpack_require__.n(external_React_);

// EXTERNAL MODULE: external "ReactDOM"
var external_ReactDOM_ = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/antd/es/col/index.js
var es_col = __webpack_require__(22);

// EXTERNAL MODULE: ./node_modules/antd/es/col/style/css.js
var css = __webpack_require__(56);

// EXTERNAL MODULE: ./node_modules/antd/es/icon/index.js + 3 modules
var es_icon = __webpack_require__(10);

// EXTERNAL MODULE: ./node_modules/antd/es/icon/style/css.js
var style_css = __webpack_require__(124);

// EXTERNAL MODULE: ./node_modules/antd/es/layout/index.js
var es_layout = __webpack_require__(81);

// EXTERNAL MODULE: ./node_modules/antd/es/layout/style/css.js
var layout_style_css = __webpack_require__(198);

// EXTERNAL MODULE: ./node_modules/antd/es/menu/index.js + 3 modules
var menu = __webpack_require__(54);

// EXTERNAL MODULE: ./node_modules/antd/es/menu/style/css.js
var menu_style_css = __webpack_require__(199);

// EXTERNAL MODULE: ./node_modules/mobx/lib/mobx.module.js
var mobx_module = __webpack_require__(2);

// EXTERNAL MODULE: ./node_modules/mobx-react/dist/mobx-react.module.js + 1 modules
var mobx_react_module = __webpack_require__(12);

// EXTERNAL MODULE: ./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js + 33 modules
var react_beautiful_dnd_esm = __webpack_require__(34);

// EXTERNAL MODULE: ./node_modules/antd/es/drawer/index.js + 3 modules
var drawer = __webpack_require__(60);

// EXTERNAL MODULE: ./node_modules/antd/es/drawer/style/css.js
var drawer_style_css = __webpack_require__(92);

// EXTERNAL MODULE: ./node_modules/antd/es/row/index.js
var es_row = __webpack_require__(29);

// EXTERNAL MODULE: ./node_modules/antd/es/row/style/css.js
var row_style_css = __webpack_require__(64);

// EXTERNAL MODULE: ./node_modules/antd/es/tabs/index.js + 15 modules
var tabs = __webpack_require__(37);

// EXTERNAL MODULE: ./node_modules/antd/es/tabs/style/css.js
var tabs_style_css = __webpack_require__(116);

// EXTERNAL MODULE: ./node_modules/antd/lib/form/Form.js
var Form = __webpack_require__(30);
var Form_default = /*#__PURE__*/__webpack_require__.n(Form);

// EXTERNAL MODULE: ./node_modules/antd/es/button/index.js + 2 modules
var es_button = __webpack_require__(17);

// EXTERNAL MODULE: ./node_modules/antd/es/button/style/css.js
var button_style_css = __webpack_require__(38);

// EXTERNAL MODULE: ./node_modules/antd/es/card/index.js + 2 modules
var card = __webpack_require__(28);

// EXTERNAL MODULE: ./node_modules/antd/es/card/style/css.js
var card_style_css = __webpack_require__(57);

// EXTERNAL MODULE: ./node_modules/antd/es/empty/index.js
var empty = __webpack_require__(48);

// EXTERNAL MODULE: ./node_modules/antd/es/empty/style/css.js
var empty_style_css = __webpack_require__(93);

// EXTERNAL MODULE: ./node_modules/antd/es/input/index.js + 7 modules
var input = __webpack_require__(21);

// EXTERNAL MODULE: ./node_modules/antd/es/input/style/css.js
var input_style_css = __webpack_require__(65);

// EXTERNAL MODULE: ./node_modules/antd/es/table/index.js + 47 modules
var table = __webpack_require__(76);

// EXTERNAL MODULE: ./node_modules/antd/es/table/style/css.js + 4 modules
var table_style_css = __webpack_require__(142);

// EXTERNAL MODULE: ./node_modules/antd/es/divider/style/css.js
var divider_style_css = __webpack_require__(157);

// EXTERNAL MODULE: ./node_modules/react-drag-listview/es/index.js + 3 modules
var es = __webpack_require__(277);

// EXTERNAL MODULE: ./node_modules/react-highlight-words/dist/main.js
var main = __webpack_require__(260);
var main_default = /*#__PURE__*/__webpack_require__.n(main);

// CONCATENATED MODULE: ./src/components/editors/common/FormLayoutCommon.ts
const FormLayoutCommon_tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 18,
        },
        sm: {
            span: 24,
            offset: 18,
        },
    },
};
const FormLayoutCommon_formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 14 },
    },
};

// CONCATENATED MODULE: ./src/components/editors/field/partials/ChoiceOptionEditorView.tsx
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















let ChoiceOptionEditorView_ChoiceOptionEditorView = class ChoiceOptionEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.showAddChoiceItem = (show) => {
            this.showAdd = show;
        };
        this.addChoiceOption = (e) => {
            console.log("Adding", e);
            // this.items.push({label: this.label, value: this.value});
            // this.props.onChange(this.items);
        };
        this.getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (external_React_["createElement"]("div", { style: { padding: 8 } },
                external_React_["createElement"](input["a" /* default */], { ref: node => { this.setSearchInput(node); }, placeholder: `Search ${dataIndex}`, value: selectedKeys[0], onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => this.handleSearch(selectedKeys, confirm), style: { width: 188, marginBottom: 8, display: 'block' } }),
                external_React_["createElement"](es_button["a" /* default */], { type: "primary", onClick: () => this.handleSearch(selectedKeys, confirm), icon: "search", size: "small", style: { width: 90, marginRight: 8 } }, "Search"),
                external_React_["createElement"](es_button["a" /* default */], { onClick: () => this.handleReset(clearFilters), size: "small", style: { width: 90 } }, "Reset"))),
            filterIcon: filtered => external_React_["createElement"](es_icon["a" /* default */], { type: "search", style: { color: filtered ? '#1890ff' : undefined } }),
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) => (external_React_["createElement"](main_default.a, { highlightStyle: { backgroundColor: '#ffc069', padding: 0 }, searchWords: [this.searchText], autoEscape: true, textToHighlight: text.toString() })),
        });
        this.handleSearch = (selectedKeys, confirm) => {
            confirm();
            this.searchText = selectedKeys[0];
        };
        this.handleReset = (clearFilters) => {
            clearFilters();
            this.searchText = '';
        };
        this.initialize(props);
    }
    initialize(props) {
        this.type = props.type;
        this.items = props.items;
        this.value = null;
        this.label = null;
        this.isEditing = false;
    }
    move(fromIndex, toIndex) {
        this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
        this.props.onChange(this.items);
    }
    edit(record) {
        this.isEditing = true;
        this.label = record.label;
        this.value = record.value;
    }
    remove(index) {
        this.items.splice(index, 1);
        this.props.onChange(this.items);
    }
    setSearchInput(node) {
        this.searchInput = node;
    }
    get uniqueValuePattern() {
        let allValues = this.items.map((item) => {
            return item.value;
        });
        return new RegExp(`^((?!(${allValues.join("|")})).)*$`, "gi");
    }
    render() {
        console.log("COEV - PRERENDER", this.props);
        let columns = [{
                title: '',
                key: "operate",
                render: (text, record, index) => external_React_["createElement"]("span", { style: { float: 'right', marginRight: '20%' } },
                    external_React_["createElement"](es_icon["a" /* default */], { className: "drag-handle", type: "drag" }))
            }, Object.assign({ title: 'Label', dataIndex: 'label', key: 'label', sorter: true }, this.getColumnSearchProps('label')), Object.assign({ title: 'Value', dataIndex: 'value', key: 'value', sorter: true }, this.getColumnSearchProps('value')), {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (external_React_["createElement"]("span", null,
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "default", onClick: () => { this.edit(record); }, icon: "tool", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }),
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "danger", onClick: () => { this.remove(record.index); }, icon: "delete", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }))),
            }];
        let rows = [];
        this.items.forEach((item, index) => {
            rows.push({ index: index, label: item.label, value: item.value, key: index });
        });
        let { getFieldDecorator } = this.props.form;
        return external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { padding: 0 }, bordered: false },
            this.items.length == 0 && external_React_["createElement"](empty["a" /* default */], { description: external_React_["createElement"]("span", null, "No options on this field") }),
            this.items.length > 0 && external_React_["createElement"](es["a" /* default */], { onDragEnd: this.move, handleSelector: "i", nodeSelector: "tr.ant-table-row" },
                external_React_["createElement"](table["a" /* default */], { size: "small", pagination: rows.length > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key', footer: () => this.showAdd ? external_React_["createElement"](external_React_["Fragment"], null) : external_React_["createElement"](es_button["a" /* default */], { size: "small", onClick: (e) => this.showAddChoiceItem(true) }, "Add") })),
            this.showAdd && external_React_["createElement"](card["a" /* default */], { title: "Add option", size: "small", style: { marginTop: '15px' } },
                external_React_["createElement"](Form_default.a, Object.assign({}, FormLayoutCommon_formItemLayout, { layout: "horizontal", onSubmit: (e) => this.addChoiceOption(e) }),
                    external_React_["createElement"](Form_default.a.Item, { help: "Enter the label shown to the user (must be unique)", label: "Label" }, getFieldDecorator('label', {
                        valuePropName: 'label',
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A label is required' }
                        ]
                    })(external_React_["createElement"](input["a" /* default */], null))),
                    external_React_["createElement"](Form_default.a.Item, { help: "Enter the value that will be submitted (must be unique)", label: "Value" }, getFieldDecorator('value', {
                        valuePropName: 'value',
                        rules: [{ type: 'string' },
                            { required: true, message: 'A value is required' },
                            { pattern: this.uniqueValuePattern, message: "Invalid value, must be unique" }
                        ]
                    })(external_React_["createElement"](input["a" /* default */], null))),
                    external_React_["createElement"](Form_default.a.Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout),
                        external_React_["createElement"](es_button["a" /* default */], { type: "danger", style: { marginRight: '15px' }, onClick: () => this.showAddChoiceItem(false) }, "Cancel"),
                        external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit" }, "Save")))));
    }
};
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "type", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "items", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "label", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "value", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "isEditing", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "searchInput", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "showAdd", void 0);
__decorate([
    mobx_module["j" /* observable */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "searchText", void 0);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "showAddChoiceItem", void 0);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "initialize", null);
__decorate([
    mobx_module["b" /* action */].bound
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "move", null);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "edit", null);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "addChoiceOption", void 0);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "remove", null);
__decorate([
    mobx_module["b" /* action */].bound
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "setSearchInput", null);
__decorate([
    mobx_module["c" /* computed */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "uniqueValuePattern", null);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "handleSearch", void 0);
__decorate([
    mobx_module["b" /* action */]
], ChoiceOptionEditorView_ChoiceOptionEditorView.prototype, "handleReset", void 0);
ChoiceOptionEditorView_ChoiceOptionEditorView = __decorate([
    mobx_react_module["a" /* observer */]
], ChoiceOptionEditorView_ChoiceOptionEditorView);
const WrappedChoiceOptionEditorView = Form_default.a.create({ name: 'ChoiceOptionEditorView' })(ChoiceOptionEditorView_ChoiceOptionEditorView);
/* harmony default export */ var partials_ChoiceOptionEditorView = (WrappedChoiceOptionEditorView);

// EXTERNAL MODULE: ./node_modules/antd/es/form/index.js + 10 modules
var es_form = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/antd/es/form/style/css.js
var form_style_css = __webpack_require__(66);

// EXTERNAL MODULE: ./node_modules/antd/es/select/index.js + 9 modules
var es_select = __webpack_require__(24);

// EXTERNAL MODULE: ./node_modules/antd/es/select/style/css.js
var select_style_css = __webpack_require__(83);

// EXTERNAL MODULE: ./node_modules/antd/es/tag/index.js + 1 modules
var tag = __webpack_require__(90);

// EXTERNAL MODULE: ./node_modules/antd/es/tag/style/css.js
var tag_style_css = __webpack_require__(183);

// CONCATENATED MODULE: ./src/components/editors/field/partials/ConditionsView.tsx
var ConditionsView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















let ConditionsView_ConditionsEditorView = class ConditionsEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.setPredicateAttribute = (attr, value) => {
            console.log(`Set ${attr} = "${value}"`);
            this[attr] = value;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    if (this.isEditing) {
                        let { store } = this.props;
                        let predicate = store.selectedField.condition.predicates.find((p) => {
                            return p.uuid == this.uuid;
                        });
                        predicate.field = this.field;
                        predicate.condition = this.condition;
                        predicate.operator = this.operator;
                        predicate.value = this.value;
                    }
                    else {
                        this.addPredicate({
                            field: this.field,
                            condition: this.condition,
                            operator: this.operator,
                            value: this.value
                        });
                    }
                    this.reset();
                }
            });
        };
        this.initialize(props);
    }
    initialize(props) {
        this.reset();
    }
    addPredicate(p) {
        let { store } = this.props;
        store.addPredicate(p);
        return;
    }
    removePredicate(uuid) {
        let { store } = this.props;
        store.removePredicate(uuid);
    }
    editPredicate(uuid) {
        let { store } = this.props;
        let predicate = store.selectedField.condition.predicates.find((p) => {
            return p.uuid == uuid;
        });
        this.uuid = predicate.uuid;
        this.field = predicate.field;
        this.condition = predicate.condition;
        this.value = predicate.value;
        this.operator = predicate.operator;
        this.setIsEditing(true);
    }
    reset() {
        this.isAdding = false;
        this.isEditing = false;
        this.uuid = null;
        this.field = null;
        this.condition = null;
        this.value = null;
        this.operator = null;
    }
    setIsAdding(value) {
        this.isAdding = value;
    }
    setIsEditing(value) {
        this.isEditing = value;
    }
    render() {
        let { selectedField: field, availableConditionSources, availableExpressions, availableOperators, numPredicates } = this.props.store;
        let columns = [
            { title: 'Operator', dataIndex: 'operator', key: 'operator', render: (text, record) => (record.operator ? external_React_["createElement"](tag["a" /* default */], null, record.operator) : external_React_["createElement"](external_React_["Fragment"], null)) },
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Action', key: 'action',
                render: (text, record) => (external_React_["createElement"]("span", null,
                    external_React_["createElement"](es_button["a" /* default */], { style: { marginRight: '10px' }, icon: "edit", shape: "circle", size: "small", onClick: (e) => this.editPredicate(record.uuid) }),
                    external_React_["createElement"](es_button["a" /* default */], { icon: "delete", shape: "circle", size: "small", onClick: (e) => this.removePredicate(record.uuid) })))
            }
        ];
        let { getFieldDecorator } = this.props.form;
        return external_React_["createElement"]("div", null,
            external_React_["createElement"](card["a" /* default */], { title: "Conditions", size: "small", bodyStyle: { padding: 0 }, actions: [external_React_["createElement"](es_button["a" /* default */], { size: "small", onClick: () => this.setIsAdding(true) }, "Add")] },
                numPredicates > 0 && external_React_["createElement"]("div", null,
                    external_React_["createElement"](table["a" /* default */], { size: "small", pagination: numPredicates > 5 ? { position: 'bottom' } : false, dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
                numPredicates == 0 && external_React_["createElement"](empty["a" /* default */], { description: external_React_["createElement"]("span", null, "No conditional rendering on this field") })),
            (this.isAdding || this.isEditing) && external_React_["createElement"](card["a" /* default */], { size: "small", title: "Add condition", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' } },
                external_React_["createElement"](es_form["a" /* default */], Object.assign({ layout: "horizontal" }, FormLayoutCommon_formItemLayout, { onSubmit: (e) => this.handleSubmit(e) }),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Source field", help: "Field the condition is predicated upon", required: true }, getFieldDecorator('field', {
                        initialValue: this.field,
                        rules: [{ type: 'string' }, { required: true }]
                    })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => this.setPredicateAttribute('field', e) }, availableConditionSources.map((f) => {
                        return external_React_["createElement"](es_select["a" /* default */].Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                    })))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Condition", help: "The expression to evaluate" }, getFieldDecorator('condition', {
                        initialValue: this.condition,
                        rules: [{ type: 'string' }, { required: true }]
                    })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => this.setPredicateAttribute('condition', e) }, availableExpressions.map((e) => {
                        return external_React_["createElement"](es_select["a" /* default */].Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Value", help: "The target value", required: this.condition && this.condition.indexOf('hasval') == -1 }, getFieldDecorator('value', {
                        initialValue: this.value,
                        rules: [{ type: 'string' }, { required: this.condition && this.condition.indexOf('hasval') == -1 }]
                    })(external_React_["createElement"](input["a" /* default */], { type: "text", disabled: !this.field || !this.condition || this.condition.indexOf('hasval') > -1, onChange: (e) => this.setPredicateAttribute('value', e.target.value) }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Operator", help: "Operator to combine conditions" }, getFieldDecorator('operator', {
                        initialValue: this.operator,
                        rules: [{ type: 'string' }, { required: numPredicates > 0 }]
                    })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => this.setPredicateAttribute('operator', e), disabled: numPredicates == 0 }, availableOperators.map((e) => {
                        return external_React_["createElement"](es_select["a" /* default */].Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout),
                        external_React_["createElement"](es_button["a" /* default */], { style: { marginRight: '15px' }, size: "small", htmlType: "submit", type: "primary", disabled: !this.field || !this.condition }, "Save"),
                        external_React_["createElement"](es_button["a" /* default */], { type: "danger", size: "small", onClick: () => this.reset() }, "Cancel")))));
    }
};
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "isAdding", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "isEditing", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "uuid", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "field", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "condition", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "value", void 0);
ConditionsView_decorate([
    mobx_module["j" /* observable */]
], ConditionsView_ConditionsEditorView.prototype, "operator", void 0);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "initialize", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "setPredicateAttribute", void 0);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "addPredicate", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "removePredicate", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "editPredicate", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "reset", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "handleSubmit", void 0);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "setIsAdding", null);
ConditionsView_decorate([
    mobx_module["b" /* action */]
], ConditionsView_ConditionsEditorView.prototype, "setIsEditing", null);
ConditionsView_ConditionsEditorView = ConditionsView_decorate([
    mobx_react_module["a" /* observer */]
], ConditionsView_ConditionsEditorView);
const WrappedConditionsEditorView = es_form["a" /* default */].create({ name: 'ConditionsEditorView' })(ConditionsView_ConditionsEditorView);
/* harmony default export */ var ConditionsView = (WrappedConditionsEditorView);

// EXTERNAL MODULE: ./node_modules/antd/es/notification/index.js + 3 modules
var notification = __webpack_require__(43);

// EXTERNAL MODULE: ./node_modules/antd/es/notification/style/css.js
var notification_style_css = __webpack_require__(75);

// EXTERNAL MODULE: ./node_modules/antd/es/date-picker/index.js + 41 modules
var date_picker = __webpack_require__(79);

// EXTERNAL MODULE: ./node_modules/antd/es/date-picker/style/css.js + 1 modules
var date_picker_style_css = __webpack_require__(190);

// EXTERNAL MODULE: ./node_modules/antd/es/input-number/index.js + 4 modules
var input_number = __webpack_require__(52);

// EXTERNAL MODULE: ./node_modules/antd/es/input-number/style/css.js
var input_number_style_css = __webpack_require__(184);

// EXTERNAL MODULE: ./node_modules/antd/es/switch/index.js
var es_switch = __webpack_require__(63);

// EXTERNAL MODULE: ./node_modules/antd/es/switch/style/css.js
var switch_style_css = __webpack_require__(185);

// EXTERNAL MODULE: external "moment"
var external_moment_ = __webpack_require__(16);
var external_moment_default = /*#__PURE__*/__webpack_require__.n(external_moment_);

// CONCATENATED MODULE: ./src/components/editors/field/partials/EditableFieldProperties.tsx














const makeProp = (key, label, type, other = {}) => {
    let { options, rules, formatKey, formatValue, help, defaultValue } = other;
    return { key: key, label: label, type: type, options: options, rules: rules, formatKey: formatKey, formatValue: formatValue, help: help, defaultValue: defaultValue };
};
const basicProps = [
    makeProp("name", "Name", 'string', { rules: [{ type: "string" }, { required: true, message: "A name is required" }] }),
    makeProp("label", "Label", 'string', [{ type: "string" }, { required: true, message: "A label is required" }]),
    makeProp("helpText", "Help Text", 'text')
];
const ValuePropName = makeProp("fo_valuePropName", "Value Property Name", 'string', { rules: [
        { type: 'string' },
        { required: true, message: 'A value property name is required' },
        { pattern: /^[aA-zZ]+[\w\_]{0,}$/, message: 'Invalid Property Name' },
    ], help: "Starts with an alphabet followed by alphabets, underscores or numbers" });
const FieldPropertiesMap = {
    "input": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultValue", "Default Value", 'string'),
        { key: "c_size", label: "Size", type: 'options', options: [
                { label: "default", value: "default" },
                { label: "small", value: "small" },
                { label: "large", value: "large" }
            ],
            defaultValue: 'default' }
    ],
    "radio": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'string'),
        makeProp("c_defaultChecked", "boolean", 'string'),
    ],
    "checkbox": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultChecked", "Checked", 'boolean'),
    ],
    "number": [
        ...basicProps,
        ValuePropName,
        makeProp("c_placeholder", "Placeholder", 'number'),
        makeProp("c_defaultValue", "Default Value", 'number')
    ],
    "select": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string'),
    ],
    "cascader": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "radiogroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "checkboxgroup": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textarea": [
        ...basicProps,
        ValuePropName,
        makeProp("c_defaultValue", "Default Value", 'string')
    ],
    "textblock": [
        ...basicProps,
        makeProp("c_defaultValue", "Content", 'string')
    ],
    "datepicker": [
        ...basicProps,
        ValuePropName,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" }
    ],
    "daterange": [
        ...basicProps,
        { key: "c_dateFormat", label: "Date Format", type: "options", options: [
                { value: "DD-MM-YYYY", label: "DD-MM-YYYY" },
                { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
                { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                { value: "YYYY/MM/DD", label: "YYYY/MM/DD" }
            ], defaultValue: "YYYY-MM-DD" },
        { key: "c_defaultStartValue", label: "Default Start Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_defaultEndValue", label: "Default End Date", type: "date", formatKey: 'c_dateFormat' },
        { key: "c_startValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
        { key: "c_endValuePropsName", label: "Start Date Property Name", type: "string", rules: [{ pattern: /^[aA-zZ][\w|_|0-9]+/, message: "Must be valid property name" }] },
    ]
};
const asDecoratedProperty = (item, decorator, valueFn, config, index) => {
    let { key, label, type, options, rules, required, formatValue, formatKey, help, defaultValue } = config;
    let isCprop = key.indexOf("c_") > -1;
    let isFoProp = key.indexOf("fo_") > -1;
    let unprefixKey = isCprop ? key.replace("c_", "") : (isFoProp ? key.replace("fo_", "") : key);
    let initialValue = isCprop ? item.componentProps[unprefixKey] : (isFoProp ? item.fieldOptions[unprefixKey] : item[unprefixKey]);
    let format;
    if (type == 'date') {
        if (formatValue || formatKey) {
            // Fetch format from existing property on the field
            format = formatValue ? formatValue : valueFn(formatKey);
        }
        if (initialValue) {
            // ANTD requires this to be a moment object
            initialValue = external_moment_(initialValue, format);
        }
    }
    let fragment;
    switch (type) {
        case "string":
            fragment = external_React_["createElement"](input["a" /* default */], null);
            break;
        case "text":
            fragment = external_React_["createElement"](input["a" /* default */].TextArea, null);
            break;
        case "boolean":
            fragment = external_React_["createElement"](es_switch["a" /* default */], null);
            break;
        case "number":
            fragment = external_React_["createElement"](input_number["a" /* default */], null);
            break;
        case "options": {
            fragment = external_React_["createElement"](es_select["a" /* default */], null, options && options.map((opt, oi) => {
                return external_React_["createElement"](es_select["a" /* default */].Option, { key: oi, value: opt.value }, opt.label);
            }));
            break;
        }
        case "date":
            fragment = external_React_["createElement"](date_picker["a" /* default */], { format: format });
            break;
    }
    let value = (typeof initialValue != 'undefined' && initialValue != null) ? initialValue : defaultValue;
    let valuePropName = (item.inputType == 'checkbox' && unprefixKey == 'defaultChecked') ? 'checked' : 'value';
    return external_React_["createElement"](es_form["a" /* default */].Item, { label: label, required: required, key: index, help: help }, decorator(key, {
        valuePropName: valuePropName,
        initialValue: value,
        rules: rules
    })(fragment));
};

// CONCATENATED MODULE: ./src/components/editors/field/partials/PropertiesView.tsx
var PropertiesView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let PropertiesView_PropertiesView = class PropertiesView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedField: field } = this.props.store;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let merge = { componentProps: {}, fieldOptions: {} };
                    Object.keys(values).forEach((p) => {
                        if (p.indexOf("c_") == 0) {
                            // Component Property
                            merge.componentProps[p.replace("c_", "")] = values[p];
                        }
                        else if (p.indexOf("fo_") == 0) {
                            // Field Option Property
                            merge.fieldOptions[p.replace("fo_", "")] = values[p];
                        }
                        else {
                            merge[p] = values[p];
                        }
                    });
                    console.log("Merge object", merge);
                    console.log("Pre Update Field", Object(mobx_module["n" /* toJS */])(field));
                    field.mergeUpdate(merge);
                    console.log("Updated Field", Object(mobx_module["n" /* toJS */])(field));
                    notification["a" /* default */].info({ message: `Field - ${field.label || field.name}`,
                        description: "Field properties applied successfully" });
                }
            });
            return;
        };
    }
    updateOptions(options) {
        this.props.store.selectedField.componentProps["options"] = options;
    }
    render() {
        let field = Object(mobx_module["n" /* toJS */])(this.props.store.selectedField);
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 18 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 21,
                },
                sm: {
                    span: 24,
                    offset: 21,
                },
            },
        };
        let { getFieldDecorator, getFieldValue } = this.props.form;
        let formItems = FieldPropertiesMap[field.inputType];
        return external_React_["createElement"](es_form["a" /* default */], Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            formItems && formItems.map((item, index) => {
                {
                    return asDecoratedProperty(field, getFieldDecorator, getFieldValue, item, index);
                }
            }),
            !formItems && external_React_["createElement"](empty["a" /* default */], { description: external_React_["createElement"]("span", null, "No editable properties available for this field") }),
            formItems && external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, tailFormItemLayout),
                external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
PropertiesView_decorate([
    mobx_module["b" /* action */].bound
], PropertiesView_PropertiesView.prototype, "updateOptions", null);
PropertiesView_PropertiesView = PropertiesView_decorate([
    mobx_react_module["a" /* observer */]
], PropertiesView_PropertiesView);
const WrappedPropertiesView = es_form["a" /* default */].create({ name: 'PropertiesView' })(PropertiesView_PropertiesView);
/* harmony default export */ var partials_PropertiesView = (WrappedPropertiesView);

// EXTERNAL MODULE: ./node_modules/@kartikrao/lib-forms-core/lib/index.js + 38 modules
var lib = __webpack_require__(41);

// EXTERNAL MODULE: ./node_modules/antd/es/checkbox/index.js + 2 modules
var es_checkbox = __webpack_require__(62);

// EXTERNAL MODULE: ./node_modules/antd/es/checkbox/style/css.js
var checkbox_style_css = __webpack_require__(201);

// EXTERNAL MODULE: ./node_modules/antd/es/timeline/style/css.js
var timeline_style_css = __webpack_require__(499);

// CONCATENATED MODULE: ./src/components/editors/field/partials/ValidationListView.tsx
var ValidationListView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let ValidationListView_ValidationListView = class ValidationListView extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let columns = [{
                title: 'Rule',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Constraints',
                dataIndex: 'constraint',
                key: 'constraint',
                render: (text, record) => {
                    return external_React_["createElement"](external_React_["Fragment"], null, Object.keys(record.constraint).map((key) => {
                        let value;
                        if (!Array.isArray(record.constraint[key])) {
                            value = [record.constraint[key]];
                        }
                        else {
                            value = record.constraint[key];
                        }
                        return key == 'message' ? null : external_React_["createElement"]("div", { key: key },
                            external_React_["createElement"](tag["a" /* default */], { key: `${key}-k` }, key),
                            external_React_["createElement"]("span", { key: `${key}-v` }, value.map((v, vi) => {
                                return external_React_["createElement"](tag["a" /* default */], { key: `${key}-v-${vi}`, color: "#87d068" }, v);
                            })));
                    }));
                }
            },
            {
                title: 'Message',
                dataIndex: 'defaultMessage',
                key: 'defaultMessage',
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (external_React_["createElement"]("span", null,
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "default", onClick: (e) => { this.props.onEdit(record.rule); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "danger", onClick: (e) => { this.props.onRemove(record.rule); }, icon: "delete", size: "small" }))),
            }];
        let numConstraints = 0;
        let rows = [];
        if (this.props.validation && this.props.validation.constraints) {
            let { constraints } = this.props.validation;
            numConstraints = Object.keys(constraints).length;
            Object.keys(constraints).forEach((rule, index) => {
                let row = {};
                let { message } = constraints[rule];
                row.rule = rule;
                row.name = lib["h" /* ValidationRuleMap */][rule];
                row.key = index;
                row.defaultMessage = message;
                row.constraint = constraints[rule];
                rows.push(row);
            });
        }
        return external_React_["createElement"](table["a" /* default */], { title: () => external_React_["createElement"]("span", null, "Validation rules"), size: "small", pagination: numConstraints > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key' });
    }
};
ValidationListView_ValidationListView = ValidationListView_decorate([
    mobx_react_module["a" /* observer */]
], ValidationListView_ValidationListView);


// CONCATENATED MODULE: ./src/components/editors/field/partials/ValidationView.tsx
var ValidationView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























let ValidationView_ValidationView = class ValidationView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.dateFormat = "YYYY-MM-DD";
        this.applyRule = () => {
            let { store } = this.props;
            let ruleLabel = lib["h" /* ValidationRuleMap */][this.ruleType];
            if (this.isEditing == true) {
                store.updateValidationRule(this.ruleType, this.properties);
                notification["a" /* default */].info({ message: `Field - ${store.selectedField.label || store.selectedField.name}`,
                    description: `Rule "${ruleLabel}" saved`, duration: 7 });
            }
            else {
                store.addValidationRule(this.ruleType, this.properties);
                notification["a" /* default */].info({ message: `Field - ${store.selectedField.label || store.selectedField.name}`,
                    description: `Rule ${ruleLabel} added`, duration: 7 });
            }
            this.cancel();
        };
        this.onEdit = (rule) => {
            let { store } = this.props;
            this.isEditing = true;
            this.ruleType = rule;
            this.properties = store.selectedField.validator.rule[rule];
        };
        this.initialize(props);
    }
    initialize(props) {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false;
        this.isAdding = false;
    }
    setRuleType(type) {
        this.ruleType = type;
    }
    setRuleProperty(name, value) {
        this.properties = Object.assign({}, this.properties, { [name]: value });
    }
    cancel() {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false;
        this.isAdding = false;
    }
    get isRuleValid() {
        let { ruleType, properties } = this;
        if (!ruleType) {
            return false;
        }
        let isValid = false;
        switch (this.ruleType) {
            case "datetime": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "date": {
                isValid = properties['latest'] || properties['latest'];
                break;
            }
            case "equality": {
                isValid = !!properties['attribute'];
                break;
            }
            case "exclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "inclusion": {
                isValid = !!properties['within'];
                break;
            }
            case "format": {
                isValid = !!properties['pattern'];
                break;
            }
            case "length": {
                isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
                break;
            }
            case "numericality": {
                if (properties['is']) {
                    isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
                }
                else {
                    isValid = Object.keys(properties).length > 0;
                }
                break;
            }
            case "presence": {
                isValid = !!properties['message'];
                break;
            }
            case "url": {
                isValid = !!properties['url'];
                break;
            }
            default: {
                isValid = false;
            }
        }
        return isValid;
    }
    setIsAdding(isAdding) {
        this.isAdding = isAdding;
    }
    render() {
        let { store } = this.props;
        let { selectedField: field } = store;
        let fieldList = [];
        let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;
        Object.keys(Object(mobx_module["n" /* toJS */])(store.formStore.idFieldMap)).map((id) => {
            fieldList.push(store.formStore.idFieldMap[id]);
        });
        let availableRules = lib["i" /* ValidationRuleNames */].filter((rule) => {
            let rules = lib["g" /* ValidationAllowedRules */][field.inputType];
            return rules && rules.length > 0 && rules.indexOf(rule.key) > -1;
        });
        return external_React_["createElement"]("div", null,
            external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { padding: '0' }, actions: [external_React_["createElement"]("span", { style: { visibility: availableRules.length > 0 ? 'visible' : 'hidden' } },
                        external_React_["createElement"](es_button["a" /* default */], { size: "small", onClick: () => this.setIsAdding(true) }, "Add"))] },
                !hasValidation && external_React_["createElement"](empty["a" /* default */], { description: external_React_["createElement"]("span", null, availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field") }),
                !!hasValidation && external_React_["createElement"](ValidationListView_ValidationListView, { validation: field.validator.rule, onEdit: this.onEdit, onRemove: store.removeValidationRule })),
            (this.isAdding || this.isEditing) && external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' }, title: `${this.isEditing == true ? "Edit" : "Add"} Rule ${this.ruleType ? ' - ' + this.ruleType : ''}` },
                external_React_["createElement"](es_form["a" /* default */], Object.assign({ layout: "horizontal" }, FormLayoutCommon_formItemLayout),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Rule" },
                        external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => this.setRuleType(e), style: { width: 200 }, placeholder: "Select a rule to apply", value: this.ruleType }, availableRules.map((rule) => {
                            return external_React_["createElement"](es_select["a" /* default */].Option, { disabled: !!field.validator.rule[rule.value], key: rule.key, value: rule.value }, rule.label);
                        }))),
                    this.ruleType && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message", help: `Shown when '${this.ruleType}' validation fails` },
                        external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.message, onChange: (e) => this.setRuleProperty('message', e.target.value) })),
                    this.ruleType && this.ruleType.indexOf('date') > -1 && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Not before", help: "Entered date cannot be before this date", required: !this.properties['latest'] },
                            external_React_["createElement"](date_picker["a" /* default */], { value: this.properties.earliest ? external_moment_default()(this.properties.earliest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined);
                                } })),
                        this.properties.earliest && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Not Before", help: "Shown when 'Not Before' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { value: this.properties.tooEarly, type: "text", onChange: (e) => this.setRuleProperty('tooEarly', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Not after", help: "Entered date cannot be after this date", required: !this.properties['earliest'] },
                            external_React_["createElement"](date_picker["a" /* default */], { value: this.properties.latest ? external_moment_default()(this.properties.latest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined);
                                } })),
                        this.properties.latest && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Not After", help: "Shown when 'Not After' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { value: this.properties.tooLate, type: "text", onChange: (e) => this.setRuleProperty('tooLate', e.target.value) }))),
                    this.ruleType == 'equality' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Matches", help: "Value should match field", required: true },
                            external_React_["createElement"](es_select["a" /* default */], { value: this.properties.attribute, placeholder: "Select a field", onChange: (e) => { this.setRuleProperty('attribute', e); }, style: { width: 200 } }, fieldList.map((f) => {
                                return external_React_["createElement"](es_select["a" /* default */].Option, { key: f.id, value: f.id, disabled: f.id == field.id },
                                    f.name,
                                    " - (",
                                    f.type || f.inputType,
                                    ")");
                            })))),
                    this.ruleType == 'exclusion' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Not Within", help: "Value should not be one of (comma separated list)", required: true },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'inclusion' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Within", help: "Value must be one of (comma separated list)", required: true },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'format' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - RegEx", help: "Value must match regular expression", required: true },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.pattern, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/");
                                } })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Option - Flags", help: "Regular expression flags - i|g|m", required: true },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.flags, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i");
                                } }))),
                    this.ruleType == 'length' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Exactly", help: "Value length must be exactly" },
                            external_React_["createElement"](input_number["a" /* default */], { type: "text", value: this.properties.is, onChange: (e) => {
                                    if (e != null) {
                                        this.setRuleProperty('maximum', null);
                                        this.setRuleProperty('minimum', null);
                                        this.setRuleProperty('is', e);
                                    }
                                } })),
                        this.properties['is'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Exactly", help: "Shown when 'Exactly' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.wrongLength, onChange: (e) => this.setRuleProperty('wrongLength', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Minimum", help: "Value length must be at least" },
                            external_React_["createElement"](input_number["a" /* default */], { type: "text", value: this.properties.minimum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1);
                                } })),
                        this.properties['minimum'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Minimum", help: "Shown when 'Minimum' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.tooShort, onChange: (e) => this.setRuleProperty('tooShort', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Maximum", help: "Value length must be at most" },
                            external_React_["createElement"](input_number["a" /* default */], { type: "text", value: this.properties.maximum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null);
                                } })),
                        this.properties['maximum'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Maximum", help: "Shown when 'Maximum' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.tooLong, onChange: (e) => this.setRuleProperty('tooLong', e.target.value) }))),
                    this.ruleType == 'numericality' && external_React_["createElement"]("div", null,
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Integer", help: "Value must be an integer" },
                            external_React_["createElement"](es_checkbox["a" /* default */], { checked: this.properties.integerOnly, onChange: (e) => { this.setRuleProperty('integerOnly', e.target.value); } })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Greater Than", help: "Value must be greater than" },
                            external_React_["createElement"](input_number["a" /* default */], { value: this.properties.greaterThan, onChange: (e) => { this.setRuleProperty("greaterThan", e); } })),
                        this.properties['greaterThan'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Greater than", help: "Shown when 'Greater Than' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notGreaterThan, onChange: (e) => this.setRuleProperty('notGreaterThan', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Greater Than Equal To", help: "Value must be greater than or equal to" },
                            external_React_["createElement"](input_number["a" /* default */], { value: this.properties.greaterThanOrEqualTo, onChange: (e) => { this.setRuleProperty("greaterThanOrEqualTo", e); } })),
                        this.properties['greaterThanOrEqualTo'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Greater than or equal to", help: "Shown when 'Exactly' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notGreaterThanOrEqualTo, onChange: (e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Equal To", help: "Value must be exactly" },
                            external_React_["createElement"](input_number["a" /* default */], { value: this.properties.equalTo, disabled: this.properties.greaterThanOrEqualTo || this.properties.lesserThanOrEqualTo || this.properties.greaterThan || this.properties.lesserThanThan, onChange: (e) => { this.setRuleProperty("equalTo", e); } })),
                        this.properties['equalTo'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Equal to", help: "Shown when 'Equal to' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notEqualTo, onChange: (e) => this.setRuleProperty('notEqualTo', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Less Than", help: "Value must be less than" },
                            external_React_["createElement"](input_number["a" /* default */], { disabled: this.properties.equalTo, value: this.properties.lessThan, onChange: (e) => { this.setRuleProperty("lessThan", e); } })),
                        this.properties['lessThan'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Less than", help: "Shown when 'Less than' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notLessThan, onChange: (e) => this.setRuleProperty('notLessThan', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Less Than Equal To", help: "Value must be less than or equal to" },
                            external_React_["createElement"](input_number["a" /* default */], { disabled: this.properties.equalTo, value: this.properties.lessThanOrEqualTo, onChange: (e) => { this.setRuleProperty("lessThanOrEqualTo", e); } })),
                        this.properties['lessThanOrEqualTo'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Less than or equal to", help: "Shown when 'Less than or equal to' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notLessThanOrEqualTo, onChange: (e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Divisible By", help: "Value must be divisible by" },
                            external_React_["createElement"](input_number["a" /* default */], { min: 2, value: this.properties.divisibleBy, disabled: this.properties.equalTo, onChange: (e) => { this.setRuleProperty("divisibleBy", e); } })),
                        this.properties['divisibleBy'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Not Divisible By", help: "Shown when 'Not Divisible By' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", onChange: (e) => this.setRuleProperty('notDivisibleBy', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Odd", help: "Value must be odd" },
                            external_React_["createElement"](es_checkbox["a" /* default */], { checked: this.properties.odd, onChange: (e) => { this.setRuleProperty('odd', e.target.value); } })),
                        this.properties['odd'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Not Odd", help: "Shown when 'Not Odd' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notOdd, onChange: (e) => this.setRuleProperty('notOdd', e.target.value) })),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Constraint - Even", help: "Value must be even" },
                            external_React_["createElement"](es_checkbox["a" /* default */], { checked: this.properties.even, onChange: (e) => { this.setRuleProperty('even', e.target.value); } })),
                        this.properties['even'] && external_React_["createElement"](es_form["a" /* default */].Item, { label: "Message - Not Even", help: "Shown when 'Not Even' validation fails (optional)" },
                            external_React_["createElement"](input["a" /* default */], { type: "text", value: this.properties.notEven, onChange: (e) => this.setRuleProperty('notEven', e.target.value) }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout, { style: { marginTop: '15px' } }),
                        external_React_["createElement"](es_button["a" /* default */], { style: { marginRight: '10px' }, type: "primary", htmlType: "submit", size: "small", disabled: !this.isRuleValid, onClick: this.applyRule }, this.isEditing == true ? "Apply" : "Add"),
                        external_React_["createElement"](es_button["a" /* default */], { size: "small", type: "danger", onClick: () => this.cancel() }, "Cancel")))));
    }
};
ValidationView_decorate([
    mobx_module["j" /* observable */]
], ValidationView_ValidationView.prototype, "ruleType", void 0);
ValidationView_decorate([
    mobx_module["j" /* observable */]
], ValidationView_ValidationView.prototype, "properties", void 0);
ValidationView_decorate([
    mobx_module["j" /* observable */]
], ValidationView_ValidationView.prototype, "isEditing", void 0);
ValidationView_decorate([
    mobx_module["j" /* observable */]
], ValidationView_ValidationView.prototype, "isAdding", void 0);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "initialize", null);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "setRuleType", null);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "setRuleProperty", null);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "cancel", null);
ValidationView_decorate([
    mobx_module["c" /* computed */]
], ValidationView_ValidationView.prototype, "isRuleValid", null);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "applyRule", void 0);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "onEdit", void 0);
ValidationView_decorate([
    mobx_module["b" /* action */]
], ValidationView_ValidationView.prototype, "setIsAdding", null);
ValidationView_ValidationView = ValidationView_decorate([
    mobx_react_module["a" /* observer */]
], ValidationView_ValidationView);


// CONCATENATED MODULE: ./src/components/editors/field/FieldEditorView.tsx
var FieldEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















let FieldEditorView_FieldEditorView = class FieldEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    updateOptions(options) {
        this.props.store.selectedField.componentProps["options"] = options;
    }
    onOk() {
        this.props.store.setEditable(null);
    }
    onCancel() {
    }
    render() {
        let { store } = this.props;
        let { selectedField: field } = store;
        return field && external_React_["createElement"](drawer["a" /* default */], { title: `Field ${field.name} (id=${field.id || ''} class=${field.className})`, width: 700, onClose: () => store.setEditable(null), visible: store.showFieldEditor, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, external_React_["createElement"](tabs["a" /* default */], { size: "small" },
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Properties", key: "1" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](partials_PropertiesView, { store: this.props.store })))),
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Validation", key: "2" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](ValidationView_ValidationView, { store: this.props.store })))),
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Condition", key: "3" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](ConditionsView, { store: this.props.store })))),
            ['select', 'radiogroup', 'checkboxgroup'].indexOf(field.inputType) > -1 && external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Options", key: "4" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](partials_ChoiceOptionEditorView, { type: "select", items: field.componentProps['options'], onChange: this.updateOptions }))))));
    }
};
FieldEditorView_decorate([
    mobx_module["b" /* action */].bound
], FieldEditorView_FieldEditorView.prototype, "updateOptions", null);
FieldEditorView_decorate([
    mobx_module["b" /* action */]
], FieldEditorView_FieldEditorView.prototype, "onOk", null);
FieldEditorView_decorate([
    mobx_module["b" /* action */]
], FieldEditorView_FieldEditorView.prototype, "onCancel", null);
FieldEditorView_FieldEditorView = FieldEditorView_decorate([
    mobx_react_module["a" /* observer */]
], FieldEditorView_FieldEditorView);


// CONCATENATED MODULE: ./src/components/editors/form/partials/FormContentSettingsView.tsx
var FormContentSettingsView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











let FormContentSettingsView_FormContentEditorView = class FormContentEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification["a" /* default */].info({ message: `Form - ${form.name}`,
                        description: "Form properties applied successfully" });
                    form.layout = values.layout;
                    form.formLayoutOptions = values.formLayoutOptions;
                }
            });
            return;
        };
        this.onChange = (key, value) => {
            Object(mobx_module["l" /* set */])(this, key, value);
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { store } = this.props;
        if (!store.formStore.form) {
            return external_React_["createElement"](external_React_["Fragment"], null);
        }
        let form = Object(mobx_module["n" /* toJS */])(store.formStore.form);
        let { formLayoutOptions } = form;
        return external_React_["createElement"](Form_default.a, Object.assign({}, FormLayoutCommon_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            external_React_["createElement"](Form_default.a.Item, { label: "Validation disables paging", help: "Allow page navigation when validation failures exist on current page" }, getFieldDecorator('formLayoutOptions.validationDisablesPaging', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.validationDisablesPaging,
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Show Page Number", help: "Show current/total pages in the form header" }, getFieldDecorator('formLayoutOptions.showSteps', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSteps,
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Show Page Title", help: "Show the title of each page" }, getFieldDecorator('formLayoutOptions.showPageTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showPageTitles,
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Show Section Title", help: "Show section title above section content" }, getFieldDecorator('formLayoutOptions.showSectionTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionTitles,
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Show Section Border", help: "Show borders around a section block" }, getFieldDecorator('formLayoutOptions.showSectionBorders', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionBorders,
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout),
                external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
FormContentSettingsView_decorate([
    mobx_module["j" /* observable */]
], FormContentSettingsView_FormContentEditorView.prototype, "selectedFormLayout", void 0);
FormContentSettingsView_decorate([
    mobx_module["b" /* action */].bound
], FormContentSettingsView_FormContentEditorView.prototype, "handleSubmit", void 0);
FormContentSettingsView_decorate([
    mobx_module["b" /* action */].bound
], FormContentSettingsView_FormContentEditorView.prototype, "onChange", void 0);
FormContentSettingsView_FormContentEditorView = FormContentSettingsView_decorate([
    mobx_react_module["a" /* observer */]
], FormContentSettingsView_FormContentEditorView);
const WrappedFormContentEditorView = Form_default.a.create({ name: 'FormContentEditorView' })(FormContentSettingsView_FormContentEditorView);
/* harmony default export */ var FormContentSettingsView = (WrappedFormContentEditorView);

// EXTERNAL MODULE: ./node_modules/antd/es/divider/index.js
var divider = __webpack_require__(110);

// EXTERNAL MODULE: ./node_modules/antd/es/modal/index.js + 7 modules
var modal = __webpack_require__(276);

// EXTERNAL MODULE: ./node_modules/antd/es/modal/style/css.js
var modal_style_css = __webpack_require__(501);

// EXTERNAL MODULE: ./node_modules/antd/es/slider/index.js + 8 modules
var slider = __webpack_require__(70);

// EXTERNAL MODULE: ./node_modules/antd/es/slider/style/css.js
var slider_style_css = __webpack_require__(187);

// CONCATENATED MODULE: ./src/components/editors/form/partials/ItemLayoutPreview.tsx
var ItemLayoutPreview_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







let ItemLayoutPreview_ItemLayoutPreview = class ItemLayoutPreview extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    get shouldRender() {
        let { formLayout, itemLayoutOptions, dimension } = this.props;
        return formLayout && itemLayoutOptions && dimension && itemLayoutOptions.wrapperCol[dimension];
    }
    render() {
        let { shouldRender } = this;
        let { formLayout, dimension } = this.props;
        let { wrapperCol, labelCol } = this.props.itemLayoutOptions;
        let wrapperSpan = wrapperCol[dimension].span;
        let wrapperOffset = wrapperCol[dimension].offset || 0;
        let labelSpan = labelCol[dimension].span;
        let labelOffset = labelCol[dimension].offset || 0;
        return external_React_["createElement"]("div", { style: { background: '#ffff' } },
            shouldRender && formLayout == 'horizontal' && external_React_["createElement"](es_row["a" /* default */], { className: "fl-layout-demo-row" },
                external_React_["createElement"](es_col["a" /* default */], { span: labelOffset }, '\u00A0'),
                external_React_["createElement"](es_col["a" /* default */], { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                    external_React_["createElement"]("strong", { style: { color: 'white' } },
                        "Label - ",
                        (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                        "%")),
                external_React_["createElement"](es_col["a" /* default */], { span: wrapperOffset }, '\u00A0'),
                external_React_["createElement"](es_col["a" /* default */], { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                    external_React_["createElement"]("strong", { style: { color: 'white' } },
                        "Field - ",
                        (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                        "%"))),
            shouldRender && formLayout == 'vertical' && external_React_["createElement"]("div", null,
                external_React_["createElement"](es_row["a" /* default */], { className: "fl-layout-demo-row" },
                    external_React_["createElement"](es_col["a" /* default */], { span: labelOffset }, '\u00A0'),
                    external_React_["createElement"](es_col["a" /* default */], { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                        external_React_["createElement"]("strong", { style: { color: 'white' } },
                            "Label - ",
                            (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                            "%"))),
                external_React_["createElement"](es_row["a" /* default */], { className: "fl-layout-demo-row", style: { marginTop: '15px' } },
                    external_React_["createElement"](es_col["a" /* default */], { span: wrapperOffset }, '\u00A0'),
                    external_React_["createElement"](es_col["a" /* default */], { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                        external_React_["createElement"]("strong", { style: { color: 'white' } },
                            "Field - ",
                            (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                            "%")))));
    }
};
ItemLayoutPreview_decorate([
    mobx_module["c" /* computed */]
], ItemLayoutPreview_ItemLayoutPreview.prototype, "shouldRender", null);
ItemLayoutPreview_ItemLayoutPreview = ItemLayoutPreview_decorate([
    mobx_react_module["a" /* observer */]
], ItemLayoutPreview_ItemLayoutPreview);

//

// CONCATENATED MODULE: ./src/components/editors/form/partials/ItemLayoutView.tsx
var ItemLayoutView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















const dimensionNameMap = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
};
const ItemLayoutView_formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const ItemLayoutView_tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 8,
            offset: 16,
        },
        sm: {
            span: 8,
            offset: 16,
        },
    },
};
let defaultDimensions = {
    'vertical': { offset: 0, span: 12 },
    'horizontal': { offset: 0, span: 10 }
};
let ItemLayoutView_ItemLayoutView = class ItemLayoutView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.setDimension = (dimension) => {
            this.selectedDimension = dimension;
        };
        this.setLayoutProperty = (key, value) => {
            let target;
            let { selectedDimension } = this;
            if (key.indexOf('wrapper') > -1) {
                target = this.itemLayout.wrapperCol[selectedDimension];
            }
            else {
                target = this.itemLayout.labelCol[selectedDimension];
            }
            if (key.indexOf('Span') > -1) {
                target.span = value;
            }
            else {
                target.offset = value;
            }
            return;
        };
        this.setIsAdding = () => {
            let dimension = this.availableDimensions[0];
            // Initialize defaults for this dimension
            this.itemLayout.wrapperCol.add(dimension, { offset: 0, span: 12 });
            this.itemLayout.labelCol.add(dimension, { offset: 0, span: 12 });
            this.selectedDimension = dimension;
            // Now the layout editor form should render
            this.isAdding = true;
        };
        this.reset = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.itemLayout = new lib["e" /* ItemLayoutOptions */]({});
            this.selectedDimension = null;
        };
        this.setIsEditing = (record) => {
            this.selectedDimension = record.dimension;
            this.itemLayout.wrapperCol.add(record.dimension, this.props.itemLayoutOptions.wrapperCol[record.dimension]);
            this.itemLayout.labelCol.add(record.dimension, this.props.itemLayoutOptions.labelCol[record.dimension]);
            this.isEditing = true;
        };
        this.confirmRemove = (record) => {
            let self = this;
            modal["a" /* default */].confirm({
                title: `Are you sure ?`,
                content: `Clicking OK will remove field layout targeting "${dimensionNameMap[record.dimension]}"`,
                onOk() {
                    self.remove(record);
                },
                onCancel() { },
            });
        };
        this.remove = (record) => {
            let { itemLayoutOptions } = this.props;
            itemLayoutOptions.labelCol[record.dimension] = null;
            itemLayoutOptions.wrapperCol[record.dimension] = null;
            this.props.onSave(itemLayoutOptions);
        };
        this.save = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.props.onSave(this.itemLayout);
            this.reset();
        };
        this.initialize(props);
    }
    initialize({ itemLayoutOptions }) {
        this.itemLayout = new lib["e" /* ItemLayoutOptions */]({});
    }
    get asRows() {
        let { labelCol, wrapperCol } = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        wrapperCol.used.forEach((d) => {
            dMap[d] = {
                formLayout: this.props.formLayout,
                dimension: d,
                labelSpan: labelCol[d].span,
                labelOffset: labelCol[d].offset || 0,
                wrapperOffset: wrapperCol[d].offset || 0,
                wrapperSpan: wrapperCol[d].span,
            };
            rows.push(dMap[d]);
        });
        return rows;
    }
    get availableDimensions() {
        let { wrapperCol } = this.props.itemLayoutOptions;
        return wrapperCol.unused;
    }
    render() {
        let columns = [{
                title: 'Dimension',
                dataIndex: 'dimension',
                key: 'dimension'
            },
            { title: 'Label', children: [
                    {
                        title: 'Offset',
                        dataIndex: 'labelOffset',
                        key: 'labelOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'labelSpan',
                        key: 'labelSpan',
                    }
                ] },
            {
                title: 'Field',
                children: [
                    {
                        title: 'Offset',
                        dataIndex: 'wrapperOffset',
                        key: 'wrapperOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'wrapperSpan',
                        key: 'wrapperSpan',
                    }
                ]
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (external_React_["createElement"]("span", null,
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "default", onClick: (e) => { this.setIsEditing(record); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    external_React_["createElement"](es_button["a" /* default */], { shape: "circle", type: "danger", onClick: (e) => { this.confirmRemove(record); }, icon: "delete", size: "small" }))),
            }];
        let { getFieldDecorator } = this.props.form;
        let { isAdding, isEditing } = this;
        let { labelCol, wrapperCol } = this.itemLayout;
        return external_React_["createElement"](card["a" /* default */], { size: "small", bodyStyle: { padding: 0 } },
            external_React_["createElement"](table["a" /* default */], { title: () => external_React_["createElement"]("span", null,
                    "Field Layouts ",
                    external_React_["createElement"]("small", null, "click (+) to see preview")), size: "small", bordered: false, pagination: false, dataSource: this.asRows, columns: columns, defaultExpandAllRows: false, rowKey: 'dimension', expandedRowRender: (record) => external_React_["createElement"](ItemLayoutPreview_ItemLayoutPreview, { formLayout: this.props.formLayout, dimension: record.dimension, itemLayoutOptions: this.props.itemLayoutOptions }), footer: () => { return this.availableDimensions.length > 0 ? external_React_["createElement"](es_button["a" /* default */], { onClick: () => this.setIsAdding() }, "Add") : external_React_["createElement"](external_React_["Fragment"], null); } }),
            (isAdding || isEditing) && this.selectedDimension && external_React_["createElement"](card["a" /* default */], { size: "small", title: this.isAdding ? "Add Field Layout" : `Edit Field Layout - ${this.selectedDimension}`, style: { marginTop: '15px' } },
                external_React_["createElement"](ItemLayoutPreview_ItemLayoutPreview, { formLayout: this.props.formLayout, itemLayoutOptions: this.itemLayout, dimension: this.selectedDimension }),
                external_React_["createElement"]("p", null, "Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed"),
                external_React_["createElement"](es_form["a" /* default */], Object.assign({}, ItemLayoutView_formItemLayout, { layout: "horizontal" }),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Target Screen Width", help: external_React_["createElement"]("ul", null,
                            external_React_["createElement"]("li", null, "Extra Small (below 768px)"),
                            external_React_["createElement"]("li", null, "Small (768px - 992px)"),
                            external_React_["createElement"]("li", null, "Medium (992px - 1200px)"),
                            external_React_["createElement"]("li", null, "Large (1200px - 1440px)"),
                            external_React_["createElement"]("li", null, "Extra Large (1440px and above)")) }, getFieldDecorator('dimension', {
                        initialValue: this.selectedDimension,
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A dimension' }
                        ]
                    })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => { this.setDimension(e); } }, this.availableDimensions.map((d) => {
                        return external_React_["createElement"](es_select["a" /* default */].Option, { key: d }, dimensionNameMap[d]);
                    })))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Label Offset", help: "Left offset for label" }, getFieldDecorator('labelOffset', {
                        initialValue: labelCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(external_React_["createElement"](slider["a" /* default */], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelOffset', e); } }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Label Width", help: "Label available width" }, getFieldDecorator('labelSpan', {
                        initialValue: labelCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(external_React_["createElement"](slider["a" /* default */], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelSpan', e); } }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Field Offset", help: "Left offset for fields" }, getFieldDecorator('wrapperOffset', {
                        initialValue: wrapperCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(external_React_["createElement"](slider["a" /* default */], { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperOffset', e); } }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, { label: "Field width", help: "Field available width" }, getFieldDecorator('wrapperSpan', {
                        initialValue: wrapperCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(external_React_["createElement"](slider["a" /* default */], { step: 1, min: 1, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperSpan', e); } }))),
                    external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, ItemLayoutView_tailFormItemLayout),
                        external_React_["createElement"](es_button["a" /* default */], { size: "small", type: "primary", style: { marginRight: '15px' }, onClick: this.save }, "Save"),
                        external_React_["createElement"](es_button["a" /* default */], { size: "small", type: "danger", style: { marginTop: '15px' }, onClick: this.reset }, "Cancel")))));
    }
};
ItemLayoutView_decorate([
    mobx_module["j" /* observable */]
], ItemLayoutView_ItemLayoutView.prototype, "isAdding", void 0);
ItemLayoutView_decorate([
    mobx_module["j" /* observable */]
], ItemLayoutView_ItemLayoutView.prototype, "isEditing", void 0);
ItemLayoutView_decorate([
    mobx_module["j" /* observable */]
], ItemLayoutView_ItemLayoutView.prototype, "selectedDimension", void 0);
ItemLayoutView_decorate([
    mobx_module["j" /* observable */]
], ItemLayoutView_ItemLayoutView.prototype, "itemLayout", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "setDimension", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */].bound
], ItemLayoutView_ItemLayoutView.prototype, "setLayoutProperty", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "initialize", null);
ItemLayoutView_decorate([
    mobx_module["c" /* computed */]
], ItemLayoutView_ItemLayoutView.prototype, "asRows", null);
ItemLayoutView_decorate([
    mobx_module["c" /* computed */]
], ItemLayoutView_ItemLayoutView.prototype, "availableDimensions", null);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "setIsAdding", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "reset", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "setIsEditing", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "remove", void 0);
ItemLayoutView_decorate([
    mobx_module["b" /* action */]
], ItemLayoutView_ItemLayoutView.prototype, "save", void 0);
ItemLayoutView_ItemLayoutView = ItemLayoutView_decorate([
    mobx_react_module["a" /* observer */]
], ItemLayoutView_ItemLayoutView);

const WrappedIItemLayoutViewProps = es_form["a" /* default */].create({ name: 'ItemLayoutView' })(ItemLayoutView_ItemLayoutView);
/* harmony default export */ var partials_ItemLayoutView = (WrappedIItemLayoutViewProps);

// CONCATENATED MODULE: ./src/components/editors/form/partials/FormLayoutView.tsx
var FormLayoutView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















const FormLayoutView_formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const FormLayoutView_tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 2,
            offset: 22,
        },
        sm: {
            span: 2,
            offset: 22,
        },
    },
};
let FormLayoutView_FormLayoutView = class FormLayoutView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.formStore;
            console.log("Submitting");
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    form.layout = this.selectedFormLayout;
                    form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
                    notification["a" /* default */].info({ message: `Form - ${form.name}`,
                        description: `Form layout set to "${form.layout}" ` });
                }
            });
            return;
        };
        this.saveItemLayout = (layout) => {
            let { form } = this.props.store.formStore;
            lib["a" /* AllScreenWidths */].map((w) => {
                layout.labelCol[w] && form.itemLayoutOptions.labelCol.add(w, layout.labelCol[w]);
                layout.wrapperCol[w] && form.itemLayoutOptions.wrapperCol.add(w, layout.wrapperCol[w]);
            });
            form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
            notification["a" /* default */].info({ message: `Form - ${form.name}`,
                description: "Field layout updated successfully" });
        };
        this.initialize(props);
    }
    initialize(props) {
        let { form } = props.store.formStore;
        this.selectedFormLayout = form.layout;
        this.selectedLabelAlign = form.formLayoutOptions.labelAlign;
    }
    setProperty(key, e) {
        let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
        this[key] = value;
    }
    get hasFormLayoutChanged() {
        let { form } = this.props.store.formStore;
        return this.selectedFormLayout != form.layout || this.selectedLabelAlign != form.formLayoutOptions.labelAlign;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { form } = this.props.store.formStore;
        return external_React_["createElement"]("div", null,
            external_React_["createElement"](es_form["a" /* default */], Object.assign({}, FormLayoutView_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                external_React_["createElement"]("p", null, "Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),
                external_React_["createElement"](divider["a" /* default */], null),
                external_React_["createElement"](es_form["a" /* default */].Item, { label: "Form Layout", help: external_React_["createElement"]("ul", null,
                        external_React_["createElement"]("li", null, "Horizontal\uFF1ALabels placed next to controls."),
                        external_React_["createElement"]("li", null, "Vertical\uFF1ALabels placed above controls (default)."),
                        external_React_["createElement"]("li", null, "Inline\uFF1AAll controls render in one line.")) }, getFieldDecorator('selectedFormLayout', {
                    initialValue: this.selectedFormLayout,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A Layout is required' }
                    ]
                })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => { this.setProperty('selectedFormLayout', e); } },
                    external_React_["createElement"](es_select["a" /* default */].Option, { key: "horizontal" }, "Horizontal"),
                    external_React_["createElement"](es_select["a" /* default */].Option, { key: "vertical" }, "Vertical"),
                    external_React_["createElement"](es_select["a" /* default */].Option, { key: "inline" }, "Inline")))),
                external_React_["createElement"](es_form["a" /* default */].Item, { label: "Label Alignment", help: "Horizontal position of the labels" }, getFieldDecorator('selectedLabelAlign', {
                    initialValue: this.selectedLabelAlign,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'An alignment is required' }
                    ]
                })(external_React_["createElement"](es_select["a" /* default */], { onChange: (e) => { this.setProperty('selectedLabelAlign', e); } },
                    external_React_["createElement"](es_select["a" /* default */].Option, { key: "left" }, "Left"),
                    external_React_["createElement"](es_select["a" /* default */].Option, { key: "right" }, "Right")))),
                this.hasFormLayoutChanged && external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, FormLayoutView_tailFormItemLayout),
                    external_React_["createElement"](es_button["a" /* default */], { size: "small", type: "primary", htmlType: "submit" }, "Save"))),
            external_React_["createElement"](divider["a" /* default */], null),
            external_React_["createElement"](partials_ItemLayoutView, { onSave: this.saveItemLayout, formLayout: this.selectedFormLayout, itemLayoutOptions: form.itemLayoutOptions }));
    }
};
FormLayoutView_decorate([
    mobx_module["j" /* observable */]
], FormLayoutView_FormLayoutView.prototype, "selectedFormLayout", void 0);
FormLayoutView_decorate([
    mobx_module["j" /* observable */]
], FormLayoutView_FormLayoutView.prototype, "selectedLabelAlign", void 0);
FormLayoutView_decorate([
    mobx_module["b" /* action */]
], FormLayoutView_FormLayoutView.prototype, "initialize", null);
FormLayoutView_decorate([
    mobx_module["b" /* action */]
], FormLayoutView_FormLayoutView.prototype, "setProperty", null);
FormLayoutView_decorate([
    mobx_module["b" /* action */].bound
], FormLayoutView_FormLayoutView.prototype, "handleSubmit", void 0);
FormLayoutView_decorate([
    mobx_module["c" /* computed */]
], FormLayoutView_FormLayoutView.prototype, "hasFormLayoutChanged", null);
FormLayoutView_decorate([
    mobx_module["b" /* action */]
], FormLayoutView_FormLayoutView.prototype, "saveItemLayout", void 0);
FormLayoutView_FormLayoutView = FormLayoutView_decorate([
    mobx_react_module["a" /* observer */]
], FormLayoutView_FormLayoutView);

const WrappedIFormLayoutViewProps = es_form["a" /* default */].create({ name: 'FormLayoutView' })(FormLayoutView_FormLayoutView);
/* harmony default export */ var partials_FormLayoutView = (WrappedIFormLayoutViewProps);

// CONCATENATED MODULE: ./src/components/editors/form/partials/FormPropertiesEditorView.tsx
var FormPropertiesEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















const timezones = external_moment_["tz"].names().map((name) => {
    return { label: name, value: name };
});
class FormPropertiesEditorView_FormPropertiesEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification["a" /* default */].info({ message: `Form - ${form.name}`,
                        description: "Form properties applied successfully" });
                    form.desc = values.desc;
                    form.layout = values.layout;
                    form.content.title = values.content.title;
                    form.content.subtitle = values.content.subtitle;
                    form.status = Object.assign({}, form.status, values.status);
                }
            });
            return;
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { store } = this.props;
        let form = store.showFormEditor ? Object(mobx_module["n" /* toJS */])(store.formStore.form) : null;
        return external_React_["createElement"](Form_default.a, Object.assign({}, FormLayoutCommon_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            external_React_["createElement"](Form_default.a.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                initialValue: form.name,
                rules: [{ type: 'string' }]
            })(external_React_["createElement"](input["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { required: true, label: "Description" }, getFieldDecorator('desc', {
                initialValue: form.desc,
                rules: [{ type: 'string' }]
            })(external_React_["createElement"](input["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { required: true, label: "Title" }, getFieldDecorator('content.title', {
                initialValue: form.content.title,
                rules: [{ type: 'string' }]
            })(external_React_["createElement"](input["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Subtitle" }, getFieldDecorator('content.subtitle', {
                initialValue: form.content.subtitle,
                rules: [{ type: 'string' }]
            })(external_React_["createElement"](input["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Entry Timezone Offset", help: "UTC by default, used to mark entry times" }, getFieldDecorator('status.timezone', {
                initialValue: form.status.timezone || 'UTC',
                rules: [
                    { type: 'string' },
                    { required: true, message: 'A timezone offset is required' }
                ]
            })(external_React_["createElement"](es_select["a" /* default */], null, timezones.map((options, index) => {
                return external_React_["createElement"](es_select["a" /* default */].Option, { key: index, value: options.value }, options.label);
            })))),
            external_React_["createElement"](Form_default.a.Item, { label: "Paused", help: "Pause this form (will stop collection of entries immediately)" }, getFieldDecorator('status.paused', {
                initialValue: form.status.paused
            })(external_React_["createElement"](es_switch["a" /* default */], null))),
            external_React_["createElement"](Form_default.a.Item, { label: "Starts", help: "Schedule form activation" }, getFieldDecorator('status.starts', {
                initialValue: form.status.starts,
            })(external_React_["createElement"](date_picker["a" /* default */], { showTime: true }))),
            external_React_["createElement"](Form_default.a.Item, { label: "Ends", help: "Schedule form deactivation" }, getFieldDecorator('status.ends', {
                initialValue: form.status.ends,
            })(external_React_["createElement"](date_picker["a" /* default */], { showTime: true }))),
            external_React_["createElement"](Form_default.a.Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout),
                external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
}
FormPropertiesEditorView_decorate([
    mobx_module["b" /* action */].bound
], FormPropertiesEditorView_FormPropertiesEditorView.prototype, "handleSubmit", void 0);
const FormPropertiesEditorView_WrappedFormContentEditorView = Form_default.a.create({ name: 'FormContentEditorView' })(FormPropertiesEditorView_FormPropertiesEditorView);
/* harmony default export */ var partials_FormPropertiesEditorView = (FormPropertiesEditorView_WrappedFormContentEditorView);

// CONCATENATED MODULE: ./src/components/editors/form/FormEditorView.tsx
var FormEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














let FormEditorView_FormEditorView = class FormEditorView extends external_React_["Component"] {
    render() {
        let { store } = this.props;
        let form = store.showFormEditor ? Object(mobx_module["n" /* toJS */])(store.formStore.form) : null;
        return form && external_React_["createElement"](drawer["a" /* default */], { title: `Form "${form.name}" `, onClose: () => store.setFormEditorVisible(false), visible: store.showFormEditor == true, width: 700, style: { overflow: 'hidden' } }, external_React_["createElement"](tabs["a" /* default */], { size: "small" },
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Settings", key: "1" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](partials_FormPropertiesEditorView, { store: this.props.store })))),
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Content", key: "2" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](FormContentSettingsView, { store: this.props.store })))),
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Layout", key: "3" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](partials_FormLayoutView, { store: this.props.store }))))));
    }
};
FormEditorView_FormEditorView = FormEditorView_decorate([
    mobx_react_module["a" /* observer */]
], FormEditorView_FormEditorView);


// CONCATENATED MODULE: ./src/components/editors/page/PageEditorView.tsx
var PageEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















let PageEditorView_PageEditorView = class PageEditorView extends external_React_["Component"] {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedPage: page } = this.props.store;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification["a" /* default */].info({ message: `Page - ${page.name}`,
                        description: "Page properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        page[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    get hasErrors() {
        let errors = this.props.form.getFieldsError();
        let fieldsWithErrors = Object.keys(errors).filter((field) => {
            return !!errors[field];
        });
        return fieldsWithErrors.length > 0;
    }
    render() {
        let { store } = this.props;
        let { selectedPage: page } = store;
        let { getFieldDecorator } = this.props.form;
        return page && external_React_["createElement"](drawer["a" /* default */], { title: `Page "${page.name}" (id=${page.id || ''})`, onClose: () => store.setEditable(null), visible: store.showPageEditor, width: 600, closable: !this.hasErrors, maskClosable: !this.hasErrors, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, external_React_["createElement"](tabs["a" /* default */], null,
            external_React_["createElement"](tabs["a" /* default */].TabPane, { key: "1", tab: "Settings" },
                external_React_["createElement"](card["a" /* default */], { size: "small", bordered: false },
                    external_React_["createElement"](es_form["a" /* default */], Object.assign({}, FormLayoutCommon_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                        external_React_["createElement"](es_form["a" /* default */].Item, { required: true, label: "Name", help: "Choose a name that distinguishes this page from others" }, getFieldDecorator('name', {
                            initialValue: page.name,
                            rules: [{ type: 'string' }, { required: true, message: 'A name is required' }]
                        })(external_React_["createElement"](input["a" /* default */], null))),
                        external_React_["createElement"](es_form["a" /* default */].Item, { required: true, label: "Title", help: "The title of this page, displayed above the page's content" }, getFieldDecorator('title', {
                            initialValue: page.title,
                            rules: [{ type: 'string' }, { required: true, message: 'A title is required' }]
                        })(external_React_["createElement"](input["a" /* default */], null))),
                        external_React_["createElement"](es_form["a" /* default */].Item, { label: "Subtitle", help: "A subtitle for this page, displayed underneath the title" }, getFieldDecorator('subtitle', {
                            initialValue: page.subtitle,
                            rules: [{ type: 'string' }]
                        })(external_React_["createElement"](input["a" /* default */], null))),
                        external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, FormLayoutCommon_tailFormItemLayout),
                            external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply")))))));
    }
};
PageEditorView_decorate([
    mobx_module["b" /* action */].bound
], PageEditorView_PageEditorView.prototype, "handleSubmit", void 0);
PageEditorView_decorate([
    mobx_module["c" /* computed */]
], PageEditorView_PageEditorView.prototype, "hasErrors", null);
PageEditorView_PageEditorView = PageEditorView_decorate([
    mobx_react_module["a" /* observer */]
], PageEditorView_PageEditorView);
const WrappedPageEditorView = es_form["a" /* default */].create({ name: 'PageEditorView' })(PageEditorView_PageEditorView);
/* harmony default export */ var page_PageEditorView = (WrappedPageEditorView);

// CONCATENATED MODULE: ./src/components/editors/section/partials/SectionPropertiesEditorView.tsx
var SectionPropertiesEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















const SectionPropertiesEditorView_formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const SectionPropertiesEditorView_tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
let SectionPropertiesEditorView_SectionPropertiesEditorView = class SectionPropertiesEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = this.props.store;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification["a" /* default */].info({ message: `Section - ${section.name}`,
                        description: "Section properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        section[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    render() {
        let { store } = this.props;
        let { selectedSection: section } = store;
        let { getFieldDecorator } = this.props.form;
        console.log("SPEV.render", store.selectedSection);
        if (!section) {
            return external_React_["createElement"](external_React_["Fragment"], null);
        }
        return external_React_["createElement"](card["a" /* default */], { size: "small", bordered: false },
            external_React_["createElement"](es_form["a" /* default */], Object.assign({}, SectionPropertiesEditorView_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                external_React_["createElement"](es_form["a" /* default */].Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                    initialValue: section.name,
                    rules: [{ type: 'string' }]
                })(external_React_["createElement"](input["a" /* default */], null))),
                external_React_["createElement"](es_form["a" /* default */].Item, { required: true, label: "Title" }, getFieldDecorator('title', {
                    initialValue: section.title,
                    rules: [{ type: 'string' }]
                })(external_React_["createElement"](input["a" /* default */], null))),
                external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, SectionPropertiesEditorView_tailFormItemLayout),
                    external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
};
SectionPropertiesEditorView_decorate([
    mobx_module["j" /* observable */]
], SectionPropertiesEditorView_SectionPropertiesEditorView.prototype, "gutter", void 0);
SectionPropertiesEditorView_decorate([
    mobx_module["b" /* action */].bound
], SectionPropertiesEditorView_SectionPropertiesEditorView.prototype, "handleSubmit", void 0);
SectionPropertiesEditorView_SectionPropertiesEditorView = SectionPropertiesEditorView_decorate([
    mobx_react_module["a" /* observer */]
], SectionPropertiesEditorView_SectionPropertiesEditorView);
const WrappedSectionPropertiesEditorView = es_form["a" /* default */].create({ name: 'SectionPropertiesEditorView' })(SectionPropertiesEditorView_SectionPropertiesEditorView);
/* harmony default export */ var partials_SectionPropertiesEditorView = (WrappedSectionPropertiesEditorView);

// CONCATENATED MODULE: ./src/components/editors/section/partials/SectionLayoutPreview.tsx







class SectionLayoutPreview_SectionLayoutPreview extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let { gutter, colspans } = this.props;
        let colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];
        return external_React_["createElement"](card["a" /* default */], { title: "Preview", size: "small", bordered: false },
            external_React_["createElement"](es_row["a" /* default */], { className: "fl-layout-demo-row", gutter: gutter }, colspans.map((span, ci) => {
                return external_React_["createElement"](es_col["a" /* default */], { key: ci, span: span },
                    external_React_["createElement"]("div", { style: { minHeight: '50px', padding: '5px 10px', background: ci % 2 == 0 ? colors[0] : colors[1] } },
                        external_React_["createElement"]("strong", { style: { color: 'white' } },
                            ci + 1,
                            " - ",
                            (100 * (span) / 24).toFixed(2),
                            "%")));
            })));
    }
}

// CONCATENATED MODULE: ./src/components/editors/section/partials/SectionLayoutEditor.tsx
var SectionLayoutEditor_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















const SectionLayoutEditor_formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const SectionLayoutEditor_tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
class SectionLayoutEditor_SectionLayoutEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.updateSpan = (key, value) => {
            this.columnSpans.set(key, value);
        };
        this.updateGutter = (value) => {
            this.gutter = value;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = this.props.store;
            section.columns.map((column, index) => {
                let thisSpan = this.columnSpans.get(`col${index}`);
                if (column.span != thisSpan) {
                    console.log(`Setting column ${index} span to ${thisSpan}`);
                    column.span = thisSpan;
                }
            });
            if (section.gutter != this.gutter) {
                section.gutter = this.gutter;
            }
            notification["a" /* default */].info({ message: `Section - ${section.name}`,
                description: `Saved section layout successfully` });
            return;
        };
        this.initialize();
    }
    initialize() {
        let { section } = this.props;
        this.gutter = section.gutter;
        this.columnSpans = mobx_module["j" /* observable */].map({});
        section.columns.map((col, index) => {
            this.columnSpans.set(`col${index}`, col.span);
        });
    }
    get colspans() {
        let spans = [];
        this.columnSpans.forEach((value) => {
            spans.push(value);
        });
        return spans;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        return external_React_["createElement"](card["a" /* default */], { size: "small", title: "Section Layout" },
            external_React_["createElement"]("p", null, "Assign 24 units (aliquots) across columns in a section, use gutter to space columns"),
            external_React_["createElement"](es_form["a" /* default */], Object.assign({}, SectionLayoutEditor_formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                external_React_["createElement"](es_form["a" /* default */].Item, { label: "Gutter" }, getFieldDecorator('gutter', {
                    initialValue: this.gutter || 0,
                    rules: [{ type: 'number' }]
                })(external_React_["createElement"](slider["a" /* default */], { step: 8, max: 48, onChange: (e) => this.updateGutter(e) }))),
                this.props.section.columns.map((column, index) => {
                    return external_React_["createElement"](es_form["a" /* default */].Item, { label: `Column ${index + 1} span`, key: index }, getFieldDecorator(`columnSpans[col${index}]`, {
                        initialValue: column.span || 0,
                        rules: [{ type: 'number' }]
                    })(external_React_["createElement"](slider["a" /* default */], { step: 1, max: 24, onChange: (e) => this.updateSpan(`col${index}`, e) })));
                }),
                external_React_["createElement"](SectionLayoutPreview_SectionLayoutPreview, { gutter: this.gutter, colspans: this.colspans }),
                external_React_["createElement"](es_form["a" /* default */].Item, Object.assign({}, SectionLayoutEditor_tailFormItemLayout),
                    external_React_["createElement"](es_button["a" /* default */], { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
}
SectionLayoutEditor_decorate([
    mobx_module["j" /* observable */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "gutter", void 0);
SectionLayoutEditor_decorate([
    mobx_module["j" /* observable */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "columnSpans", void 0);
SectionLayoutEditor_decorate([
    mobx_module["b" /* action */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "initialize", null);
SectionLayoutEditor_decorate([
    mobx_module["c" /* computed */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "colspans", null);
SectionLayoutEditor_decorate([
    mobx_module["b" /* action */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "updateSpan", void 0);
SectionLayoutEditor_decorate([
    mobx_module["b" /* action */]
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "updateGutter", void 0);
SectionLayoutEditor_decorate([
    mobx_module["b" /* action */].bound
], SectionLayoutEditor_SectionLayoutEditorView.prototype, "handleSubmit", void 0);
const WrappedSectionLayoutEditorView = es_form["a" /* default */].create({ name: 'SectionLayoutEditorView' })(SectionLayoutEditor_SectionLayoutEditorView);
/* harmony default export */ var SectionLayoutEditor = (WrappedSectionLayoutEditorView);

// CONCATENATED MODULE: ./src/components/editors/section/SectionEditorView.tsx
var SectionEditorView_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












let SectionEditorView_SectionEditorView = class SectionEditorView extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let { store } = this.props;
        let section = store.showSectionEditor ? store.selectedSection : null;
        return section && external_React_["createElement"](drawer["a" /* default */], { title: `Section "${section.name}" `, onClose: () => store.setEditable(null), visible: store.showSectionEditor == true, width: 700, style: { overflow: 'hidden' } }, external_React_["createElement"](tabs["a" /* default */], { size: "small" },
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Settings", key: "1" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](partials_SectionPropertiesEditorView, { store: this.props.store })))),
            external_React_["createElement"](tabs["a" /* default */].TabPane, { tab: "Layout", key: "2" },
                external_React_["createElement"](es_row["a" /* default */], null,
                    external_React_["createElement"](es_col["a" /* default */], { span: 24 },
                        external_React_["createElement"](SectionLayoutEditor, { store: this.props.store, section: section }))))));
    }
};
SectionEditorView_SectionEditorView = SectionEditorView_decorate([
    mobx_react_module["a" /* observer */]
], SectionEditorView_SectionEditorView);


// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(114);

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
                this.asDraggableCard("NewTextField", "Field", "HTML", "Field", "htmlfragment", "code"),
                this.asDraggableCard("NewTextField", "Field", "Slider", "Field", "slider", "control"),
                this.asDraggableCard("NewTextField", "Field", "Rating", "Field", "starrating", "star"),
                this.asDraggableCard("NewTextField", "Field", "Switch", "Field", "switch", "poweroff"),
                this.asDraggableCard("NewTextField", "Field", "Upload", "Field", "transfer", "file-zip")));
    }
}

// EXTERNAL MODULE: ./node_modules/antd/es/badge/index.js + 1 modules
var badge = __webpack_require__(61);

// EXTERNAL MODULE: ./node_modules/antd/es/badge/style/css.js
var badge_style_css = __webpack_require__(121);

// CONCATENATED MODULE: ./src/components/canvas/partials/dnd.common.ts

const ItemList = styled_components_browser_esm["a" /* default */].div `
    min-height: 50px;
`;
const dnd_common_Container = styled_components_browser_esm["a" /* default */].div `
    cursor: 'grab'
`;
const getBadgeStyle = (type) => {
    switch (type) {
        case "Form": return "cyan";
        case "Page": return "magenta";
        case "Section": return "geekblue";
        case "Column": return "gold";
        case "Field": return "green";
    }
};
const dnd_common_getItemStyle = (isDragging, draggableStyle) => (Object.assign({ userSelect: 'none', marginLeft: '12px', marginTop: '8px' }, draggableStyle));

// CONCATENATED MODULE: ./src/components/canvas/partials/FieldItem.tsx
var FieldItem_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








let FieldItem_FieldItem = class FieldItem extends external_React_["Component"] {
    render() {
        let fld = this.props.fld;
        let label = fld.label; // Otherwise Tree wont update
        let { store } = this.props;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Field", draggableId: fld.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](dnd_common_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: dnd_common_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](es_button["a" /* default */], { type: "dashed", shape: "circle", onClick: () => store.setEditable(fld), size: "small", icon: "edit", className: "fl-tree-button" }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Field"), text: `Field - ${label}` })),
            provided.placeholder)));
    }
};
FieldItem_FieldItem = FieldItem_decorate([
    mobx_react_module["a" /* observer */]
], FieldItem_FieldItem);


// CONCATENATED MODULE: ./src/components/canvas/partials/ColumnItem.tsx
var ColumnItem_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let ColumnItem_ColumnItem = class ColumnItem extends external_React_["Component"] {
    render() {
        let col = this.props.col;
        let { store } = this.props;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Column", draggableId: col.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](dnd_common_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: dnd_common_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](es_button["a" /* default */], { type: "dashed", shape: "circle", onClick: () => store.setEditable(col), size: "small", icon: "edit", className: "fl-tree-button" }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Column"), text: `Column - ${col.name}` })),
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${col.uuid}|fields`, type: "Field" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    col.fields.map((f, index) => {
                        return external_React_["createElement"](FieldItem_FieldItem, { store: this.props.store, key: f.uuid, fld: f, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
ColumnItem_ColumnItem = ColumnItem_decorate([
    mobx_react_module["a" /* observer */]
], ColumnItem_ColumnItem);


// CONCATENATED MODULE: ./src/components/canvas/partials/SectionItem.tsx
var SectionItem_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let SectionItem_SectionItem = class SectionItem extends external_React_["Component"] {
    render() {
        let sec = this.props.sec;
        let { store } = this.props;
        return external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Section", draggableId: sec.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](dnd_common_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: dnd_common_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
            external_React_["createElement"](es_button["a" /* default */], { type: "dashed", shape: "circle", onClick: () => store.setEditable(sec), size: "small", icon: "edit", className: "fl-tree-button" }),
            external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Section"), text: `Section - ${sec.name}` })),
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${sec.uuid}|columns`, type: "Column" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    sec.columns.map((col, index) => {
                        return external_React_["createElement"](ColumnItem_ColumnItem, { store: this.props.store, key: col.uuid, col: col, index: index });
                    }),
                    provided.placeholder);
            }),
            provided.placeholder)));
    }
};
SectionItem_SectionItem = SectionItem_decorate([
    mobx_react_module["a" /* observer */]
], SectionItem_SectionItem);


// CONCATENATED MODULE: ./src/components/canvas/partials/PageItem.tsx
var PageItem_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









let PageItem_PageItem = class PageItem extends external_React_["Component"] {
    constructor(props) {
        super(props);
    }
    render() {
        let page = this.props.page;
        let { store } = this.props;
        // Unused but makes view re-render when title etc are changed
        let { title, subtitle, name } = page;
        return (external_React_["createElement"]("div", { style: { padding: '4px' } },
            external_React_["createElement"](react_beautiful_dnd_esm["b" /* Draggable */], { type: "Page", draggableId: page.uuid, index: this.props.index }, (provided, snapshot) => (external_React_["createElement"](dnd_common_Container, Object.assign({ ref: provided.innerRef }, provided.draggableProps, { style: dnd_common_getItemStyle(snapshot.isDragging, provided.draggableProps.style) }),
                external_React_["createElement"](es_button["a" /* default */], { type: "dashed", onClick: () => { store.setEditable(page); }, shape: "circle", size: "small", icon: "edit", className: "fl-tree-button" }),
                external_React_["createElement"](badge["a" /* default */], Object.assign({}, provided.dragHandleProps, { status: snapshot.isDragging ? 'processing' : "default", color: getBadgeStyle("Page"), text: `Page - ${page.title}` })),
                external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: `${page.uuid}|sections`, type: "Section" }, (provided, snapshot) => {
                    return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                        page.sections.map((sec, index) => {
                            return external_React_["createElement"](SectionItem_SectionItem, { store: this.props.store, key: sec.uuid, sec: sec, index: index });
                        }),
                        provided.placeholder);
                }),
                provided.placeholder)))));
    }
};
PageItem_PageItem = PageItem_decorate([
    mobx_react_module["a" /* observer */]
], PageItem_PageItem);


// CONCATENATED MODULE: ./src/components/canvas/ComponentTree.tsx
var ComponentTree_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













let ComponentTree_ComponentTree = class ComponentTree extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.nodeMap = {};
        this.props = props;
    }
    render() {
        let { formStore } = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;
        return external_React_["createElement"](card["a" /* default */], { title: "Layout", bordered: false, style: { height: '100%' }, bodyStyle: { height: '100%', padding: '10px', overflow: 'auto', paddingBottom: '48px' } },
            external_React_["createElement"](es_button["a" /* default */], { type: "dashed", onClick: () => { this.props.store.setFormEditorVisible(true); }, shape: "circle", size: "small", icon: "edit", style: { marginRight: '5px', userSelect: 'none' } }),
            external_React_["createElement"](badge["a" /* default */], { status: "default", color: getBadgeStyle("Form"), text: `Form - ${form.name}` }),
            external_React_["createElement"](react_beautiful_dnd_esm["c" /* Droppable */], { droppableId: "pages", type: "Page" }, (provided, snapshot) => {
                return external_React_["createElement"](ItemList, Object.assign({ isDraggingOver: snapshot.isDraggingOver, ref: provided.innerRef }, provided.droppableProps),
                    pages.map((page, index) => {
                        return external_React_["createElement"]("div", { key: page.uuid },
                            external_React_["createElement"](PageItem_PageItem, { store: this.props.store, key: page.uuid, page: page, index: index }),
                            external_React_["createElement"](divider["a" /* default */], { style: { margin: '12px 0' } }));
                    }),
                    provided.placeholder);
            }));
    }
};
ComponentTree_ComponentTree = ComponentTree_decorate([
    mobx_react_module["a" /* observer */]
], ComponentTree_ComponentTree);


// CONCATENATED MODULE: ./src/components/canvas/Canvas.tsx
var Canvas_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



















const { Content } = es_layout["a" /* default */];
const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
};
let Canvas_Canvas = class Canvas extends external_React_["Component"] {
    constructor(props) {
        super(props);
        this.handleNewItem = (result) => {
            const { destination, type } = result;
            const { form } = this.props.store.formStore;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = this.factory.makePages({
                    id: `${nextPageNum}`,
                    title: `Page ${nextPageNum}`,
                    name: `Page ${nextPageNum}`,
                    sections: []
                })[0];
                form.addPage(page, dIndex);
            }
            else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId];
                    let section = this.factory.makeSections({
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId];
                    let column = this.factory.makeColumns({
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    section.addColumn(column, dIndex);
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId];
                    let field = this.factory.makeFields({
                        id: `${id}`,
                        name: `Field_${id}`,
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
        this.factory = new lib["b" /* Factory */](this.props.store.formStore);
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
        return external_React_["createElement"](es_layout["a" /* default */], { className: "fl-full-height-nopad" },
            external_React_["createElement"](menu["b" /* default */], { mode: "horizontal", theme: "light", multiple: true, className: "fl-shadow-sides" },
                external_React_["createElement"](menu["b" /* default */].Item, { title: "Form Controls", onClick: this.toggleSider, key: "controls" },
                    external_React_["createElement"](es_icon["a" /* default */], { theme: this.state.siderCollapsed ? 'outlined' : 'filled', type: "control" }))),
            external_React_["createElement"](es_layout["a" /* default */].Content, null,
                external_React_["createElement"](react_beautiful_dnd_esm["a" /* DragDropContext */], { onDragEnd: this.onDragEnd },
                    external_React_["createElement"](es_layout["a" /* default */], { className: "fl-full-height-nopad" },
                        external_React_["createElement"](es_layout["a" /* default */].Sider, { trigger: null, collapsed: this.state.siderCollapsed, style: { zIndex: 11 }, collapsible: true, onCollapse: this.onSiderCollapse, theme: "light", collapsedWidth: 0 },
                            external_React_["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                external_React_["createElement"](ComponentMenu_ComponentMenu, null))),
                        external_React_["createElement"](Content, { style: { overflow: "hidden", padding: '0' } },
                            external_React_["createElement"](es_col["a" /* default */], { span: 8, style: { height: '100%' } },
                                external_React_["createElement"]("div", { className: "fl-full-height fl-grey-box fl-shadow-sides" },
                                    external_React_["createElement"](ComponentTree_ComponentTree, { store: this.props.store }))),
                            external_React_["createElement"](es_col["a" /* default */], { span: 16, style: { height: '100%' } },
                                external_React_["createElement"]("div", { className: "fl-grey-box fl-shadow-sides fl-full-height" },
                                    external_React_["createElement"](lib["d" /* FormView */], { store: formStore }))),
                            external_React_["createElement"](FieldEditorView_FieldEditorView, { store: this.props.store }),
                            external_React_["createElement"](FormEditorView_FormEditorView, { store: this.props.store }),
                            external_React_["createElement"](page_PageEditorView, { store: this.props.store }),
                            external_React_["createElement"](SectionEditorView_SectionEditorView, { store: this.props.store }))))));
    }
};
Canvas_decorate([
    mobx_module["c" /* computed */]
], Canvas_Canvas.prototype, "itemMap", null);
Canvas_Canvas = Canvas_decorate([
    mobx_react_module["a" /* observer */]
], Canvas_Canvas);


// CONCATENATED MODULE: ./src/store/EditorStore.ts
var EditorStore_decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


Object(mobx_module["d" /* configure */])({ enforceActions: "always" });
class EditorStore_EditorStore {
    constructor(data) {
        this.addCondition = (c) => {
            this.selectedField.setCondition(this.factory.makeCondition(c));
        };
        this.addPredicate = (p) => {
            if (!this.selectedField.condition) {
                let condition = this.factory.makeCondition({ predicates: [p] });
                this.selectedField.setCondition(condition);
                return;
            }
            this.selectedField.condition.addPredicates(...this.factory.makePredicates(p));
        };
        this.setCondition = (c) => {
            this.selectedField.setCondition(c);
        };
        this.addValidationRule = (key, rule) => {
            this.selectedField.validator.rule.addConstraint(key, rule);
        };
        this.updateValidationRule = (key, rule) => {
            this.selectedField.validator.rule.updateConstraint(key, rule);
        };
        this.removeValidationRule = (key) => {
            this.selectedField.validator.rule.removeConstraint(key);
        };
        this.setFieldProperty = (key, value) => {
            this.selectedField.componentProps[key] = value;
        };
        this.setComponentProperty = (key, value) => {
            this.selectedField.componentProps[key] = value;
        };
        this.setEditable = (item) => {
            this.reset();
            if (item) {
                switch (item._type) {
                    case "Page": {
                        this.selectedPage = item;
                        break;
                    }
                    case "Section": {
                        this.selectedSection = item;
                        break;
                    }
                    case "Column": {
                        this.selectedColumn = item;
                        break;
                    }
                    case "Field": {
                        this.selectedField = item;
                        break;
                    }
                }
            }
        };
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = new lib["c" /* FormStore */]();
        this.factory = new lib["b" /* Factory */](this.formStore);
        this.formData = this.factory.makeForm(data);
        this.setEditable(null);
        this.showFormEditor = false;
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
        lib["f" /* Predicate */].PredicateConditions.forEach((p) => {
            expressions.push({ value: p, name: p });
        });
        return expressions;
    }
    get availableOperators() {
        let operators = [];
        lib["f" /* Predicate */].PredicateOperators.forEach((o) => {
            operators.push({ value: o, name: o });
        });
        return operators;
    }
    get hasCondition() {
        return !!this.selectedField.condition;
    }
    get numPredicates() {
        return this.selectedField.condition ? this.selectedField.condition.predicates.length : 0;
    }
    removePredicate(uuid) {
        let { condition } = this.selectedField;
        let index = condition.predicates.findIndex((p) => {
            return p.uuid == uuid;
        });
        if (index > -1) {
            condition.predicates.splice(index, 1);
        }
        if (condition.predicates.length == 0) {
            this.selectedField.setCondition(null);
        }
    }
    reset() {
        this.selectedPage = null;
        this.selectedColumn = null;
        this.selectedSection = null;
        this.selectedField = null;
    }
    get showFieldEditor() { return !!this.selectedField; }
    get showPageEditor() { return !!this.selectedPage; }
    get showColumnEditor() { return !!this.selectedColumn; }
    get showSectionEditor() { return !!this.selectedSection; }
    setFormEditorVisible(visible = false) {
        this.reset();
        this.showFormEditor = visible;
    }
    get asJSONForm() {
        return Object(mobx_module["n" /* toJS */])(this.formStore.form, { exportMapsAsObjects: true });
    }
}
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "selectedField", void 0);
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "selectedPage", void 0);
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "selectedSection", void 0);
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "selectedColumn", void 0);
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "showFormEditor", void 0);
EditorStore_decorate([
    mobx_module["j" /* observable */]
], EditorStore_EditorStore.prototype, "formData", void 0);
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
], EditorStore_EditorStore.prototype, "reset", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "showFieldEditor", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "showPageEditor", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "showColumnEditor", null);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "showSectionEditor", null);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setFormEditorVisible", null);
EditorStore_decorate([
    mobx_module["b" /* action */]
], EditorStore_EditorStore.prototype, "setEditable", void 0);
EditorStore_decorate([
    mobx_module["c" /* computed */]
], EditorStore_EditorStore.prototype, "asJSONForm", null);

// CONCATENATED MODULE: ./src/index.tsx
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderForm", function() { return renderForm; });






function renderForm(selector, initialState) {
    let store = new EditorStore_EditorStore(initialState);
    Object(external_ReactDOM_["render"])(external_React_default.a.createElement(es_layout["a" /* default */], { style: { height: '100vh', overflow: 'hidden' } },
        external_React_default.a.createElement(Canvas_Canvas, { store: store })), document.querySelector(selector));
}
;


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

(function() { module.exports = window["ReactDOM"]; }());

/***/ })

/******/ });
//# sourceMappingURL=main.js.map