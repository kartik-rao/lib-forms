import { ValidationAllowedRules, ValidationRuleMap, ValidationRuleNames } from "@kartikrao/lib-forms-core";
import { Button, Card, Checkbox, DatePicker, Empty, Form, Input, InputNumber, notification, Select } from "antd";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import moment from 'moment';
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
import { ValidationListView } from "./ValidationListView";
const ValidationView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        dateFormat: "YYYY-MM-DD",
        ruleType: null,
        properties: null,
        isEditing: false,
        isAdding: false,
        setRuleType: function (type) {
            this.ruleType = type;
        },
        setRuleProperty: function (name, value) {
            this.properties = Object.assign({}, this.properties, { [name]: value });
        },
        cancel: function () {
            this.ruleType = null;
            this.properties = {};
            this.isEditing = false;
            this.isAdding = false;
        },
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
        },
        applyRule: function () {
            let ruleLabel = ValidationRuleMap[this.ruleType];
            if (this.isEditing == true) {
                store.updateValidationRule(this.ruleType, this.properties);
                notification.info({ message: `Field - ${store.selectedField.label || store.selectedField.name}`,
                    description: `Rule "${ruleLabel}" saved`, duration: 7 });
            }
            else {
                store.addValidationRule(this.ruleType, this.properties);
                notification.info({ message: `Field - ${store.selectedField.label || store.selectedField.name}`,
                    description: `Rule ${ruleLabel} added`, duration: 7 });
            }
            this.cancel();
        },
        onEdit: function (rule) {
            this.isEditing = true;
            this.ruleType = rule;
            this.properties = store.selectedField.validator.rule[rule];
        },
        setIsAdding: function (isAdding) {
            this.isAdding = isAdding;
        }
    }));
    return useObserver(() => {
        let { selectedField: field } = store;
        let fieldList = [];
        let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;
        Object.keys(toJS(store.formStore.idFieldMap)).map((id) => {
            fieldList.push(store.formStore.idFieldMap[id]);
        });
        let availableRules = ValidationRuleNames.filter((rule) => {
            let rules = ValidationAllowedRules[field.inputType];
            return rules && rules.length > 0 && rules.indexOf(rule.key) > -1;
        });
        return React.createElement("div", null,
            React.createElement(Card, { size: "small", bodyStyle: { padding: '0' }, actions: [React.createElement("span", { style: { visibility: availableRules.length > 0 ? 'visible' : 'hidden' } },
                        React.createElement(Button, { size: "small", onClick: () => localStore.setIsAdding(true) }, "Add"))] },
                !hasValidation && React.createElement(Empty, { description: React.createElement("span", null, availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field") }),
                !!hasValidation && React.createElement(ValidationListView, { validation: field.validator.rule, onEdit: localStore.onEdit, onRemove: store.removeValidationRule })),
            (localStore.isAdding || localStore.isEditing) && React.createElement(Card, { size: "small", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' }, title: `${localStore.isEditing == true ? "Edit" : "Add"} Rule ${localStore.ruleType ? ' - ' + localStore.ruleType : ''}` },
                React.createElement(Form, Object.assign({ layout: "horizontal" }, formItemLayout),
                    React.createElement(Form.Item, { label: "Rule" },
                        React.createElement(Select, { onChange: (e) => localStore.setRuleType(e), style: { width: 200 }, placeholder: "Select a rule to apply", value: localStore.ruleType }, availableRules.map((rule) => {
                            return React.createElement(Select.Option, { disabled: !!field.validator.rule[rule.value], key: rule.key, value: rule.value }, rule.label);
                        }))),
                    localStore.ruleType && React.createElement(Form.Item, { label: "Message", help: `Shown when '${localStore.ruleType}' validation fails` },
                        React.createElement(Input, { type: "text", value: localStore.properties.message, onChange: (e) => localStore.setRuleProperty('message', e.target.value) })),
                    localStore.ruleType && localStore.ruleType.indexOf('date') > -1 && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not before", help: "Entered date cannot be before this date", required: !localStore.properties['latest'] },
                            React.createElement(DatePicker, { value: localStore.properties.earliest ? moment(localStore.properties.earliest, localStore.dateFormat) : null, onChange: (e) => {
                                    e ? localStore.setRuleProperty('earliest', e.format(localStore.dateFormat)) : localStore.setRuleProperty('earliest', undefined);
                                } })),
                        localStore.properties.earliest && React.createElement(Form.Item, { label: "Message - Not Before", help: "Shown when 'Not Before' validation fails (optional)" },
                            React.createElement(Input, { value: localStore.properties.tooEarly, type: "text", onChange: (e) => localStore.setRuleProperty('tooEarly', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Not after", help: "Entered date cannot be after this date", required: !localStore.properties['earliest'] },
                            React.createElement(DatePicker, { value: localStore.properties.latest ? moment(localStore.properties.latest, localStore.dateFormat) : null, onChange: (e) => {
                                    e ? localStore.setRuleProperty('latest', e.format(localStore.dateFormat)) : localStore.setRuleProperty('latest', undefined);
                                } })),
                        localStore.properties.latest && React.createElement(Form.Item, { label: "Message - Not After", help: "Shown when 'Not After' validation fails (optional)" },
                            React.createElement(Input, { value: localStore.properties.tooLate, type: "text", onChange: (e) => localStore.setRuleProperty('tooLate', e.target.value) }))),
                    localStore.ruleType == 'equality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Matches", help: "Value should match field", required: true },
                            React.createElement(Select, { value: localStore.properties.attribute, placeholder: "Select a field", onChange: (e) => { localStore.setRuleProperty('attribute', e); }, style: { width: 200 } }, fieldList.map((f) => {
                                return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: f.id == field.id },
                                    f.name,
                                    " - (",
                                    f.type || f.inputType,
                                    ")");
                            })))),
                    localStore.ruleType == 'exclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Not Within", help: "Value should not be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: localStore.properties.within, onChange: (e) => {
                                    e && e.target.value ? localStore.setRuleProperty('within', e.target.value.split(',')) : localStore.setRuleProperty('within', null);
                                } }))),
                    localStore.ruleType == 'inclusion' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Within", help: "Value must be one of (comma separated list)", required: true },
                            React.createElement(Input, { type: "text", value: localStore.properties.within, onChange: (e) => {
                                    e && e.target.value ? localStore.setRuleProperty('within', e.target.value.split(',')) : localStore.setRuleProperty('within', null);
                                } }))),
                    localStore.ruleType == 'format' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - RegEx", help: "Value must match regular expression", required: true },
                            React.createElement(Input, { type: "text", value: localStore.properties.pattern, onChange: (e) => {
                                    e && e.target.value ? localStore.setRuleProperty('pattern', e.target.value) : localStore.setRuleProperty('pattern', "/*/");
                                } })),
                        React.createElement(Form.Item, { label: "Option - Flags", help: "Regular expression flags - i|g|m", required: true },
                            React.createElement(Input, { type: "text", value: localStore.properties.flags, onChange: (e) => {
                                    e && e.target.value ? localStore.setRuleProperty('flags', e.target.value) : localStore.setRuleProperty('flags', "i");
                                } }))),
                    localStore.ruleType == 'length' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Exactly", help: "Value length must be exactly" },
                            React.createElement(InputNumber, { type: "text", value: localStore.properties.is, onChange: (e) => {
                                    if (e != null) {
                                        localStore.setRuleProperty('maximum', null);
                                        localStore.setRuleProperty('minimum', null);
                                        localStore.setRuleProperty('is', e);
                                    }
                                } })),
                        localStore.properties['is'] && React.createElement(Form.Item, { label: "Message - Exactly", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.wrongLength, onChange: (e) => localStore.setRuleProperty('wrongLength', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Minimum", help: "Value length must be at least" },
                            React.createElement(InputNumber, { type: "text", value: localStore.properties.minimum, disabled: !!localStore.properties['is'], onChange: (e) => {
                                    e != null ? localStore.setRuleProperty('minimum', e) : localStore.setRuleProperty('minimum', -1);
                                } })),
                        localStore.properties['minimum'] && React.createElement(Form.Item, { label: "Message - Minimum", help: "Shown when 'Minimum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.tooShort, onChange: (e) => localStore.setRuleProperty('tooShort', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Maximum", help: "Value length must be at most" },
                            React.createElement(InputNumber, { type: "text", value: localStore.properties.maximum, disabled: !!localStore.properties['is'], onChange: (e) => {
                                    e != null ? localStore.setRuleProperty('maximum', e) : localStore.setRuleProperty('maximum', null);
                                } })),
                        localStore.properties['maximum'] && React.createElement(Form.Item, { label: "Message - Maximum", help: "Shown when 'Maximum' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.tooLong, onChange: (e) => localStore.setRuleProperty('tooLong', e.target.value) }))),
                    localStore.ruleType == 'numericality' && React.createElement("div", null,
                        React.createElement(Form.Item, { label: "Constraint - Integer", help: "Value must be an integer" },
                            React.createElement(Checkbox, { checked: localStore.properties.integerOnly, onChange: (e) => { localStore.setRuleProperty('integerOnly', e.target.value); } })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than", help: "Value must be greater than" },
                            React.createElement(InputNumber, { value: localStore.properties.greaterThan, onChange: (e) => { localStore.setRuleProperty("greaterThan", e); } })),
                        localStore.properties['greaterThan'] && React.createElement(Form.Item, { label: "Message - Greater than", help: "Shown when 'Greater Than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notGreaterThan, onChange: (e) => localStore.setRuleProperty('notGreaterThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Greater Than Equal To", help: "Value must be greater than or equal to" },
                            React.createElement(InputNumber, { value: localStore.properties.greaterThanOrEqualTo, onChange: (e) => { localStore.setRuleProperty("greaterThanOrEqualTo", e); } })),
                        localStore.properties['greaterThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Greater than or equal to", help: "Shown when 'Exactly' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notGreaterThanOrEqualTo, onChange: (e) => localStore.setRuleProperty('notGreaterThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Equal To", help: "Value must be exactly" },
                            React.createElement(InputNumber, { value: localStore.properties.equalTo, disabled: localStore.properties.greaterThanOrEqualTo || localStore.properties.lesserThanOrEqualTo || localStore.properties.greaterThan || localStore.properties.lesserThanThan, onChange: (e) => { localStore.setRuleProperty("equalTo", e); } })),
                        localStore.properties['equalTo'] && React.createElement(Form.Item, { label: "Message - Equal to", help: "Shown when 'Equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notEqualTo, onChange: (e) => localStore.setRuleProperty('notEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than", help: "Value must be less than" },
                            React.createElement(InputNumber, { disabled: localStore.properties.equalTo, value: localStore.properties.lessThan, onChange: (e) => { localStore.setRuleProperty("lessThan", e); } })),
                        localStore.properties['lessThan'] && React.createElement(Form.Item, { label: "Message - Less than", help: "Shown when 'Less than' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notLessThan, onChange: (e) => localStore.setRuleProperty('notLessThan', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Less Than Equal To", help: "Value must be less than or equal to" },
                            React.createElement(InputNumber, { disabled: localStore.properties.equalTo, value: localStore.properties.lessThanOrEqualTo, onChange: (e) => { localStore.setRuleProperty("lessThanOrEqualTo", e); } })),
                        localStore.properties['lessThanOrEqualTo'] && React.createElement(Form.Item, { label: "Message - Less than or equal to", help: "Shown when 'Less than or equal to' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notLessThanOrEqualTo, onChange: (e) => localStore.setRuleProperty('notLessThanOrEqualTo', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Divisible By", help: "Value must be divisible by" },
                            React.createElement(InputNumber, { min: 2, value: localStore.properties.divisibleBy, disabled: localStore.properties.equalTo, onChange: (e) => { localStore.setRuleProperty("divisibleBy", e); } })),
                        localStore.properties['divisibleBy'] && React.createElement(Form.Item, { label: "Message - Not Divisible By", help: "Shown when 'Not Divisible By' validation fails (optional)" },
                            React.createElement(Input, { type: "text", onChange: (e) => localStore.setRuleProperty('notDivisibleBy', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Odd", help: "Value must be odd" },
                            React.createElement(Checkbox, { checked: localStore.properties.odd, onChange: (e) => { localStore.setRuleProperty('odd', e.target.value); } })),
                        localStore.properties['odd'] && React.createElement(Form.Item, { label: "Message - Not Odd", help: "Shown when 'Not Odd' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notOdd, onChange: (e) => localStore.setRuleProperty('notOdd', e.target.value) })),
                        React.createElement(Form.Item, { label: "Constraint - Even", help: "Value must be even" },
                            React.createElement(Checkbox, { checked: localStore.properties.even, onChange: (e) => { localStore.setRuleProperty('even', e.target.value); } })),
                        localStore.properties['even'] && React.createElement(Form.Item, { label: "Message - Not Even", help: "Shown when 'Not Even' validation fails (optional)" },
                            React.createElement(Input, { type: "text", value: localStore.properties.notEven, onChange: (e) => localStore.setRuleProperty('notEven', e.target.value) }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout, { style: { marginTop: '15px' } }),
                        React.createElement(Button, { style: { marginRight: '10px' }, type: "primary", htmlType: "submit", size: "small", disabled: !localStore.isRuleValid, onClick: localStore.applyRule }, localStore.isEditing == true ? "Apply" : "Add"),
                        React.createElement(Button, { size: "small", type: "danger", onClick: () => localStore.cancel() }, "Cancel")))));
    });
};
export default Form.create()(ValidationView);
// @observer
// export class ValidationViewOld extends React.Component<IEditorView,any> {
//     readonly dateFormat : string = "YYYY-MM-DD"
//     @observable ruleType: string;
//     @observable properties: any;
//     @observable isEditing: boolean;
//     @observable isAdding: boolean;
//     constructor(props:IEditorView) {
//         super(props);
//         this.initialize(props);
//     }
//     @action initialize(props: IEditorView) {
//         this.ruleType = null;
//         this.properties = {};
//         this.isEditing = false;
//         this.isAdding = false;
//     }
//     @action
//     setRuleType(type) {
//         this.ruleType = type;
//     }
//     @action
//     setRuleProperty(name: string, value: any) {
//         this.properties = {...this.properties, [name]: value};
//     }
//     @action
//     cancel() {
//         this.ruleType = null;
//         this.properties = {};
//         this.isEditing = false
//         this.isAdding = false;
//     }
//     @computed get isRuleValid() : boolean {
//         let {ruleType, properties} = this;
//         if(!ruleType) {
//             return false;
//         }
//         let isValid = false;
//         switch(this.ruleType) {
//             case "datetime" :{
//                 isValid = properties['latest'] || properties['latest'];
//                 break;
//             }
//             case "date" :{
//                 isValid = properties['latest'] || properties['latest'];
//                 break;
//             }
//             case "equality":{
//                 isValid = !!properties['attribute'];
//                 break;
//             }
//             case "exclusion": {
//                 isValid = !!properties['within'];
//                 break;
//             }
//             case "inclusion":{
//                 isValid = !!properties['within'];
//                 break;
//             }
//             case "format":{
//                 isValid = !!properties['pattern'];
//                 break;
//             }
//             case "length":{
//                 isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
//                 break;
//             }
//             case "numericality": {
//                 if(properties['is']) {
//                     isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
//                 } else {
//                     isValid = Object.keys(properties).length > 0;
//                 }
//                 break;
//             }
//             case "presence": {
//                 isValid = !!properties['message'];
//                 break;
//             }
//             case "url":{
//                 isValid = !!properties['url'];
//                 break;
//             }
//             default:{
//                 isValid = false;
//             }
//         }
//         return isValid;
//     }
//     @action
//     applyRule = () => {
//         let {store} = this.props;
//         let ruleLabel = ValidationRuleMap[this.ruleType];
//         if (this.isEditing == true) {
//             store.updateValidationRule(this.ruleType, this.properties);
//             notification.info({message: `Field - ${store.selectedField.label||store.selectedField.name}`,
//                 description:`Rule "${ruleLabel}" saved`, duration: 7});
//         } else {
//             store.addValidationRule(this.ruleType, this.properties);
//             notification.info({message: `Field - ${store.selectedField.label||store.selectedField.name}`,
//                 description:`Rule ${ruleLabel} added`, duration: 7});
//         }
//         this.cancel();
//     }
//     @action
//     onEdit = (rule: string) => {
//         let {store} = this.props;
//         this.isEditing = true
//         this.ruleType = rule;
//         this.properties= store.selectedField.validator.rule[rule];
//     }
//     @action
//     setIsAdding(isAdding:boolean) {
//         this.isAdding = isAdding;
//     }
//     render() {
//         let {store} = this.props;
//         let {selectedField: field} = store;
//         let fieldList = [];
//         let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;
//         Object.keys(toJS(store.formStore.idFieldMap)).map((id: string)=> {
//             fieldList.push(store.formStore.idFieldMap[id]);
//         });
//         let availableRules = ValidationRuleNames.filter((rule: any) => {
//             let rules = ValidationAllowedRules[field.inputType];
//             return rules && rules.length > 0 && rules.indexOf(rule.key) > -1
//         });
//         return <div>
//             <Card  size="small" bodyStyle={{padding: '0'}}
//                 actions={[<span style={{visibility: availableRules.length>0 ? 'visible' : 'hidden'}}>
//                     <Button size="small" onClick={() => this.setIsAdding(true)}>Add</Button></span>]}>
//                 {!hasValidation && <Empty description={
//                     <span>{availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field"}</span>
//                     }>
//                 </Empty>}
//                 {!!hasValidation && <ValidationListView
//                     validation={field.validator.rule}
//                     onEdit={this.onEdit}
//                     onRemove={store.removeValidationRule}/>
//                 }
//             </Card>
//             {(this.isAdding || this.isEditing) && <Card size="small" bodyStyle={{padding: '8px'}} style={{marginTop:'15px'}}
//                     title={`${this.isEditing == true ? "Edit" : "Add"} Rule ${this.ruleType ? ' - ' + this.ruleType: ''}`}>
//             <Form layout="horizontal" {...formItemLayout}>
//                 <Form.Item label="Rule">
//                     <Select onChange={(e) => this.setRuleType(e)} style={{ width: 200 }} placeholder="Select a rule to apply" value={this.ruleType}>
//                         {availableRules.map((rule: any) => {
//                             return <Select.Option disabled={!!field.validator.rule[rule.value]} key={rule.key} value={rule.value}>{rule.label}</Select.Option>
//                         })}
//                     </Select>
//                 </Form.Item>
//                 {this.ruleType && <Form.Item  label="Message" help={`Shown when '${this.ruleType}' validation fails`}>
//                     <Input type="text"  value={this.properties.message} onChange={(e) => this.setRuleProperty('message', e.target.value)}></Input>
//                 </Form.Item>}
//                 { this.ruleType && this.ruleType.indexOf('date') > -1 && <div>
//                     <Form.Item label="Constraint - Not before" help="Entered date cannot be before this date" required={!this.properties['latest']} >
//                         <DatePicker value={this.properties.earliest ? moment(this.properties.earliest, this.dateFormat) : null} onChange={(e) => {
//                             e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined)
//                         }}>
//                         </DatePicker>
//                     </Form.Item>
//                     {this.properties.earliest && <Form.Item label="Message - Not Before" help="Shown when 'Not Before' validation fails (optional)" >
//                         <Input value={this.properties.tooEarly} type="text" onChange={(e) => this.setRuleProperty('tooEarly', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Not after" help="Entered date cannot be after this date" required={!this.properties['earliest']}>
//                         <DatePicker  value={this.properties.latest ? moment(this.properties.latest, this.dateFormat) : null} onChange={(e) => {
//                             e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined)
//                         }}>
//                         </DatePicker>
//                     </Form.Item>
//                     {this.properties.latest && <Form.Item label="Message - Not After" help="Shown when 'Not After' validation fails (optional)">
//                         <Input value={this.properties.tooLate} type="text" onChange={(e) => this.setRuleProperty('tooLate', e.target.value)}></Input>
//                     </Form.Item>}
//                 </div>}
//                 { this.ruleType == 'equality' && <div>
//                     <Form.Item label="Constraint - Matches" help="Value should match field" required>
//                         <Select value={this.properties.attribute} placeholder="Select a field" onChange={(e) => { this.setRuleProperty('attribute', e);}} style={{width: 200}}>
//                             {fieldList.map((f: Field)=> {
//                                 return <Select.Option key={f.id} value={f.id} disabled={f.id==field.id}>{f.name} - ({f.type||f.inputType})</Select.Option>
//                             })}
//                         </Select>
//                     </Form.Item>
//                 </div> }
//                 { this.ruleType == 'exclusion' && <div>
//                     <Form.Item label="Constraint - Not Within" help="Value should not be one of (comma separated list)" required>
//                        <Input type="text" value={this.properties.within} onChange={(e) => {
//                                 e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
//                         }}>
//                        </Input>
//                     </Form.Item>
//                 </div> }
//                 { this.ruleType == 'inclusion' && <div>
//                     <Form.Item label="Constraint - Within" help="Value must be one of (comma separated list)" required>
//                        <Input type="text" value={this.properties.within} onChange={(e) => {
//                                 e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
//                         }}>
//                        </Input>
//                     </Form.Item>
//                 </div> }
//                 { this.ruleType == 'format' && <div>
//                     <Form.Item label="Constraint - RegEx" help="Value must match regular expression" required>
//                        <Input type="text" value={this.properties.pattern} onChange={(e) => {
//                                 e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/" )
//                         }}>
//                        </Input>
//                     </Form.Item>
//                     <Form.Item label="Option - Flags" help="Regular expression flags - i|g|m" required>
//                        <Input type="text" value={this.properties.flags} onChange={(e) => {
//                                 e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i" )
//                         }}>
//                        </Input>
//                     </Form.Item>
//                 </div> }
//                 { this.ruleType == 'length' && <div>
//                     <Form.Item label="Constraint - Exactly" help="Value length must be exactly">
//                        <InputNumber type="text" value={this.properties.is} onChange={(e) => {
//                             if(e != null) {
//                                 this.setRuleProperty('maximum', null)
//                                 this.setRuleProperty('minimum', null)
//                                 this.setRuleProperty('is', e)
//                             }
//                         }}>
//                        </InputNumber>
//                     </Form.Item>
//                     {this.properties['is'] && <Form.Item label="Message - Exactly" help="Shown when 'Exactly' validation fails (optional)">
//                         <Input type="text" value={this.properties.wrongLength} onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Minimum" help="Value length must be at least" >
//                        <InputNumber type="text" value={this.properties.minimum} disabled={!!this.properties['is']} onChange={(e) => {
//                                 e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1)
//                         }}>
//                        </InputNumber>
//                     </Form.Item>
//                     {this.properties['minimum'] && <Form.Item label="Message - Minimum" help="Shown when 'Minimum' validation fails (optional)">
//                         <Input type="text" value={this.properties.tooShort} onChange={(e) => this.setRuleProperty('tooShort', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Maximum" help="Value length must be at most">
//                        <InputNumber type="text" value={this.properties.maximum} disabled={!!this.properties['is']} onChange={(e) => {
//                                 e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null )
//                         }}>
//                        </InputNumber>
//                     </Form.Item>
//                     {this.properties['maximum'] && <Form.Item label="Message - Maximum" help="Shown when 'Maximum' validation fails (optional)">
//                         <Input type="text" value={this.properties.tooLong} onChange={(e) => this.setRuleProperty('tooLong', e.target.value)}></Input>
//                     </Form.Item>}
//                 </div> }
//                 { this.ruleType == 'numericality' && <div>
//                     <Form.Item label="Constraint - Integer" help="Value must be an integer">
//                         <Checkbox checked={this.properties.integerOnly} onChange={(e)=>{this.setRuleProperty('integerOnly', e.target.value)}}></Checkbox>
//                     </Form.Item>
//                     <Form.Item label="Constraint - Greater Than" help="Value must be greater than">
//                         <InputNumber value={this.properties.greaterThan} onChange={(e) => {this.setRuleProperty("greaterThan", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['greaterThan'] && <Form.Item label="Message - Greater than" help="Shown when 'Greater Than' validation fails (optional)">
//                         <Input type="text" value={this.properties.notGreaterThan} onChange={(e) => this.setRuleProperty('notGreaterThan', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Greater Than Equal To" help="Value must be greater than or equal to">
//                         <InputNumber value={this.properties.greaterThanOrEqualTo} onChange={(e) => {this.setRuleProperty("greaterThanOrEqualTo", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['greaterThanOrEqualTo'] && <Form.Item label="Message - Greater than or equal to" help="Shown when 'Exactly' validation fails (optional)">
//                         <Input type="text" value={this.properties.notGreaterThanOrEqualTo} onChange={(e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Equal To" help="Value must be exactly">
//                         <InputNumber value={this.properties.equalTo} disabled={this.properties.greaterThanOrEqualTo||this.properties.lesserThanOrEqualTo||this.properties.greaterThan||this.properties.lesserThanThan} onChange={(e) => {this.setRuleProperty("equalTo", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['equalTo'] && <Form.Item label="Message - Equal to" help="Shown when 'Equal to' validation fails (optional)">
//                         <Input type="text" value={this.properties.notEqualTo} onChange={(e) => this.setRuleProperty('notEqualTo', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Less Than" help="Value must be less than">
//                         <InputNumber disabled={this.properties.equalTo} value={this.properties.lessThan} onChange={(e) => {this.setRuleProperty("lessThan", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['lessThan'] && <Form.Item label="Message - Less than" help="Shown when 'Less than' validation fails (optional)">
//                         <Input type="text" value={this.properties.notLessThan} onChange={(e) => this.setRuleProperty('notLessThan', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Less Than Equal To" help="Value must be less than or equal to">
//                         <InputNumber disabled={this.properties.equalTo} value={this.properties.lessThanOrEqualTo} onChange={(e) => {this.setRuleProperty("lessThanOrEqualTo", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['lessThanOrEqualTo'] && <Form.Item label="Message - Less than or equal to" help="Shown when 'Less than or equal to' validation fails (optional)">
//                         <Input type="text" value={this.properties.notLessThanOrEqualTo} onChange={(e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Divisible By" help="Value must be divisible by">
//                         <InputNumber min={2} value={this.properties.divisibleBy} disabled={this.properties.equalTo} onChange={(e) => {this.setRuleProperty("divisibleBy", e)}}></InputNumber>
//                     </Form.Item>
//                     {this.properties['divisibleBy'] && <Form.Item label="Message - Not Divisible By" help="Shown when 'Not Divisible By' validation fails (optional)">
//                         <Input type="text" onChange={(e) => this.setRuleProperty('notDivisibleBy', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Odd" help="Value must be odd">
//                         <Checkbox checked={this.properties.odd} onChange={(e)=>{this.setRuleProperty('odd', e.target.value)}}></Checkbox>
//                     </Form.Item>
//                     {this.properties['odd'] && <Form.Item label="Message - Not Odd" help="Shown when 'Not Odd' validation fails (optional)">
//                         <Input type="text" value={this.properties.notOdd} onChange={(e) => this.setRuleProperty('notOdd', e.target.value)}></Input>
//                     </Form.Item>}
//                     <Form.Item label="Constraint - Even" help="Value must be even">
//                         <Checkbox checked={this.properties.even} onChange={(e)=>{this.setRuleProperty('even', e.target.value)}}></Checkbox>
//                     </Form.Item>
//                     {this.properties['even'] && <Form.Item label="Message - Not Even" help="Shown when 'Not Even' validation fails (optional)">
//                         <Input type="text" value={this.properties.notEven} onChange={(e) => this.setRuleProperty('notEven', e.target.value)}></Input>
//                     </Form.Item>}
//                 </div> }
//                 <Form.Item {...tailFormItemLayout} style={{marginTop: '15px'}}>
//                     <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"
//                         size="small"
//                         disabled={!this.isRuleValid}
//                         onClick={this.applyRule}>
//                         {this.isEditing == true ? "Apply" : "Add"}
//                     </Button>
//                     <Button size="small" type="danger" onClick={() => this.cancel()}>Cancel</Button>
//                 </Form.Item>
//             </Form>
//          </Card>}
//     </div>
//     }
// }
