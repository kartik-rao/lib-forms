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
import * as React from "react";
import { Form, Input, Select, Radio, DatePicker, InputNumber, Checkbox, Rate, Slider } from "antd";
var FieldComponent = /** @class */ (function (_super) {
    __extends(FieldComponent, _super);
    function FieldComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.props = props;
        _this.state = {
            hidden: !props.conditionals[_this.props.field.id].result
        };
        return _this;
    }
    FieldComponent.prototype.render = function () {
        var _a = this.props, field = _a.field, decorators = _a.decorators, formLayout = _a.formLayout, eventHooks = _a.eventHooks;
        var type = field.type;
        var decorator = decorators.getFieldDecorator;
        var onChange = eventHooks(field.id).onChange;
        return this.props.conditionals[this.props.field.id].result && React.createElement(Form.Item, __assign({ label: field.label }, formLayout),
            (type == "input" || type == "hidden") && decorator(field.id, field.fieldOptions)(React.createElement(Input, { onChange: onChange, type: field.inputType, placeholder: field.placeholder })),
            type == "checkbox" && decorator(field.id, field.fieldOptions)(React.createElement(Checkbox, { onChange: onChange })),
            type == "number" && decorator(field.id, field.fieldOptions)(React.createElement(InputNumber, { onChange: onChange })),
            type == "select" && decorator(field.id, field.fieldOptions)(React.createElement(Select, { onChange: onChange }, field.children.map(function (child, index) {
                return React.createElement(Select.Option, { key: "" + index, value: child.value }, child.label);
            }))),
            type == "radiogroup" && decorator(field.id, field.fieldOptions)(React.createElement(Radio.Group, { onChange: onChange, options: field.children })),
            type == "checkboxgroup" && decorator(field.id, field.fieldOptions)(React.createElement(Checkbox.Group, { onChange: onChange, options: field.children })),
            type == "textarea" && decorator(field.id, field.fieldOptions)(React.createElement(Input.TextArea, { onChange: onChange })),
            type == "datepicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker, { onChange: onChange })),
            type == "monthpicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.MonthPicker, { onChange: onChange })),
            type == "rangepicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.RangePicker, { onChange: onChange })),
            type == "weekpicker" && decorator(field.id, field.fieldOptions)(React.createElement(DatePicker.WeekPicker, { onChange: onChange })),
            type == 'rate' && decorator(field.id, field.fieldOptions)(React.createElement(Rate, { onChange: onChange })),
            type == 'slider' && decorator(field.id, field.fieldOptions)(React.createElement(Slider, { onChange: onChange })),
            type == "textblock" && React.createElement("p", null, field.value));
    };
    return FieldComponent;
}(React.Component));
export { FieldComponent };
