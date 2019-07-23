var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Empty, Form, Input, Select, Table, Tag } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
let ConditionsEditorView = class ConditionsEditorView extends React.Component {
    constructor(props) {
        super(props);
        this.setPredicateAttribute = (attr, value) => {
            console.log(`Set ${attr} = "${value}"`);
            this[attr] = value;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.props.form.validateFieldsAndScroll((err, values) => {
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
        };
        this.initialize(props);
    }
    initialize(props) {
        this.reset();
    }
    addPredicate(p) {
        let { store } = this.props;
        store.addPredicate(p);
        return;
    }
    removePredicate(uuid) {
        let { store } = this.props;
        store.removePredicate(uuid);
    }
    editPredicate(uuid) {
        let { store } = this.props;
        let predicate = store.selectedField.condition.predicates.find((p) => {
            return p.uuid == uuid;
        });
        this.uuid = predicate.uuid;
        this.field = predicate.field;
        this.condition = predicate.condition;
        this.value = predicate.value;
        this.operator = predicate.operator;
        this.setIsEditing(true);
    }
    reset() {
        this.isAdding = false;
        this.isEditing = false;
        this.uuid = null;
        this.field = null;
        this.condition = null;
        this.value = null;
        this.operator = null;
    }
    setIsAdding(value) {
        this.isAdding = value;
    }
    setIsEditing(value) {
        this.isEditing = value;
    }
    render() {
        let { selectedField: field, availableConditionSources, availableExpressions, availableOperators, numPredicates } = this.props.store;
        let columns = [
            { title: 'Operator', dataIndex: 'operator', key: 'operator', render: (text, record) => (record.operator ? React.createElement(Tag, null, record.operator) : React.createElement(React.Fragment, null)) },
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Action', key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement(Button, { style: { marginRight: '10px' }, icon: "edit", shape: "circle", size: "small", onClick: (e) => this.editPredicate(record.uuid) }),
                    React.createElement(Button, { icon: "delete", shape: "circle", size: "small", onClick: (e) => this.removePredicate(record.uuid) })))
            }
        ];
        let { getFieldDecorator } = this.props.form;
        return React.createElement("div", null,
            React.createElement(Card, { title: "Conditions", size: "small", bodyStyle: { padding: 0 }, actions: [React.createElement(Button, { size: "small", onClick: () => this.setIsAdding(true) }, "Add")] },
                numPredicates > 0 && React.createElement("div", null,
                    React.createElement(Table, { size: "small", pagination: numPredicates > 5 ? { position: 'bottom' } : false, dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
                numPredicates == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No conditional rendering on this field") })),
            (this.isAdding || this.isEditing) && React.createElement(Card, { size: "small", title: "Add condition", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' } },
                React.createElement(Form, Object.assign({ layout: "horizontal" }, formItemLayout, { onSubmit: (e) => this.handleSubmit(e) }),
                    React.createElement(Form.Item, { label: "Source field", help: "Field the condition is predicated upon", required: true }, getFieldDecorator('field', {
                        initialValue: this.field,
                        rules: [{ type: 'string' }, { required: true }]
                    })(React.createElement(Select, { onChange: (e) => this.setPredicateAttribute('field', e) }, availableConditionSources.map((f) => {
                        return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                    })))),
                    React.createElement(Form.Item, { label: "Condition", help: "The expression to evaluate" }, getFieldDecorator('condition', {
                        initialValue: this.condition,
                        rules: [{ type: 'string' }, { required: true }]
                    })(React.createElement(Select, { onChange: (e) => this.setPredicateAttribute('condition', e) }, availableExpressions.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    React.createElement(Form.Item, { label: "Value", help: "The target value", required: this.condition && this.condition.indexOf('hasval') == -1 }, getFieldDecorator('value', {
                        initialValue: this.value,
                        rules: [{ type: 'string' }, { required: this.condition && this.condition.indexOf('hasval') == -1 }]
                    })(React.createElement(Input, { type: "text", disabled: !this.field || !this.condition || this.condition.indexOf('hasval') > -1, onChange: (e) => this.setPredicateAttribute('value', e.target.value) }))),
                    React.createElement(Form.Item, { label: "Operator", help: "Operator to combine conditions" }, getFieldDecorator('operator', {
                        initialValue: this.operator,
                        rules: [{ type: 'string' }, { required: numPredicates > 0 }]
                    })(React.createElement(Select, { onChange: (e) => this.setPredicateAttribute('operator', e), disabled: numPredicates == 0 }, availableOperators.map((e) => {
                        return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                    })))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { style: { marginRight: '15px' }, size: "small", htmlType: "submit", type: "primary", disabled: !this.field || !this.condition }, "Save"),
                        React.createElement(Button, { type: "danger", size: "small", onClick: () => this.reset() }, "Cancel")))));
    }
};
__decorate([
    observable
], ConditionsEditorView.prototype, "isAdding", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "isEditing", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "uuid", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "field", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "condition", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "value", void 0);
__decorate([
    observable
], ConditionsEditorView.prototype, "operator", void 0);
__decorate([
    action
], ConditionsEditorView.prototype, "initialize", null);
__decorate([
    action
], ConditionsEditorView.prototype, "setPredicateAttribute", void 0);
__decorate([
    action
], ConditionsEditorView.prototype, "addPredicate", null);
__decorate([
    action
], ConditionsEditorView.prototype, "removePredicate", null);
__decorate([
    action
], ConditionsEditorView.prototype, "editPredicate", null);
__decorate([
    action
], ConditionsEditorView.prototype, "reset", null);
__decorate([
    action
], ConditionsEditorView.prototype, "handleSubmit", void 0);
__decorate([
    action
], ConditionsEditorView.prototype, "setIsAdding", null);
__decorate([
    action
], ConditionsEditorView.prototype, "setIsEditing", null);
ConditionsEditorView = __decorate([
    observer
], ConditionsEditorView);
const WrappedConditionsEditorView = Form.create({ name: 'ConditionsEditorView' })(ConditionsEditorView);
export default WrappedConditionsEditorView;
