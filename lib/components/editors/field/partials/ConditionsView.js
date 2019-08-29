import { Button, Card, Empty, Form, Input, Select, Table, Tag } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
const ConditionsEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        isAdding: false,
        isEditing: false,
        uuid: null,
        field: null,
        condition: null,
        value: null,
        operator: null,
        setPredicateAttribute: function (attr, value) {
            console.log(`Set ${attr} = "${value}"`);
            this[attr] = value;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            props.form.validateFieldsAndScroll((err, values) => {
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
        },
        setIsAdding: function (value) {
            this.isAdding = value;
        },
        setIsEditing: function (value) {
            this.isEditing = value;
        },
        addPredicate: function (p) {
            store.addPredicate(p);
            return;
        },
        removePredicate: function (uuid) {
            store.removePredicate(uuid);
        },
        editPredicate: function (uuid) {
            let predicate = store.selectedField.condition.predicates.find((p) => {
                return p.uuid == uuid;
            });
            this.uuid = predicate.uuid;
            this.field = predicate.field;
            this.condition = predicate.condition;
            this.value = predicate.value;
            this.operator = predicate.operator;
            this.setIsEditing(true);
        },
        reset: function () {
            this.isAdding = false;
            this.isEditing = false;
            this.uuid = null;
            this.field = null;
            this.condition = null;
            this.value = null;
            this.operator = null;
        }
    }));
    return useObserver(() => {
        let { selectedField: field, availableConditionSources, availableExpressions, availableOperators, numPredicates } = store;
        let columns = [
            { title: 'Operator', dataIndex: 'operator', key: 'operator', render: (text, record) => (record.operator ? React.createElement(Tag, null, record.operator) : React.createElement(React.Fragment, null)) },
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Action', key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement(Button, { style: { marginRight: '10px' }, icon: "edit", shape: "circle", size: "small", onClick: (e) => localStore.editPredicate(record.uuid) }),
                    React.createElement(Button, { icon: "delete", shape: "circle", size: "small", onClick: (e) => localStore.removePredicate(record.uuid) })))
            }
        ];
        let { getFieldDecorator } = props.form;
        return React.createElement("div", null,
            React.createElement(Card, { title: "Conditions", size: "small", bodyStyle: { padding: 0 }, actions: [React.createElement(Button, { size: "small", onClick: () => localStore.setIsAdding(true) }, "Add")] },
                numPredicates > 0 && React.createElement("div", null,
                    React.createElement(Table, { size: "small", pagination: numPredicates > 5 ? { position: 'bottom' } : false, dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
                numPredicates == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No conditional rendering on this field") })),
            (localStore.isAdding || localStore.isEditing) && React.createElement(Card, { size: "small", title: "Add condition", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' } },
                React.createElement(Form, Object.assign({ layout: "horizontal" }, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e) }),
                    React.createElement(Form.Item, { label: "Source field", help: "Field the condition is predicated upon", required: true }, getFieldDecorator('field', {
                        initialValue: localStore.field,
                        rules: [{ type: 'string' }, { required: true }]
                    })(React.createElement(Select, { onChange: (e) => localStore.setPredicateAttribute('field', e) }, availableConditionSources.map((f) => {
                        return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                    })))),
                    React.createElement(Form.Item, { label: "Condition", help: "The expression to evaluate" }, getFieldDecorator('condition', {
                        initialValue: localStore.condition,
                        rules: [{ type: 'string' }, { required: true }]
                    })(React.createElement(Select, { onChange: (e) => localStore.setPredicateAttribute('condition', e) }, availableExpressions.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    React.createElement(Form.Item, { label: "Value", help: "The target value", required: localStore.condition && localStore.condition.indexOf('hasval') == -1 }, getFieldDecorator('value', {
                        initialValue: localStore.value,
                        rules: [{ type: 'string' }, { required: localStore.condition && localStore.condition.indexOf('hasval') == -1 }]
                    })(React.createElement(Input, { type: "text", disabled: !localStore.field || !localStore.condition || localStore.condition.indexOf('hasval') > -1, onChange: (e) => localStore.setPredicateAttribute('value', e.target.value) }))),
                    React.createElement(Form.Item, { label: "Operator", help: "Operator to combine conditions" }, getFieldDecorator('operator', {
                        initialValue: localStore.operator,
                        rules: [{ type: 'string' }, { required: numPredicates > 0 }]
                    })(React.createElement(Select, { onChange: (e) => localStore.setPredicateAttribute('operator', e), disabled: numPredicates == 0 }, availableOperators.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { style: { marginRight: '15px' }, size: "small", htmlType: "submit", type: "primary", disabled: !localStore.field || !localStore.condition }, "Save"),
                        React.createElement(Button, { type: "danger", size: "small", onClick: () => localStore.reset() }, "Cancel")))));
    });
};
export default Form.create()(ConditionsEditorView);
// export interface IConditionsEditorViewProps extends FormComponentProps, IEditorView {
// }
// @observer
// class ConditionsEditorViewOld extends React.Component<IConditionsEditorViewProps,any> {
//     @observable isAdding: boolean;
//     @observable isEditing: boolean;
//     @observable uuid: string;
//     @observable field: string;
//     @observable condition: string;
//     @observable value: string;
//     @observable operator: string;
//     constructor(props:IConditionsEditorViewProps) {
//         super(props);
//         this.initialize(props);
//     }
//     @action initialize(props: IConditionsEditorViewProps) {
//         this.reset();
//     }
//     @action setPredicateAttribute = (attr: "field"|"condition"|"operator"|"value", value) => {
//         console.log(`Set ${attr} = "${value}"`);
//         this[attr] = value;
//     }
//     @action
//     addPredicate(p: IPredicate) {
//         let {store} = this.props;
//         store.addPredicate(p);
//         return;
//     }
//     @action
//     removePredicate(uuid: string) {
//         let {store} = this.props;
//         store.removePredicate(uuid);
//     }
//     @action
//     editPredicate(uuid: string) {
//         let {store} = this.props;
//         let predicate = store.selectedField.condition.predicates.find((p:Predicate) => {
//             return p.uuid == uuid;
//         });
//         this.uuid = predicate.uuid;
//         this.field = predicate.field;
//         this.condition = predicate.condition;
//         this.value = predicate.value;
//         this.operator = predicate.operator;
//         this.setIsEditing(true);
//     }
//     @action reset() {
//         this.isAdding = false;
//         this.isEditing = false;
//         this.uuid =  null;
//         this.field = null;
//         this.condition = null;
//         this.value = null;
//         this.operator = null;
//     }
//     @action
//     handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 if(this.isEditing) {
//                     let {store} = this.props;
//                     let predicate = store.selectedField.condition.predicates.find((p:Predicate) => {
//                         return p.uuid == this.uuid;
//                     });
//                     predicate.field = this.field;
//                     predicate.condition = this.condition;
//                     predicate.operator = this.operator;
//                     predicate.value = this.value;
//                 } else {
//                     this.addPredicate({
//                         field: this.field,
//                         condition: this.condition,
//                         operator: this.operator,
//                         value: this.value
//                     });
//                 }
//                 this.reset();
//             }
//         });
//     }
//     @action setIsAdding (value: boolean) {
//         this.isAdding = value;
//     }
//     @action setIsEditing(value: boolean) {
//         this.isEditing = value;
//     }
//     render() {
//         let {selectedField: field, availableConditionSources, availableExpressions, availableOperators, numPredicates} = this.props.store;
//         let columns : any = [
//             { title: 'Operator', dataIndex: 'operator', key: 'operator', render: (text, record) => (
//                 record.operator ? <Tag>{record.operator}</Tag> : <></>
//             )},
//             { title: 'Field', dataIndex: 'field', key: 'field' },
//             { title: 'Condition', dataIndex: 'condition', key: 'condition' },
//             { title: 'Value', dataIndex: 'value', key: 'value'},
//             { title: 'Action', key: 'action',
//                 render: (text, record) => (
//                   <span>
//                       <Button style={{marginRight: '10px'}} icon="edit" shape="circle" size="small" onClick={(e) => this.editPredicate(record.uuid)}></Button>
//                       <Button icon="delete" shape="circle" size="small" onClick={(e) => this.removePredicate(record.uuid)}></Button>
//                   </span>
//                 )
//             }
//         ]
//         let {getFieldDecorator} = this.props.form;
//         return <div>
//             <Card title="Conditions" size="small" bodyStyle={{padding:0}} actions={[<Button size="small" onClick={() => this.setIsAdding(true)}>Add</Button>]}>
//                 { numPredicates > 0 && <div>
//                     <Table size="small" pagination={numPredicates > 5 ? {position: 'bottom'} : false}
//                         dataSource={field.condition.predicates || []} columns={columns} rowKey='uuid'/>
//                     </div>
//                 }
//                 { numPredicates == 0 && <Empty description={
//                     <span>No conditional rendering on this field</span>
//                     }>
//                 </Empty>
//                 }
//             </Card>
//             {(this.isAdding || this.isEditing) && <Card size="small" title="Add condition" bodyStyle={{padding: '8px'}} style={{marginTop: '15px'}}>
//                 <Form layout="horizontal" {...formItemLayout} onSubmit={(e)=> this.handleSubmit(e)}>
//                     <Form.Item label="Source field" help="Field the condition is predicated upon" required>
//                         {
//                             getFieldDecorator('field', {
//                                 initialValue: this.field,
//                                 rules: [{type: 'string'}, {required: true}]
//                             })(<Select onChange={(e) => this.setPredicateAttribute('field', e)}>
//                                 { availableConditionSources.map((f)=>{
//                                     return <Select.Option key={f.id} value={f.id} disabled={field.id == f.id}>{f.name}</Select.Option>
//                                 })}
//                             </Select>)
//                         }
//                     </Form.Item>
//                     <Form.Item label="Condition" help="The expression to evaluate">
//                         {
//                             getFieldDecorator('condition', {
//                                 initialValue: this.condition,
//                                 rules: [{type: 'string'}, {required: true}]
//                             })(<Select onChange={(e) => this.setPredicateAttribute('condition', e)}>
//                                 {
//                                     availableExpressions.map((e)=> {
//                                         return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
//                                     })
//                                 }
//                             </Select>)
//                         }
//                     </Form.Item>
//                     <Form.Item label="Value" help="The target value" required={this.condition && this.condition.indexOf('hasval') == -1}>
//                         {
//                             getFieldDecorator('value', {
//                                 initialValue: this.value,
//                                 rules: [{type: 'string'}, {required: this.condition && this.condition.indexOf('hasval') == -1}]
//                             })(<Input type="text"
//                                 disabled={ !this.field || !this.condition || this.condition.indexOf('hasval') > -1}
//                                 onChange={(e) => this.setPredicateAttribute('value', e.target.value)}/>)
//                         }
//                     </Form.Item>
//                     <Form.Item label="Operator" help="Operator to combine conditions">
//                         {
//                             getFieldDecorator('operator', {
//                                 initialValue: this.operator,
//                                 rules: [{type: 'string'}, {required: numPredicates > 0}]
//                             })(<Select onChange={(e) => this.setPredicateAttribute('operator', e)} disabled={numPredicates == 0}>
//                                 {
//                                     availableOperators.map((e)=> {
//                                         return <Select.Option key={e.value} value={e.value}>{e.name}</Select.Option>
//                                     })
//                                 }
//                             </Select>)
//                         }
//                     </Form.Item>
//                     <Form.Item {...tailFormItemLayout}>
//                         <Button style={{marginRight: '15px'}} size="small" htmlType="submit" type="primary" disabled={!this.field || !this.condition}>Save</Button>
//                         <Button type="danger" size="small" onClick={() => this.reset()}>Cancel</Button>
//                     </Form.Item>
//                 </Form>
//             </Card>}
//         </div>
//     }
// }
// const WrappedConditionsEditorView = Form.create<IConditionsEditorViewProps>({ name: 'ConditionsEditorView' })(ConditionsEditorView);
// export default WrappedConditionsEditorView;
