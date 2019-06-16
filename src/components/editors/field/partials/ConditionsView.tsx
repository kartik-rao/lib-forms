import { Button, Card, Empty, Form, Icon, Input, Select, Table } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IPredicate } from "@kartikrao/lib-forms-core";
import { IEditorView } from "../../common/IComponentEditorView";
import {formItemLayout, tailFormItemLayout} from "../../common/FormLayoutCommon";

@observer
export class ConditionsView extends React.Component<IEditorView,any> {
    @observable field: string;
    @observable expression: string;
    @observable value: string;
    @observable operator: string;
    @observable isAdding: boolean;

    constructor(props:IEditorView) {
        super(props);
        this.initialize(props);
    }

    @action initialize(props: IEditorView) {
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
        this.isAdding = false;
    }

    @action
    setField = (e) => {
        this.field = e;
    }

    @action
    setExpression = (e) => {
        this.expression = e;
    }

    @action
    setValue = (e) => {
        this.value = e.target.value;
    }

    @action
    setOperator = (e) => {
        this.operator = e;
    }

    @action
    addPredicate(p: IPredicate) {
        let {editorStore} = this.props.store;
        editorStore.addPredicate(p);
        return;
    }

    @action
    removePredicate(uuid: string) {
        let {editorStore} = this.props.store;
        editorStore.removePredicate(uuid);
    }

    @action cancel() {
        this.isAdding = false;
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
    }

    @action
    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.addPredicate({
            field: this.field,
            condition: this.expression,
            value: this.value,
            operator: this.operator
        });

        this.cancel();
    }

    @action setIsAdding (value: boolean) {
        this.isAdding = value;
    }

    render() {
        let {field, availableConditionSources, availableExpressions, availableOperators, numPredicates} = this.props.store.editorStore;
        let columns : any = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value'},
            { title: 'Operator', dataIndex: 'operator', key: 'operator'},
            { title: 'Action', key: 'action',
                render: (text, record) => (
                  <span>
                    <a href="javascript:;" onClick={(e) => this.removePredicate(record.uuid)}>Delete</a>
                  </span>
                ),
              }
        ]

        return <div>
            <Card title="Conditions" size="small" bodyStyle={{padding:0}} actions={[<Button style={{visibility: numPredicates == 0 ? 'visible' : 'hidden'}} onClick={() => this.setIsAdding(true)}>Add</Button>]}>
                { numPredicates > 0 && <div>
                    <Table size="small" pagination={numPredicates > 5 ? {position: 'bottom'} : false} dataSource={field.condition.predicates || []} columns={columns} rowKey='uuid'/>
                    </div>
                }
                { numPredicates == 0 && <Empty description={
                    <span>No conditional rendering on this field</span>
                    }>
                </Empty>
                }
            </Card>
            {this.isAdding  && <Card size="small" title="Add condition" bodyStyle={{padding: '8px'}} style={{marginTop: '15px'}}>
                <Form layout="horizontal" {...formItemLayout} onSubmit={(e)=> this.handleSubmit(e)}>
                    <Form.Item label="Source field" help="Field the condition will get its source value from" required>
                        <Select showSearch={true} onChange={(e) => this.setField(e)} value={this.field}>
                            { availableConditionSources.map((f)=>{
                                return <Select.Option key={f.id} value={f.id} disabled={field.id == f.id}>{f.name}</Select.Option>
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Expression" help="The expression to evaluate"  required>
                        <Select onChange={(e) => this.setExpression(e)}  value={this.expression}>
                            {
                                availableExpressions.map((e)=> {
                                    return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Value" help="The target value"  required={!this.expression || this.expression.indexOf('hasval') > -1 || !this.field}>
                        <Input type="text" disabled={ !this.expression || this.expression.indexOf('hasval') > -1 || !this.field} onChange={(e) => this.setValue(e)}></Input>
                    </Form.Item>
                    <Form.Item label="Operator" help="Operator to combine conditions">
                        <Select onChange={(e) => this.setOperator(e)} value={this.operator} disabled={numPredicates == 0}>
                            {
                                availableOperators.map((e)=> {
                                    return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button style={{marginRight: '15px'}} icon="plus" htmlType="submit" type="primary" disabled={!this.field || !this.expression}>Add</Button>
                        <Button type="danger" onClick={() => this.cancel()}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Card>}
        </div>
    }
}