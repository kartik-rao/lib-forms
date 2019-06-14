var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Empty, Form, Icon, Input, Select, Table } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
let ConditionsView = class ConditionsView extends React.Component {
    constructor(props) {
        super(props);
        this.setField = (e) => {
            this.field = e;
        };
        this.setExpression = (e) => {
            this.expression = e;
        };
        this.setValue = (e) => {
            this.value = e.target.value;
        };
        this.setOperator = (e) => {
            this.operator = e;
        };
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.addPredicate({
                field: this.field,
                condition: this.expression,
                value: this.value,
                operator: this.operator
            });
            this.cancel();
        };
        this.initialize(props);
    }
    initialize(props) {
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
        this.isAdding = false;
    }
    addPredicate(p) {
        let { editorStore } = this.props.store;
        editorStore.addPredicate(p);
        return;
    }
    removePredicate(uuid) {
        let { editorStore } = this.props.store;
        editorStore.removePredicate(uuid);
    }
    cancel() {
        this.isAdding = false;
        this.field = null;
        this.expression = null;
        this.value = null;
        this.operator = null;
    }
    setIsAdding(value) {
        this.isAdding = value;
    }
    render() {
        let { field, availableConditionSources, availableExpressions, availableOperators, numPredicates } = this.props.store.editorStore;
        let columns = [
            { title: 'Field', dataIndex: 'field', key: 'field' },
            { title: 'Condition', dataIndex: 'condition', key: 'condition' },
            { title: 'Value', dataIndex: 'value', key: 'value' },
            { title: 'Operator', dataIndex: 'operator', key: 'operator' },
            { title: 'Action', key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement("a", { href: "javascript:;", onClick: (e) => this.removePredicate(record.uuid) }, "Delete"))),
            }
        ];
        return React.createElement("div", null,
            React.createElement(Card, { title: "Conditions", size: "small", bodyStyle: { padding: 0 }, actions: [React.createElement(Icon, { type: "plus", style: { visibility: numPredicates == 0 ? 'visible' : 'hidden' }, onClick: () => this.setIsAdding(true) })] },
                numPredicates > 0 && React.createElement("div", null,
                    React.createElement(Table, { size: "small", pagination: numPredicates > 5 ? { position: 'bottom' } : false, dataSource: field.condition.predicates || [], columns: columns, rowKey: 'uuid' })),
                numPredicates == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No conditional rendering on this field") })),
            this.isAdding && React.createElement(Card, { size: "small", title: "Add condition", bodyStyle: { padding: '8px' }, style: { marginTop: '15px' } },
                React.createElement(Form, Object.assign({ layout: "horizontal" }, formItemLayout, { onSubmit: (e) => this.handleSubmit(e) }),
                    React.createElement(Form.Item, { label: "Source field", help: "Field the condition will get its source value from", required: true },
                        React.createElement(Select, { showSearch: true, onChange: (e) => this.setField(e), value: this.field }, availableConditionSources.map((f) => {
                            return React.createElement(Select.Option, { key: f.id, value: f.id, disabled: field.id == f.id }, f.name);
                        }))),
                    React.createElement(Form.Item, { label: "Expression", help: "The expression to evaluate", required: true },
                        React.createElement(Select, { onChange: (e) => this.setExpression(e), value: this.expression }, availableExpressions.map((e) => {
                            return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                        }))),
                    React.createElement(Form.Item, { label: "Value", help: "The target value", required: !this.expression || this.expression.indexOf('hasval') > -1 || !this.field },
                        React.createElement(Input, { type: "text", disabled: !this.expression || this.expression.indexOf('hasval') > -1 || !this.field, onChange: (e) => this.setValue(e) })),
                    React.createElement(Form.Item, { label: "Operator", help: "Operator to combine conditions" },
                        React.createElement(Select, { onChange: (e) => this.setOperator(e), value: this.operator, disabled: numPredicates == 0 }, availableOperators.map((e) => {
                            return React.createElement(Select.Option, { key: e.value, value: e.value }, e.name);
                        }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { style: { marginRight: '15px' }, size: "small", icon: "plus", htmlType: "submit", type: "primary", disabled: !this.field || !this.expression }, "Add"),
                        React.createElement(Button, { size: "small", type: "danger", onClick: () => this.cancel() }, "Cancel")))));
    }
};
__decorate([
    observable
], ConditionsView.prototype, "field", void 0);
__decorate([
    observable
], ConditionsView.prototype, "expression", void 0);
__decorate([
    observable
], ConditionsView.prototype, "value", void 0);
__decorate([
    observable
], ConditionsView.prototype, "operator", void 0);
__decorate([
    observable
], ConditionsView.prototype, "isAdding", void 0);
__decorate([
    action
], ConditionsView.prototype, "initialize", null);
__decorate([
    action
], ConditionsView.prototype, "setField", void 0);
__decorate([
    action
], ConditionsView.prototype, "setExpression", void 0);
__decorate([
    action
], ConditionsView.prototype, "setValue", void 0);
__decorate([
    action
], ConditionsView.prototype, "setOperator", void 0);
__decorate([
    action
], ConditionsView.prototype, "addPredicate", null);
__decorate([
    action
], ConditionsView.prototype, "removePredicate", null);
__decorate([
    action
], ConditionsView.prototype, "cancel", null);
__decorate([
    action
], ConditionsView.prototype, "handleSubmit", void 0);
__decorate([
    action
], ConditionsView.prototype, "setIsAdding", null);
ConditionsView = __decorate([
    observer
], ConditionsView);
export { ConditionsView };
