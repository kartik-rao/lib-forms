var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ItemLayoutOptions } from "@kartikrao/lib-forms-core";
import { Button, Card, Form, Modal, Select, Slider, Table } from "antd";
import { action, computed, observable } from "mobx";
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
let defaultDimensions = {
    'vertical': { offset: 0, span: 12 },
    'horizontal': { offset: 0, span: 10 }
};
let ItemLayoutView = class ItemLayoutView extends React.Component {
    constructor(props) {
        super(props);
        this.setDimension = (dimension) => {
            this.selectedDimension = dimension;
        };
        this.setLayoutProperty = (key, value) => {
            let target;
            let { selectedDimension } = this;
            if (key.indexOf('wrapper') > -1) {
                target = this.itemLayout.wrapperCol[selectedDimension];
            }
            else {
                target = this.itemLayout.labelCol[selectedDimension];
            }
            if (key.indexOf('Span') > -1) {
                target.span = value;
            }
            else {
                target.offset = value;
            }
            return;
        };
        this.setIsAdding = () => {
            let dimension = this.availableDimensions[0];
            // Initialize defaults for this dimension
            this.itemLayout.wrapperCol.add(dimension, { offset: 0, span: 12 });
            this.itemLayout.labelCol.add(dimension, { offset: 0, span: 12 });
            this.selectedDimension = dimension;
            // Now the layout editor form should render
            this.isAdding = true;
        };
        this.reset = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.itemLayout = new ItemLayoutOptions({});
            this.selectedDimension = null;
        };
        this.setIsEditing = (record) => {
            this.selectedDimension = record.dimension;
            this.itemLayout.wrapperCol.add(record.dimension, this.props.itemLayoutOptions.wrapperCol[record.dimension]);
            this.itemLayout.labelCol.add(record.dimension, this.props.itemLayoutOptions.labelCol[record.dimension]);
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
            let { itemLayoutOptions } = this.props;
            itemLayoutOptions.labelCol[record.dimension] = null;
            itemLayoutOptions.wrapperCol[record.dimension] = null;
            this.props.onSave(itemLayoutOptions);
        };
        this.save = () => {
            this.isAdding = false;
            this.isEditing = false;
            this.props.onSave(this.itemLayout);
            this.reset();
        };
        this.initialize(props);
    }
    initialize({ itemLayoutOptions }) {
        this.itemLayout = new ItemLayoutOptions({});
    }
    get asRows() {
        let { labelCol, wrapperCol } = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        wrapperCol.used.forEach((d) => {
            dMap[d] = {
                formLayout: this.props.formLayout,
                dimension: d,
                labelSpan: labelCol[d].span,
                labelOffset: labelCol[d].offset || 0,
                wrapperOffset: wrapperCol[d].offset || 0,
                wrapperSpan: wrapperCol[d].span,
            };
            rows.push(dMap[d]);
        });
        return rows;
    }
    get availableDimensions() {
        let { wrapperCol } = this.props.itemLayoutOptions;
        return wrapperCol.unused;
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
        let { labelCol, wrapperCol } = this.itemLayout;
        return React.createElement(Card, { size: "small", bodyStyle: { padding: 0 } },
            React.createElement(Table, { title: () => React.createElement("span", null,
                    "Field Layouts ",
                    React.createElement("small", null, "click (+) to see preview")), size: "small", bordered: false, pagination: false, dataSource: this.asRows, columns: columns, defaultExpandAllRows: false, rowKey: 'dimension', expandedRowRender: (record) => React.createElement(ItemLayoutPreview, { formLayout: this.props.formLayout, dimension: record.dimension, itemLayoutOptions: this.props.itemLayoutOptions }), footer: () => { return this.availableDimensions.length > 0 ? React.createElement(Button, { onClick: () => this.setIsAdding() }, "Add") : React.createElement(React.Fragment, null); } }),
            (isAdding || isEditing) && this.selectedDimension && React.createElement(Card, { size: "small", title: this.isAdding ? "Add Field Layout" : `Edit Field Layout - ${this.selectedDimension}`, style: { marginTop: '15px' } },
                React.createElement(ItemLayoutPreview, { formLayout: this.props.formLayout, itemLayoutOptions: this.itemLayout, dimension: this.selectedDimension }),
                React.createElement("p", null, "Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed"),
                React.createElement(Form, Object.assign({}, formItemLayout, { layout: "horizontal" }),
                    React.createElement(Form.Item, { label: "Target Screen Width", help: React.createElement("ul", null,
                            React.createElement("li", null, "Extra Small (below 768px)"),
                            React.createElement("li", null, "Small (768px - 992px)"),
                            React.createElement("li", null, "Medium (992px - 1200px)"),
                            React.createElement("li", null, "Large (1200px - 1440px)"),
                            React.createElement("li", null, "Extra Large (1440px and above)")) }, getFieldDecorator('dimension', {
                        initialValue: this.selectedDimension,
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A dimension' }
                        ]
                    })(React.createElement(Select, { onChange: (e) => { this.setDimension(e); } }, this.availableDimensions.map((d) => {
                        return React.createElement(Select.Option, { key: d }, dimensionNameMap[d]);
                    })))),
                    React.createElement(Form.Item, { label: "Label Offset", help: "Left offset for label" }, getFieldDecorator('labelOffset', {
                        initialValue: labelCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelOffset', e); } }))),
                    React.createElement(Form.Item, { label: "Label Width", help: "Label available width" }, getFieldDecorator('labelSpan', {
                        initialValue: labelCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('labelSpan', e); } }))),
                    React.createElement(Form.Item, { label: "Field Offset", help: "Left offset for fields" }, getFieldDecorator('wrapperOffset', {
                        initialValue: wrapperCol[this.selectedDimension].offset || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 0, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperOffset', e); } }))),
                    React.createElement(Form.Item, { label: "Field width", help: "Field available width" }, getFieldDecorator('wrapperSpan', {
                        initialValue: wrapperCol[this.selectedDimension].span || 0,
                        rules: [
                            { type: 'number' }
                        ]
                    })(React.createElement(Slider, { step: 1, min: 1, max: 24, onChange: (e) => { this.setLayoutProperty('wrapperSpan', e); } }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { size: "small", type: "primary", style: { marginRight: '15px' }, onClick: this.save }, "Save"),
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
], ItemLayoutView.prototype, "selectedDimension", void 0);
__decorate([
    observable
], ItemLayoutView.prototype, "itemLayout", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "setDimension", void 0);
__decorate([
    action.bound
], ItemLayoutView.prototype, "setLayoutProperty", void 0);
__decorate([
    action
], ItemLayoutView.prototype, "initialize", null);
__decorate([
    computed
], ItemLayoutView.prototype, "asRows", null);
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
