var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ValidationRuleNames, ValidationRuleMap } from "@kartikrao/lib-forms-core/lib/models/validation";
import { ValidationAllowedRules } from "@kartikrao/lib-forms-core/lib/models/validation";
import { notification, Button, Card, Checkbox, DatePicker, Empty, Form, Icon, Input, InputNumber, Select } from "antd";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import moment from 'moment';
import * as React from "react";
import { ValidationListView } from "./ValidationListView";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
let ValidationView = class ValidationView extends React.Component {
    constructor(props) {
        super(props);
        this.dateFormat = "YYYY-MM-DD";
        this.applyRule = () => {
            let { editorStore } = this.props.store;
            let ruleLabel = ValidationRuleMap[this.ruleType];
            if (this.isEditing == true) {
                editorStore.updateValidationRule(this.ruleType, this.properties);
                notification.info({ message: `Field - ${editorStore.field.label || editorStore.field.name}`,
                    description: `Rule "${ruleLabel}" saved`, duration: 7 });
            }
            else {
                editorStore.addValidationRule(this.ruleType, this.properties);
                notification.info({ message: `Field - ${editorStore.field.label || editorStore.field.name}`,
                    description: `Rule ${ruleLabel} added`, duration: 7 });
            }
            this.cancel();
        };
        this.onEdit = (rule) => {
            let { editorStore } = this.props.store;
            this.isEditing = true;
            this.ruleType = rule;
            this.properties = editorStore.field.validator.rule[rule];
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
        let { editorStore } = this.props.store;
        let { field } = editorStore;
        let fieldList = [];
        let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;
        Object.keys(toJS(editorStore.formStore.idFieldMap)).map((id) => {
            fieldList.push(editorStore.formStore.idFieldMap[id]);
        });
        let availableRules = ValidationRuleNames.filter((rule) => {
            let rules = ValidationAllowedRules[field.inputType];
            return rules && rules.length > 0 && rules.indexOf(rule.key) > -1;
        });
        return React.createElement("div", null,
            React.createElement(Card, { title: "Rules", size: "small", bodyStyle: { padding: '0' }, actions: [React.createElement("span", { style: { visibility: availableRules.length > 0 ? 'visible' : 'hidden' } },
                        React.createElement(Icon, { onClick: () => this.setIsAdding(true), type: "plus" }))] },
                !hasValidation && React.createElement(Empty, { description: React.createElement("span", null, availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field") }),
                !!hasValidation && React.createElement(ValidationListView, { validation: field.validator.rule, onEdit: this.onEdit, onRemove: editorStore.removeValidationRule })),
            (this.isAdding || this.isEditing) && React.createElement(Card, { size: "small", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' }, title: `${this.isEditing == true ? "Edit" : "Add"} Rule ${this.ruleType ? ' - ' + this.ruleType : ''}` },
                React.createElement(Form, Object.assign({ layout: "horizontal" }, formItemLayout),
                    React.createElement(Form.Item, { label: "Rule" },
                        React.createElement(Select, { onChange: (e) => this.setRuleType(e), style: { width: 200 }, placeholder: "Select a rule to apply", value: this.ruleType }, availableRules.map((rule) => {
                            return React.createElement(Select.Option, { disabled: !!field.validator.rule[rule.value], key: rule.key, value: rule.value }, rule.label);
                        }))),
                    this.ruleType && React.createElement(Form.Item, { label: "Message", help: `Shown when '${this.ruleType}' validation fails` },
                        React.createElement(Input, { type: "text", value: this.properties.message, onChange: (e) => this.setRuleProperty('message', e.target.value) })),
                    this.ruleType && this.ruleType.indexOf('date') > -1 && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not before", help: "Entered date cannot be before this date", required: !this.properties['latest'] },
                            React.createElement(DatePicker, { value: this.properties.earliest ? moment(this.properties.earliest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined);
                                } })),
                        this.properties.earliest && React.createElement(Form.Item, { label: "Message - Not Before", help: "Shown when 'Not Before' validation fails (optional)" },
                            React.createElement(Input, { value: this.properties.tooEarly, type: "text", onChange: (e) => this.setRuleProperty('tooEarly', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Not after", help: "Entered date cannot be after this date", required: !this.properties['earliest'] },
                            React.createElement(DatePicker, { value: this.properties.latest ? moment(this.properties.latest, this.dateFormat) : null, onChange: (e) => {
                                    e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined);
                                } })),
                        this.properties.latest && React.createElement(Form.Item, { label: "Message - Not After", help: "Shown when 'Not After' validation fails (optional)" },
                            React.createElement(Input, { value: this.properties.tooLate, type: "text", onChange: (e) => this.setRuleProperty('tooLate', e.target.value) }))),
                    this.ruleType == 'equality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Matches", help: "Value should match field", required: true },
                            React.createElement(Select, { value: this.properties.attribute, placeholder: "Select a field", onChange: (e) => { this.setRuleProperty('attribute', e); }, style: { width: 200 } }, fieldList.map((f) => {
                                return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: f.id == field.id },
                                    f.name,
                                    " - (",
                                    f.type || f.inputType,
                                    ")");
                            })))),
                    this.ruleType == 'exclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not Within", help: "Value should not be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'inclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Within", help: "Value must be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: this.properties.within, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null);
                                } }))),
                    this.ruleType == 'format' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - RegEx", help: "Value must match regular expression", required: true },
                            React.createElement(Input, { type: "text", value: this.properties.pattern, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/");
                                } })),
                        React.createElement(Form.Item, { label: "Option - Flags", help: "Regular expression flags - i|g|m", required: true },
                            React.createElement(Input, { type: "text", value: this.properties.flags, onChange: (e) => {
                                    e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i");
                                } }))),
                    this.ruleType == 'length' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Exactly", help: "Value length must be exactly" },
                            React.createElement(InputNumber, { type: "text", value: this.properties.is, onChange: (e) => {
                                    if (e != null) {
                                        this.setRuleProperty('maximum', null);
                                        this.setRuleProperty('minimum', null);
                                        this.setRuleProperty('is', e);
                                    }
                                } })),
                        this.properties['is'] && React.createElement(Form.Item, { label: "Message - Exactly", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.wrongLength, onChange: (e) => this.setRuleProperty('wrongLength', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Minimum", help: "Value length must be at least" },
                            React.createElement(InputNumber, { type: "text", value: this.properties.minimum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1);
                                } })),
                        this.properties['minimum'] && React.createElement(Form.Item, { label: "Message - Minimum", help: "Shown when 'Minimum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.tooShort, onChange: (e) => this.setRuleProperty('tooShort', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Maximum", help: "Value length must be at most" },
                            React.createElement(InputNumber, { type: "text", value: this.properties.maximum, disabled: !!this.properties['is'], onChange: (e) => {
                                    e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null);
                                } })),
                        this.properties['maximum'] && React.createElement(Form.Item, { label: "Message - Maximum", help: "Shown when 'Maximum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.tooLong, onChange: (e) => this.setRuleProperty('tooLong', e.target.value) }))),
                    this.ruleType == 'numericality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Integer", help: "Value must be an integer" },
                            React.createElement(Checkbox, { checked: this.properties.integerOnly, onChange: (e) => { this.setRuleProperty('integerOnly', e.target.value); } })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than", help: "Value must be greater than" },
                            React.createElement(InputNumber, { value: this.properties.greaterThan, onChange: (e) => { this.setRuleProperty("greaterThan", e); } })),
                        this.properties['greaterThan'] && React.createElement(Form.Item, { label: "Message - Greater than", help: "Shown when 'Greater Than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notGreaterThan, onChange: (e) => this.setRuleProperty('notGreaterThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than Equal To", help: "Value must be greater than or equal to" },
                            React.createElement(InputNumber, { value: this.properties.greaterThanOrEqualTo, onChange: (e) => { this.setRuleProperty("greaterThanOrEqualTo", e); } })),
                        this.properties['greaterThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Greater than or equal to", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notGreaterThanOrEqualTo, onChange: (e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Equal To", help: "Value must be exactly" },
                            React.createElement(InputNumber, { value: this.properties.equalTo, disabled: this.properties.greaterThanOrEqualTo || this.properties.lesserThanOrEqualTo || this.properties.greaterThan || this.properties.lesserThanThan, onChange: (e) => { this.setRuleProperty("equalTo", e); } })),
                        this.properties['equalTo'] && React.createElement(Form.Item, { label: "Message - Equal to", help: "Shown when 'Equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notEqualTo, onChange: (e) => this.setRuleProperty('notEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than", help: "Value must be less than" },
                            React.createElement(InputNumber, { disabled: this.properties.equalTo, value: this.properties.lessThan, onChange: (e) => { this.setRuleProperty("lessThan", e); } })),
                        this.properties['lessThan'] && React.createElement(Form.Item, { label: "Message - Less than", help: "Shown when 'Less than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notLessThan, onChange: (e) => this.setRuleProperty('notLessThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than Equal To", help: "Value must be less than or equal to" },
                            React.createElement(InputNumber, { disabled: this.properties.equalTo, value: this.properties.lessThanOrEqualTo, onChange: (e) => { this.setRuleProperty("lessThanOrEqualTo", e); } })),
                        this.properties['lessThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Less than or equal to", help: "Shown when 'Less than or equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notLessThanOrEqualTo, onChange: (e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Divisible By", help: "Value must be divisible by" },
                            React.createElement(InputNumber, { min: 2, value: this.properties.divisibleBy, disabled: this.properties.equalTo, onChange: (e) => { this.setRuleProperty("divisibleBy", e); } })),
                        this.properties['divisibleBy'] && React.createElement(Form.Item, { label: "Message - Not Divisible By", help: "Shown when 'Not Divisible By' validation fails (optional)" },
                            React.createElement(Input, { type: "text", onChange: (e) => this.setRuleProperty('notDivisibleBy', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Odd", help: "Value must be odd" },
                            React.createElement(Checkbox, { checked: this.properties.odd, onChange: (e) => { this.setRuleProperty('odd', e.target.value); } })),
                        this.properties['odd'] && React.createElement(Form.Item, { label: "Message - Not Odd", help: "Shown when 'Not Odd' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notOdd, onChange: (e) => this.setRuleProperty('notOdd', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Even", help: "Value must be even" },
                            React.createElement(Checkbox, { checked: this.properties.even, onChange: (e) => { this.setRuleProperty('even', e.target.value); } })),
                        this.properties['even'] && React.createElement(Form.Item, { label: "Message - Not Even", help: "Shown when 'Not Even' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: this.properties.notEven, onChange: (e) => this.setRuleProperty('notEven', e.target.value) }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout, { style: { marginTop: '15px' } }),
                        React.createElement(Button, { size: "small", style: { marginRight: '10px' }, type: "primary", htmlType: "submit", disabled: !this.isRuleValid, onClick: this.applyRule }, this.isEditing == true ? "Apply" : "Add"),
                        React.createElement(Button, { size: "small", type: "danger", onClick: () => this.cancel() }, "Cancel")))));
    }
};
__decorate([
    observable
], ValidationView.prototype, "ruleType", void 0);
__decorate([
    observable
], ValidationView.prototype, "properties", void 0);
__decorate([
    observable
], ValidationView.prototype, "isEditing", void 0);
__decorate([
    observable
], ValidationView.prototype, "isAdding", void 0);
__decorate([
    action
], ValidationView.prototype, "initialize", null);
__decorate([
    action
], ValidationView.prototype, "setRuleType", null);
__decorate([
    action
], ValidationView.prototype, "setRuleProperty", null);
__decorate([
    action
], ValidationView.prototype, "cancel", null);
__decorate([
    computed
], ValidationView.prototype, "isRuleValid", null);
__decorate([
    action
], ValidationView.prototype, "applyRule", void 0);
__decorate([
    action
], ValidationView.prototype, "onEdit", void 0);
__decorate([
    action
], ValidationView.prototype, "setIsAdding", null);
ValidationView = __decorate([
    observer
], ValidationView);
export { ValidationView };
