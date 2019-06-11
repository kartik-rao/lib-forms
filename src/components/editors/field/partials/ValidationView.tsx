import Field from "@kartikrao/lib-forms-core/lib/models/field";
import { ValidationRuleNames } from "@kartikrao/lib-forms-core/lib/models/validation";
import { Button, Card, Checkbox, DatePicker, Empty, Form, Icon, Input, InputNumber, Select } from "antd";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import moment from 'moment';
import * as React from "react";
import { IComponentEditorView } from "../../IComponentEditorView";
import { ValidationListView } from "./ValidationListView";

@observer
export class ValidationView extends React.Component<IComponentEditorView,any> {

    readonly dateFormat : string = "YYYY-MM-DD"
    @observable ruleType: string;
    @observable properties: any;
    @observable isEditing: boolean;
    @observable isAdding: boolean;

    constructor(props:IComponentEditorView) {
        super(props);
        this.initialize(props);
    }

    @action initialize(props: IComponentEditorView) {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false;
        this.isAdding = false;
    }

    @action
    setRuleType(type) {
        this.ruleType = type;
    }

    @action
    setRuleProperty(name: string, value: any) {
        this.properties = {...this.properties, [name]: value};
    }

    @action
    cancel() {
        this.ruleType = null;
        this.properties = {};
        this.isEditing = false
        this.isAdding = false;
    }

    @computed get isRuleValid() : boolean {
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
    }

    @action
    applyRule = () => {
        let {editorStore} = this.props.store;
        if (this.isEditing == true) {
            editorStore.updateValidationRule(this.ruleType, this.properties);
        } else {
            editorStore.addValidationRule(this.ruleType, this.properties);
        }
        this.cancel();
    }

    @action
    onEdit = (rule: string) => {
        let {editorStore} = this.props.store;
        this.isEditing = true
        this.ruleType = rule;
        this.properties= editorStore.field.validator.rule[rule];
    }

    @action
    setIsAdding(isAdding:boolean) {
        this.isAdding = isAdding;
    }

    render() {
        let {editorStore} = this.props.store;
        let {field} = editorStore;
        let fieldList = [];
        let hasValidation = Object.keys(field.validator.rule.constraints).length > 0;

        Object.keys(toJS(editorStore.formStore.idFieldMap)).map((id: string)=> {
            fieldList.push(editorStore.formStore.idFieldMap[id]);
        });

        let formLayoutProps = {
            labelcol: {span: 6, offset: 1},
            wrappercol: {span: 14, offset: 1}
        };

        return <div>
            <Card title="Rules" size="small" bodyStyle={{padding: '0'}} actions={[<Icon onClick={() => this.setIsAdding(true)} type="plus"/>]}>
                {!hasValidation && <Empty description={
                    <span>No validation on this field</span>
                    }>
                </Empty>}
                {!!hasValidation && <ValidationListView
                        validation={field.validator.rule}
                        onEdit={this.onEdit}
                        onRemove={editorStore.removeValidationRule}/>
                }
            </Card>
            {(this.isAdding || this.isEditing) && <Card style={{marginTop:'15px'}} title={`${this.isEditing == true ? "Edit" : "Add"} Rule ${this.ruleType ? ' - ' + this.ruleType: ''}`}>
            <Form layout="horizontal" labelCol={formLayoutProps.labelcol} wrapperCol={formLayoutProps.wrappercol}>
                <Form.Item label="Rule">
                    <Select onChange={(e) => this.setRuleType(e)} style={{ width: 200 }} placeholder="Select a rule to apply" value={this.ruleType}>
                        {ValidationRuleNames.map((rule: any) => {
                            return <Select.Option disabled={!!field.validator.rule[rule.value]} key={rule.key} value={rule.value}>{rule.label}</Select.Option>
                        })}
                    </Select>
                </Form.Item>
                {this.ruleType && <Form.Item  label="Message" help={`Shown when '${this.ruleType}' validation fails`}>
                    <Input type="text"  value={this.properties.message} onChange={(e) => this.setRuleProperty('message', e.target.value)}></Input>
                </Form.Item>}
                { this.ruleType && this.ruleType.indexOf('date') > -1 && <div>
                    <Form.Item label="Constraint - Not before" help="Entered date cannot be before this date" required={!this.properties['latest']} >
                        <DatePicker value={this.properties.earliest ? moment(this.properties.earliest, this.dateFormat) : null} onChange={(e) => {
                            e ? this.setRuleProperty('earliest', e.format(this.dateFormat)) : this.setRuleProperty('earliest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.properties.earliest && <Form.Item label="Message - Not Before" help="Shown when 'Not Before' validation fails (optional)" >
                        <Input value={this.properties.tooEarly} type="text" onChange={(e) => this.setRuleProperty('tooEarly', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Not after" help="Entered date cannot be after this date" required={!this.properties['earliest']}>
                        <DatePicker  value={this.properties.latest ? moment(this.properties.latest, this.dateFormat) : null} onChange={(e) => {
                            e ? this.setRuleProperty('latest', e.format(this.dateFormat)) : this.setRuleProperty('latest', undefined)
                        }}>
                        </DatePicker>
                    </Form.Item>
                    {this.properties.latest && <Form.Item label="Message - Not After" help="Shown when 'Not After' validation fails (optional)">
                        <Input value={this.properties.tooLate} type="text" onChange={(e) => this.setRuleProperty('tooLate', e.target.value)}></Input>
                    </Form.Item>}
                </div>}
                { this.ruleType == 'equality' && <div>
                    <Form.Item label="Constraint - Matches" help="Value should match field" required>
                        <Select value={this.properties.attribute} placeholder="Select a field" onChange={(e) => { this.setRuleProperty('attribute', e);}} style={{width: 200}}>
                            {fieldList.map((f: Field)=> {
                                return <Select.Option key={f.id} value={f.id} disabled={f.id==field.id}>{f.name} - ({f.type||f.inputType})</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                </div> }
                { this.ruleType == 'exclusion' && <div>
                    <Form.Item label="Constraint - Not Within" help="Value should not be one of (comma separated list)" required>
                       <Input type="text" value={this.properties.within} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.ruleType == 'inclusion' && <div>
                    <Form.Item label="Constraint - Within" help="Value must be one of (comma separated list)" required>
                       <Input type="text" value={this.properties.within} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('within', e.target.value.split(',')) : this.setRuleProperty('within', null )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.ruleType == 'format' && <div>
                    <Form.Item label="Constraint - Regular Expression" help="Value must match regular expression" required>
                       <Input type="text" value={this.properties.pattern} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('pattern', e.target.value) : this.setRuleProperty('pattern', "/*/" )
                        }}>
                       </Input>
                    </Form.Item>
                    <Form.Item label="Option - Flags" help="Regular expression flags - i|g|m" required>
                       <Input type="text" value={this.properties.flags} onChange={(e) => {
                                e && e.target.value ? this.setRuleProperty('flags', e.target.value) : this.setRuleProperty('flags', "i" )
                        }}>
                       </Input>
                    </Form.Item>
                </div> }
                { this.ruleType == 'length' && <div>
                    <Form.Item label="Constraint - Exactly" help="Value length must be exactly">
                       <InputNumber type="text" value={this.properties.is} onChange={(e) => {
                            if(e != null) {
                                this.setRuleProperty('maximum', null)
                                this.setRuleProperty('minimum', null)
                                this.setRuleProperty('is', e)
                            }
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.properties['is'] && <Form.Item label="Message - Exactly" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={this.properties.wrongLength} onChange={(e) => this.setRuleProperty('wrongLength', e.target.value)}></Input>
                    </Form.Item>}

                    <Form.Item label="Constraint - Minimum" help="Value length must be at least" >
                       <InputNumber type="text" value={this.properties.minimum} disabled={!!this.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('minimum', e) : this.setRuleProperty('minimum', -1)
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.properties['minimum'] && <Form.Item label="Message - Minimum" help="Shown when 'Minimum' validation fails (optional)">
                        <Input type="text" value={this.properties.tooShort} onChange={(e) => this.setRuleProperty('tooShort', e.target.value)}></Input>
                    </Form.Item>}

                    <Form.Item label="Constraint - Maximum" help="Value length must be at most">
                       <InputNumber type="text" value={this.properties.maximum} disabled={!!this.properties['is']} onChange={(e) => {
                                e != null ? this.setRuleProperty('maximum', e) : this.setRuleProperty('maximum', null )
                        }}>
                       </InputNumber>
                    </Form.Item>
                    {this.properties['maximum'] && <Form.Item label="Message - Maximum" help="Shown when 'Maximum' validation fails (optional)">
                        <Input type="text" value={this.properties.tooLong} onChange={(e) => this.setRuleProperty('tooLong', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                { this.ruleType == 'numericality' && <div>
                    <Form.Item label="Constraint - Integer" help="Value must be an integer">
                        <Checkbox checked={this.properties.integerOnly} onChange={(e)=>{this.setRuleProperty('integerOnly', e.target.value)}}></Checkbox>
                    </Form.Item>
                    <Form.Item label="Constraint - Greater Than" help="Value must be greater than">
                        <InputNumber value={this.properties.greaterThan} onChange={(e) => {this.setRuleProperty("greaterThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['greaterThan'] && <Form.Item label="Message - Greater than" help="Shown when 'Greater Than' validation fails (optional)">
                        <Input type="text" value={this.properties.notGreaterThan} onChange={(e) => this.setRuleProperty('notGreaterThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Greater Than Equal To" help="Value must be greater than or equal to">
                        <InputNumber value={this.properties.greaterThanOrEqualTo} onChange={(e) => {this.setRuleProperty("greaterThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['greaterThanOrEqualTo'] && <Form.Item label="Message - Greater than or equal to" help="Shown when 'Exactly' validation fails (optional)">
                        <Input type="text" value={this.properties.notGreaterThanOrEqualTo} onChange={(e) => this.setRuleProperty('notGreaterThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Equal To" help="Value must be exactly">
                        <InputNumber value={this.properties.equalTo} disabled={this.properties.greaterThanOrEqualTo||this.properties.lesserThanOrEqualTo||this.properties.greaterThan||this.properties.lesserThanThan} onChange={(e) => {this.setRuleProperty("equalTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['equalTo'] && <Form.Item label="Message - Equal to" help="Shown when 'Equal to' validation fails (optional)">
                        <Input type="text" value={this.properties.notEqualTo} onChange={(e) => this.setRuleProperty('notEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than" help="Value must be less than">
                        <InputNumber disabled={this.properties.equalTo} value={this.properties.lessThan} onChange={(e) => {this.setRuleProperty("lessThan", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['lessThan'] && <Form.Item label="Message - Less than" help="Shown when 'Less than' validation fails (optional)">
                        <Input type="text" value={this.properties.notLessThan} onChange={(e) => this.setRuleProperty('notLessThan', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Less Than Equal To" help="Value must be less than or equal to">
                        <InputNumber disabled={this.properties.equalTo} value={this.properties.lessThanOrEqualTo} onChange={(e) => {this.setRuleProperty("lessThanOrEqualTo", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['lessThanOrEqualTo'] && <Form.Item label="Message - Less than or equal to" help="Shown when 'Less than or equal to' validation fails (optional)">
                        <Input type="text" value={this.properties.notLessThanOrEqualTo} onChange={(e) => this.setRuleProperty('notLessThanOrEqualTo', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Divisible By" help="Value must be divisible by">
                        <InputNumber min={2} value={this.properties.divisibleBy} disabled={this.properties.equalTo} onChange={(e) => {this.setRuleProperty("divisibleBy", e)}}></InputNumber>
                    </Form.Item>
                    {this.properties['divisibleBy'] && <Form.Item label="Message - Not Divisible By" help="Shown when 'Not Divisible By' validation fails (optional)">
                        <Input type="text" onChange={(e) => this.setRuleProperty('notDivisibleBy', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Odd" help="Value must be odd">
                        <Checkbox checked={this.properties.odd} onChange={(e)=>{this.setRuleProperty('odd', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.properties['odd'] && <Form.Item label="Message - Not Odd" help="Shown when 'Not Odd' validation fails (optional)">
                        <Input type="text" value={this.properties.notOdd} onChange={(e) => this.setRuleProperty('notOdd', e.target.value)}></Input>
                    </Form.Item>}
                    <Form.Item label="Constraint - Even" help="Value must be even">
                        <Checkbox checked={this.properties.even} onChange={(e)=>{this.setRuleProperty('even', e.target.value)}}></Checkbox>
                    </Form.Item>
                    {this.properties['even'] && <Form.Item label="Message - Not Even" help="Shown when 'Not Even' validation fails (optional)">
                        <Input type="text" value={this.properties.notEven} onChange={(e) => this.setRuleProperty('notEven', e.target.value)}></Input>
                    </Form.Item>}
                </div> }
                <Form.Item>
                    <Button style={{float: 'right', marginLeft: '10px'}} type="primary" htmlType="submit" disabled={!this.isRuleValid} onClick={this.applyRule}>{this.isEditing == true ? "Apply" : "Add"}</Button>
                    <Button style={{float: 'right'}} onClick={() => this.cancel()}>Cancel</Button>
                </Form.Item>
            </Form>
         </Card>}
    </div>
    }
}