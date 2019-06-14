var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Form, Modal, Select, Slider, Table } from "antd";
import { action, computed, observable, set } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ItemLayoutPreview } from "./ItemLayoutPreview";
const dimensionNameMap = {
    xs: 'Extra Small',
    sm: 'Small',
    md: 'Medium',
    lg: 'Large',
    xl: 'Extra Large'
};
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 8,
            offset: 16,
        },
        sm: {
            span: 8,
            offset: 16,
        },
    },
};
let ItemLayoutView = class ItemLayoutView extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (key, value) => {
            set(this, key, value);
        };
        this.setIsAdding = () => {
            this.isAdding = true;
            this.labelOffset = 0;
            this.labelSpan = 8;
            this.wrapperOffset = 2;
            this.wrapperSpan = 14;
            this.dimension = this.availableDimensions[0];
        };
        this.reset = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.labelOffset = null;
            this.labelSpan = null;
            this.wrapperOffset = null;
            this.wrapperSpan = null;
        };
        this.setIsEditing = (record) => {
            this.labelOffset = record.labelOffset;
            this.labelSpan = record.labelSpan;
            this.wrapperOffset = record.wrapperOffset;
            this.wrapperSpan = record.wrapperSpan;
            this.dimension = record.dimension;
            this.isEditing = true;
        };
        this.confirmRemove = (record) => {
            let self = this;
            Modal.confirm({
                title: `Are you sure ?`,
                content: `Clicking OK will remove field layout targeting "${dimensionNameMap[record.dimension]}"`,
                onOk() {
                    self.remove(record);
                },
                onCancel() { },
            });
        };
        this.remove = (record) => {
            let itemLayoutOptions = Object.assign({}, this.props.itemLayoutOptions);
            delete itemLayoutOptions.labelCol[record.dimension];
            delete itemLayoutOptions.wrapperCol[record.dimension];
            this.props.onSave(itemLayoutOptions);
        };
        this.save = () => {
            let { fieldLayout } = this;
            let itemLayoutOptions = { labelCol: {}, wrapperCol: {} };
            itemLayoutOptions.labelCol = Object.assign({}, this.props.itemLayoutOptions.labelCol, fieldLayout.labelCol);
            itemLayoutOptions.wrapperCol = Object.assign({}, this.props.itemLayoutOptions.wrapperCol, fieldLayout.wrapperCol);
            this.isAdding = false;
            this.isEditing = false;
            console.log("Pre Save", itemLayoutOptions);
            this.props.onSave(itemLayoutOptions);
        };
    }
    get fieldLayout() {
        if (!this.dimension) {
            return null;
        }
        let { dimension } = this;
        let fieldLayout = {
            labelCol: {},
            wrapperCol: {}
        };
        fieldLayout.labelCol[dimension] = {
            span: this.labelSpan,
            offset: this.labelOffset
        };
        fieldLayout.wrapperCol[dimension] = {
            span: this.wrapperSpan,
            offset: this.wrapperOffset
        };
        return fieldLayout;
    }
    get currentDimensions() {
        let { labelCol, wrapperCol } = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        Object.keys(labelCol).forEach((d) => {
            dMap[d] = { formLayout: this.props.formLayout, dimension: d, labelSpan: labelCol[d].span, labelOffset: labelCol[d].offset || 0 };
        });
        Object.keys(wrapperCol).forEach((d) => {
            dMap[d]['wrapperSpan'] = wrapperCol[d].span;
            dMap[d]['wrapperOffset'] = wrapperCol[d].offset || 0;
            rows.push(dMap[d]);
        });
        return rows;
    }
    get availableDimensions() {
        let { labelCol } = this.props.itemLayoutOptions;
        let usedDimensions = Object.keys(labelCol);
        let available = ["xs", "sm", "md", "lg", "xl"].filter((d) => {
            return usedDimensions.indexOf(d) < 0;
        });
        return available;
    }
    render() {
        let columns = [{
                title: 'Dimension',
                dataIndex: 'dimension',
                key: 'dimension'
            },
            { title: 'Label', children: [
                    {
                        title: 'Offset',
                        dataIndex: 'labelOffset',
                        key: 'labelOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'labelSpan',
                        key: 'labelSpan',
                    }
                ] },
            {
                title: 'Field',
                children: [
                    {
                        title: 'Offset',
                        dataIndex: 'wrapperOffset',
                        key: 'wrapperOffset',
                    },
                    {
                        title: 'Span',
                        dataIndex: 'wrapperSpan',
                        key: 'wrapperSpan',
                    }
                ]
            },
            {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement(Button, { shape: "circle", type: "default", onClick: (e) => { this.setIsEditing(record); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                    React.createElement(Button, { shape: "circle", type: "danger", onClick: (e) => { this.confirmRemove(record); }, icon: "delete", size: "small" }))),
            }];
        let { getFieldDecorator } = this.props.form;
        let { isAdding, isEditing } = this;
        return React.createElement(Card, { size: "small", bodyStyle: { padding: 0 } },
            React.createElement(Table, { title: () => React.createElement("span", null,
                    "Field Layouts ",
                    React.createElement("small", null, "click (+) to see preview")), size: "small", bordered: false, pagination: false, dataSource: this.currentDimensions, columns: columns, rowKey: 'dimension', expandedRowRender: (record) => React.createElement(ItemLayoutPreview, Object.assign({}, record)), footer: () => { return this.availableDimensions.length > 0 ? React.createElement(Button, { onClick: () => this.setIsAdding() }, "Add") : React.createElement(React.Fragment, null); } }),
            (isAdding || isEditing) && this.availableDimensions.length > 0 && React.createElement(Card, { size: "small", title: this.isAdding ? "Add Field Layout" : "Edit Field Layout", style: { marginTop: '15px' } },
                React.createElement(ItemLayoutPreview, { formLayout: this.props.formLayout, dimension: this.dimension, labelOffset: this.labelOffset, labelSpan: this.labelSpan, wrapperOffset: this.wrapperOffset, wrapperSpan: this.wrapperSpan }),
                React.createElement("p", null, "Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed"),
                React.createElement(Form, Object.assign({}, formItemLayout, { layout: "horizontal" }),
                    React.createElement(Form.Item, { label: "Target Screen Width", help: React.createElement("ul", null,
                            React.createElement("li", null, "Extra Small (below 768px)"),
                            React.createElement("li", null, "Small (768px - 992px)"),
                            React.createElement("li", null, "Medium (992px - 1200px)"),
                            React.createElement("li", null, "Large (1200px - 1440px)"),
                            React.createElement("li", null, "Extra Large (1440px and above)")) }, getFieldDecorator('dimension', {
                        initialValue: this.dimension,
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A dimension' }
                        ]
                    })(React.createElement(Select, { onChange: (e) => { this.onChange('dimension', e); } }, this.availableDimensions.map((d) => {
                        return React.createElement(Select.Option, { key: d }, dimensionNameMap[d]);
                    })))),
                    React.createElement(Form.Item, { label: "Label Offset", help: "Left offset for label" }, getFieldDecorator('labelOffset', {
                        initialValue: this.labelOffset,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.onChange('labelOffset', e); } }))),
                    React.createElement(Form.Item, { label: "Label Width", help: "Label available width" }, getFieldDecorator('labelSpan', {
                        initialValue: this.labelSpan,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.onChange('labelSpan', e); } }))),
                    React.createElement(Form.Item, { label: "Field Offset", help: "Left offset for fields" }, getFieldDecorator('wrapperOffset', {
                        initialValue: this.wrapperOffset,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.onChange('wrapperOffset', e); } }))),
                    React.createElement(Form.Item, { label: "Field width", help: "Field available width" }, getFieldDecorator('wrapperSpan', {
                        initialValue: this.wrapperSpan,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 1, max: 24, onChange: (e) => { this.onChange('wrapperSpan', e); } }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { size: "small", type: "primary", style: { marginRight: '15px' }, onClick: this.save }, "Apply"),
                        React.createElement(Button, { size: "small", type: "danger", style: { marginTop: '15px' }, onClick: this.reset }, "Cancel")))));
    }
};
__decorate([
    observable
], ItemLayoutView.prototype, "isAdding", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "isEditing", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "dimension", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "labelSpan", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "wrapperSpan", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "labelOffset", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "wrapperOffset", void 0);
__decorate([
    computed
], ItemLayoutView.prototype, "fieldLayout", null);
__decorate([
    action.bound
], ItemLayoutView.prototype, "onChange", void 0);
__decorate([
    computed
], ItemLayoutView.prototype, "currentDimensions", null);
__decorate([
    computed
], ItemLayoutView.prototype, "availableDimensions", null);
__decorate([
    action
], ItemLayoutView.prototype, "setIsAdding", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "reset", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "setIsEditing", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "remove", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "save", void 0);
ItemLayoutView = __decorate([
    observer
], ItemLayoutView);
export { ItemLayoutView };
const WrappedIItemLayoutViewProps = Form.create({ name: 'ItemLayoutView' })(ItemLayoutView);
export default WrappedIItemLayoutViewProps;
