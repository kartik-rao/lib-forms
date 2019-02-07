"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
require("airbnb-browser-shims");
var antd_1 = require("antd");
var form_factory_1 = require("./factory/form.factory");
exports.FormFactory = form_factory_1.FormFactory;
var component_form_1 = require("./components/component.form");
exports.FormComponent = component_form_1.default;
var FormWrapper = /** @class */ (function (_super) {
    __extends(FormWrapper, _super);
    function FormWrapper(props) {
        var _this = _super.call(this, props) || this;
        _this.props = {};
        _this.state = {};
        _this.props = { form: form_factory_1.FormFactory.createForm(props.form) };
        return _this;
    }
    FormWrapper.prototype.render = function () {
        var _a = this.props, initialState = _a.initialState, rest = __rest(_a, ["initialState"]);
        var form = this.props.form;
        return (React.createElement(antd_1.Layout, { style: { height: "100vh" } },
            React.createElement(antd_1.Row, null,
                React.createElement("br", null)),
            React.createElement(antd_1.Row, { justify: "space-around" },
                React.createElement(antd_1.Col, { span: form.formLayoutOptions.wrapperSpan, offset: form.formLayoutOptions.wrapperOffset },
                    React.createElement(component_form_1.default, __assign({}, form))))));
    };
    return FormWrapper;
}(React.Component));
exports.FormWrapper = FormWrapper;
function render(props, target) {
    ReactDOM.render(new FormWrapper(props).render(), document.querySelector(target));
}
exports.render = render;
