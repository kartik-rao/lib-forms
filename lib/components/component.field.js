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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var antd_1 = require("antd");
var FieldComponent = /** @class */ (function (_super) {
    __extends(FieldComponent, _super);
    function FieldComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        return _this;
    }
    FieldComponent.prototype.render = function () {
        var _a = this.props, field = _a.field, onChange = _a.onChange, decorator = _a.decorator, itemLayout = _a.itemLayout;
        var type = field.type;
        return React.createElement(antd_1.Form.Item, __assign({ label: field.label }, itemLayout),
            (type == "input" || type == "hidden") && decorator(React.createElement(antd_1.Input, { onChange: onChange, type: field.inputType, placeholder: field.placeholder })),
            type == "checkbox" && decorator(React.createElement(antd_1.Checkbox, { onChange: onChange })),
            type == "number" && decorator(React.createElement(antd_1.InputNumber, { onChange: onChange })),
            type == "select" && decorator(React.createElement(antd_1.Select, { onChange: onChange }, field.children.map(function (option, on) {
                return React.createElement(antd_1.Select.Option, { key: on }, option.label);
            }))),
            type == "radiogroup" && decorator(React.createElement(antd_1.Radio.Group, { onChange: onChange }, field.children.map(function (option, on) {
                return React.createElement(antd_1.Radio, { key: on }, option.label);
            }))),
            type == "checkboxgroup" && decorator(React.createElement(antd_1.Checkbox.Group, { onChange: onChange, options: field.children })),
            type == "textarea" && decorator(React.createElement(antd_1.Input.TextArea, { onChange: onChange })),
            type == "datepicker" && decorator(React.createElement(antd_1.DatePicker, { onChange: onChange })),
            type == "monthpicker" && decorator(React.createElement(antd_1.DatePicker.MonthPicker, { onChange: onChange })),
            type == "rangepicker" && decorator(React.createElement(antd_1.DatePicker.RangePicker, { onChange: onChange })),
            type == "weekpicker" && decorator(React.createElement(antd_1.DatePicker.WeekPicker, { onChange: onChange })),
            type == 'rate' && decorator(React.createElement(antd_1.Rate, { onChange: onChange })),
            type == 'slider' && decorator(React.createElement(antd_1.Slider, { onChange: onChange })),
            type == "textblock" && React.createElement("p", null, field.value));
    };
    return FieldComponent;
}(React.Component));
exports.FieldComponent = FieldComponent;
