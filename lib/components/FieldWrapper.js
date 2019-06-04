var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import map from "lodash/map";
import React from "react";
import { DatePicker, Form, Input, TimePicker, Select } from "antd";
const FormItem = Form.Item;
const { Option } = Select;
const CreateAntField = Component => (_a) => {
    var { field, form, hasFeedback, label, selectOptions, submitCount, type } = _a, props = __rest(_a, ["field", "form", "hasFeedback", "label", "selectOptions", "submitCount", "type"]);
    const touched = form.touched[field.name];
    const submitted = submitCount > 0;
    const hasError = form.errors[field.name];
    const submittedError = hasError && submitted;
    const touchedError = hasError && touched;
    const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
    const onChange = (value) => form.setFieldValue(field.name, value);
    const onBlur = () => form.setFieldTouched(field.name, true);
    return (React.createElement("div", { className: "field-container" },
        React.createElement(FormItem, { label: label, hasFeedback: (hasFeedback && submitted) || (hasFeedback && touched) ? true : false, help: submittedError || touchedError ? hasError : false, validateStatus: submittedError || touchedError ? "error" : "success" },
            React.createElement(Component, Object.assign({}, field, props, { onBlur: onBlur, onChange: type ? onInputChange : onChange }), selectOptions && map(selectOptions, (name) => React.createElement(Option, { key: name }, name))))));
};
export const AntSelect = CreateAntField(Select);
export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntMonthPicker = CreateAntField(DatePicker.MonthPicker);
export const AntRangePicker = CreateAntField(DatePicker.RangePicker);
export const AntWeekPicker = CreateAntField(DatePicker.WeekPicker);
