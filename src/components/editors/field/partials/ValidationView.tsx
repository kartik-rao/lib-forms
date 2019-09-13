import { Field, ValidationAllowedRules, ValidationRuleMap, ValidationRuleNames } from "@kartikrao/lib-forms-core";
import { Button, Card, Checkbox, DatePicker, Empty, Form, Input, InputNumber, notification, Select } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import moment from 'moment';
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
import { ValidationListView } from "./ValidationListView";

const ValidationView = (props: FormComponentProps) => {
    const store = React.useContext(editorStoreContext);
    if (!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        dateFormat : "YYYY-MM-DD" as string,
        ruleType: null as string,
        properties: {} as any,
        isEditing: false,
        isAdding: false,
        setRuleType: function (type) {
            this.ruleType = type;
        },
        setRuleProperty: function (name: string, value: any) {
            this.properties = {...this.properties, [name]: value};
        },
        cancel: function () {
            this.ruleType = null;
            this.properties = {};
            this.isEditing = false
            this.isAdding = false;
        },
        get isRuleValid() : boolean {
            let {ruleType, properties} = this;
            if(!ruleType) {
                return false;
            }
            let isValid = false;
            switch(this.ruleType) {
                case "datetime" :{
                    isValid = properties['latest'] || properties['latest'];
                    break;
                }
                case "date" :{
                    isValid = properties['latest'] || properties['latest'];
                    break;
                }
                case "equality":{
                    isValid = !!properties['attribute'];
                    break;
                }
                case "exclusion": {
                    isValid = !!properties['within'];
                    break;
                }
                case "inclusion":{
                    isValid = !!properties['within'];
                    break;
                }
                case "format":{
                    isValid = !!properties['pattern'];
                    break;
                }
                case "length":{
                    isValid = (!properties['minimum'] && !properties['maximum'] && properties['is']) || ((properties['minimum'] || properties['maximum']) && !properties['is']);
                    break;
                }
                case "numericality": {
                    if(properties['is']) {
                        isValid = properties['strict'] ? Object.keys(properties).length == 2 : false;
                    } else {
                        isValid = Object.keys(properties).length > 0;
                    }
                    break;
                }
                case "presence": {
                    isValid = !!properties['message'];
                    break;
                }
                case "url":{
                    isValid = !!properties['url'];
                    break;
                }
                default:{
                    isValid = false;
                }
            }
            return isValid;
        },
        applyRule : function () {
            let ruleLabel = ValidationRuleMap[this.ruleType];
            const fieldName = store.selectedField.label||store.selectedField.name;
            store.pushUndoState(`Field "${fieldName}" rule "${this.ruleType}" ${this.isEditing ? 'edited' : 'added'}.`);
            if (this.isEditing == true) {
                store.updateValidationRule(this.ruleType, this.properties);
                notification.info({message: `Field - ${fieldName}`,
                    description:`Rule "${ruleLabel}" saved`, duration: 7});
            } else {
                store.addValidationRule(this.ruleType, this.properties);
                notification.info({message: `Field - ${fieldName}`,
                    description:`Rule ${ruleLabel} added`, duration: 7});
            }
            this.cancel();
        },
        onEdit : function (rule: string) {
            this.isEditing = true
            this.ruleType = rule;
            this.properties = store.selectedField.validator.rule[rule];
        },
        setIsAdding : function (isAdding:boolean) {
            this.isAdding = isAdding;
        },
        get availableRules() : {key: string, label: string, value: string}[] {
            if(!store.selectedField) {return []}
            return ValidationRuleNames.filter((rule: any) => {
                let rules = ValidationAllowedRules[store.selectedField.inputType];
                return rules && rules.length > 0 && rules.indexOf(rule.key) > -1
            });
        },
        get fieldList() : Field[] {
            let fieldList = [];
            Object.keys(toJS(store.formStore.idFieldMap)).map((id: string)=> {
                fieldList.push(store.formStore.idFieldMap[id]);
            });
            return fieldList;
        },
        get hasValidation() : boolean {
            if(!store.selectedField) {return false;}
            return Object.keys(store.selectedField.validator.rule.constraints).length > 0;
        }
    }));

    return useObserver(() => {
        return <div>
            <Card  size="small" bodyStyle={{padding: '0'}}
                actions={[<span style={{visibility: localStore.availableRules.length > 0 ? 'visible' : 'hidden'}}>
                    <Button size="small" onClick={() => localStore.setIsAdding(true)}>Add</Button></span>]}>
                {!localStore.hasValidation && <Empty description={
                    <span>{localStore.availableRules.length > 0 ? "No validation set on this field" : "No validation available for this field"}</span>
                    }>
                </Empty>}
                {!!localStore.hasValidation && <ValidationListView
                    validation={store.selectedField.validator.rule}
                    onEdit={localStore.onEdit}
                    onRemove={store.removeValidationRule}/>
                }
            </Card>

            {(localStore.isAdding || localStore.isEditing) && <Card size="small" bodyStyle={{padding: '8px'}} style={{marginTop:'15px'}}
                    title={`${localStore.isEditing == true ? "Edit" : "Add"} Rule ${localStore.ruleType ? ' - ' + localStore.ruleType: ''}`}>
            <Form layout="horizontal" {...formItemLayout}>
                <Form.Item label="Rule">
                    <Select onChange={(e) => localStore.setRuleType(e)} style={{ width: 200 }} placeholder="Select a rule to apply" value={localStore.ruleType}>
                        {localStore.availableRules.map((rule: any) => {
                            return <Select.Option disabled={!!store.selectedField.validator.rule[rule.value]} key={rule.key} value={rule.value}>{rule.label}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                {localStore.ruleType && <Form.Item  label="Message" help={`Shown when '${localStore.ruleType}' validation fails`}>
                    <Input type="text"  value={localStore.properties.message} onChange={(e) => localStore.setRuleProperty('message', e.target.value)}></Input>
                </Form.Item>}
                { localStore.ruleType && localStore.ruleType.indexOf('date') > -1 && <div>
                    <Form.Item label="Constraint - Not before" help="Entered date cannot be before this date" required={!localStore.properties['latest']} >
                        <DatePicker value={localStore.properties.earliest ? moment(localStore.properties.earliest, localStore.dateFormat) : null} onChange={(e) => {
                            e ? localStore.setRuleProperty('earliest', e.format(localStore.dateFormat)) : localStore.setRuleProperty('earliest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {localStore.properties.earliest && <Form.Item label="Message - Not Before" help="Shown when 'Not Before' validation fails (optional)" >
                        <Input value={localStore.properties.tooEarly} type="text" onChange={(e) => localStore.setRuleProperty('tooEarly', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Not after" help="Entered date cannot be after this date" required={!localStore.properties['earliest']}>
                        <DatePicker  value={localStore.properties.latest ? moment(localStore.properties.latest, localStore.dateFormat) : null} onChange={(e) => {
                            e ? localStore.setRuleProperty('latest', e.format(localStore.dateFormat)) : localStore.setRuleProperty('latest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {localStore.properties.latest && <Form.Item label="Message - Not After" help="Shown when 'Not After' validation fails (optional)">
                        <Input value={localStore.properties.tooLate} type="text" onChange={(e) => localStore.setRuleProperty('tooLate', e.target.value)}></Input>
                    </Form.Item>}
                </div>}
                { localStore.ruleType == 'equality' && <div>
                    <Form.Item label="Constraint - Matches" help="Value should match field" required>
                        <Select value={localStore.properties.attribute} placeholder="Select a field" onChange={(e) => { localStore.setRuleProperty('attribute', e);}} style={{width: 200}}>
                            {localStore.fieldList.map((f: Field)=> {
                                return <Select.Option key={f.id} value={f.id} disabled={f.id==store.selectedField.id}>{f.name} - ({f.type||f.inputType})</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </div> }
                { localStore.ruleType == 'exclusion' && <div>
                    <Form.Item label="Constraint - Not Within" help="Value should not be one of (comma separated list)" required>
                        <Input type="text" value={localStore.properties.within} onChange={(e) => {
                                e && e.target.value ? localStore.setRuleProperty('within', e.target.value.split(',')) : localStore.setRuleProperty('within', null )
                        }}>
                        </Input>
                    </Form.Item>
                </div> }
                { localStore.ruleType == 'inclusion' && <div>
                    <Form.Item label="Constraint - Within" help="Value must be one of (comma separated list)" required>
                        <Input type="text" value={localStore.properties.within} onChange={(e) => {
                                e && e.target.value ? localStore.setRuleProperty('within', e.target.value.split(',')) : localStore.setRuleProperty('within', null )
                        }}>
                        </Input>
                    </Form.Item>
                </div> }
                { localStore.ruleType == 'format' && <div>
                    <Form.Item label="Constraint - RegEx" help="Value must match regular expression" required>
                        <Input type="text" value={localStore.properties.pattern} onChange={(e) => {
                                e && e.target.value ? localStore.setRuleProperty('pattern', e.target.value) : localStore.setRuleProperty('pattern', "/*/" )
                        }}>
                        </Input>
                    </Form.Item>
                    <Form.Item label="Option - Flags" help="Regular expression flags - i|g|m" required>
                        <Input type="text" value={localStore.properties.flags} onChange={(e) => {
                                e && e.target.value ? localStore.setRuleProperty('flags', e.target.value) : localStore.setRuleProperty('flags', "i" )
                        }}>
                        </Input>
                    </Form.Item>
                </div> }
                { localStore.ruleType == 'length' && <div>
                    <Form.Item label="Constraint - Exactly" help="Value length must be exactly">
                        <InputNumber type="text" value={localStore.properties.is} onChange={(e) => {
                            if(e != null) {
                                localStore.setRuleProperty('maximum', null)
                                localStore.setRuleProperty('minimum', null)
                                localStore.setRuleProperty('is', e)
                            }
                        }}>
                        </InputNumber>
                    </Form.Item>
                    {localStore.properties['is'] && <Form.Item label="Message - Exactly" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={localStore.properties.wrongLength} onChange={(e) => localStore.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}

                    <Form.Item label="Constraint - Minimum" help="Value length must be at least" >
                        <InputNumber type="text" value={localStore.properties.minimum} disabled={!!localStore.properties['is']} onChange={(e) => {
                                e != null ? localStore.setRuleProperty('minimum', e) : localStore.setRuleProperty('minimum', -1)
                        }}>
                        </InputNumber>
                    </Form.Item>
                    {localStore.properties['minimum'] && <Form.Item label="Message - Minimum" help="Shown when 'Minimum' validation fails (optional)">
                        <Input type="text" value={localStore.properties.tooShort} onChange={(e) => localStore.setRuleProperty('tooShort', e.target.value)}></Input>
                    </Form.Item>}

                    <Form.Item label="Constraint - Maximum" help="Value length must be at most">
                        <InputNumber type="text" value={localStore.properties.maximum} disabled={!!localStore.properties['is']} onChange={(e) => {
                                e != null ? localStore.setRuleProperty('maximum', e) : localStore.setRuleProperty('maximum', null )
                        }}>
                        </InputNumber>
                    </Form.Item>
                    {localStore.properties['maximum'] && <Form.Item label="Message - Maximum" help="Shown when 'Maximum' validation fails (optional)">
                        <Input type="text" value={localStore.properties.tooLong} onChange={(e) => localStore.setRuleProperty('tooLong', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                { localStore.ruleType == 'numericality' && <div>
                    <Form.Item label="Constraint - Integer" help="Value must be an integer">
                        <Checkbox checked={localStore.properties.integerOnly} onChange={(e)=>{localStore.setRuleProperty('integerOnly', e.target.value)}}></Checkbox>
                    </Form.Item>
                    <Form.Item label="Constraint - Greater Than" help="Value must be greater than">
                        <InputNumber value={localStore.properties.greaterThan} onChange={(e) => {localStore.setRuleProperty("greaterThan", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['greaterThan'] && <Form.Item label="Message - Greater than" help="Shown when 'Greater Than' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notGreaterThan} onChange={(e) => localStore.setRuleProperty('notGreaterThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Greater Than Equal To" help="Value must be greater than or equal to">
                        <InputNumber value={localStore.properties.greaterThanOrEqualTo} onChange={(e) => {localStore.setRuleProperty("greaterThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['greaterThanOrEqualTo'] && <Form.Item label="Message - Greater than or equal to" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notGreaterThanOrEqualTo} onChange={(e) => localStore.setRuleProperty('notGreaterThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Equal To" help="Value must be exactly">
                        <InputNumber value={localStore.properties.equalTo} disabled={localStore.properties.greaterThanOrEqualTo||localStore.properties.lesserThanOrEqualTo||localStore.properties.greaterThan||localStore.properties.lesserThanThan} onChange={(e) => {localStore.setRuleProperty("equalTo", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['equalTo'] && <Form.Item label="Message - Equal to" help="Shown when 'Equal to' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notEqualTo} onChange={(e) => localStore.setRuleProperty('notEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than" help="Value must be less than">
                        <InputNumber disabled={localStore.properties.equalTo} value={localStore.properties.lessThan} onChange={(e) => {localStore.setRuleProperty("lessThan", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['lessThan'] && <Form.Item label="Message - Less than" help="Shown when 'Less than' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notLessThan} onChange={(e) => localStore.setRuleProperty('notLessThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than Equal To" help="Value must be less than or equal to">
                        <InputNumber disabled={localStore.properties.equalTo} value={localStore.properties.lessThanOrEqualTo} onChange={(e) => {localStore.setRuleProperty("lessThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['lessThanOrEqualTo'] && <Form.Item label="Message - Less than or equal to" help="Shown when 'Less than or equal to' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notLessThanOrEqualTo} onChange={(e) => localStore.setRuleProperty('notLessThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Divisible By" help="Value must be divisible by">
                        <InputNumber min={2} value={localStore.properties.divisibleBy} disabled={localStore.properties.equalTo} onChange={(e) => {localStore.setRuleProperty("divisibleBy", e)}}></InputNumber>
                    </Form.Item>
                    {localStore.properties['divisibleBy'] && <Form.Item label="Message - Not Divisible By" help="Shown when 'Not Divisible By' validation fails (optional)">
                        <Input type="text" onChange={(e) => localStore.setRuleProperty('notDivisibleBy', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Odd" help="Value must be odd">
                        <Checkbox checked={localStore.properties.odd} onChange={(e)=>{localStore.setRuleProperty('odd', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {localStore.properties['odd'] && <Form.Item label="Message - Not Odd" help="Shown when 'Not Odd' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notOdd} onChange={(e) => localStore.setRuleProperty('notOdd', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Even" help="Value must be even">
                        <Checkbox checked={localStore.properties.even} onChange={(e)=>{localStore.setRuleProperty('even', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {localStore.properties['even'] && <Form.Item label="Message - Not Even" help="Shown when 'Not Even' validation fails (optional)">
                        <Input type="text" value={localStore.properties.notEven} onChange={(e) => localStore.setRuleProperty('notEven', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                <Form.Item {...tailFormItemLayout} style={{marginTop: '15px'}}>
                    <Button style={{marginRight: '10px'}} type="primary" htmlType="submit"
                        size="small"
                        disabled={!localStore.isRuleValid}
                        onClick={localStore.applyRule}>
                        {localStore.isEditing == true ? "Apply" : "Add"}
                    </Button>
                    <Button size="small" type="danger" onClick={() => localStore.cancel()}>Cancel</Button>
                </Form.Item>
            </Form>
        </Card>}
    </div>
    });
}

export default Form.create<FormComponentProps>()(ValidationView);
