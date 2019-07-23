var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { AllScreenWidths } from "@kartikrao/lib-forms-core";
import { Button, Form, notification, Select, Divider } from "antd";
import { action, computed, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ItemLayoutView from "./ItemLayoutView";
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
            span: 2,
            offset: 22,
        },
        sm: {
            span: 2,
            offset: 22,
        },
    },
};
let FormLayoutView = class FormLayoutView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.formStore;
            console.log("Submitting");
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    form.layout = this.selectedFormLayout;
                    form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
                    notification.info({ message: `Form - ${form.name}`,
                        description: `Form layout set to "${form.layout}" ` });
                }
            });
            return;
        };
        this.saveItemLayout = (layout) => {
            let { form } = this.props.store.formStore;
            AllScreenWidths.map((w) => {
                layout.labelCol[w] && form.itemLayoutOptions.labelCol.add(w, layout.labelCol[w]);
                layout.wrapperCol[w] && form.itemLayoutOptions.wrapperCol.add(w, layout.wrapperCol[w]);
            });
            form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
            notification.info({ message: `Form - ${form.name}`,
                description: "Field layout updated successfully" });
        };
        this.initialize(props);
    }
    initialize(props) {
        let { form } = props.store.formStore;
        this.selectedFormLayout = form.layout;
        this.selectedLabelAlign = form.formLayoutOptions.labelAlign;
    }
    setProperty(key, e) {
        let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
        this[key] = value;
    }
    get hasFormLayoutChanged() {
        let { form } = this.props.store.formStore;
        return this.selectedFormLayout != form.layout || this.selectedLabelAlign != form.formLayoutOptions.labelAlign;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { form } = this.props.store.formStore;
        return React.createElement("div", null,
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                React.createElement("p", null, "Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),
                React.createElement(Divider, null),
                React.createElement(Form.Item, { label: "Form Layout", help: React.createElement("ul", null,
                        React.createElement("li", null, "Horizontal\uFF1ALabels placed next to controls."),
                        React.createElement("li", null, "Vertical\uFF1ALabels placed above controls (default)."),
                        React.createElement("li", null, "Inline\uFF1AAll controls render in one line.")) }, getFieldDecorator('selectedFormLayout', {
                    initialValue: this.selectedFormLayout,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A Layout is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { this.setProperty('selectedFormLayout', e); } },
                    React.createElement(Select.Option, { key: "horizontal" }, "Horizontal"),
                    React.createElement(Select.Option, { key: "vertical" }, "Vertical"),
                    React.createElement(Select.Option, { key: "inline" }, "Inline")))),
                React.createElement(Form.Item, { label: "Label Alignment", help: "Horizontal position of the labels" }, getFieldDecorator('selectedLabelAlign', {
                    initialValue: this.selectedLabelAlign,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'An alignment is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { this.setProperty('selectedLabelAlign', e); } },
                    React.createElement(Select.Option, { key: "left" }, "Left"),
                    React.createElement(Select.Option, { key: "right" }, "Right")))),
                this.hasFormLayoutChanged && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { size: "small", type: "primary", htmlType: "submit" }, "Save"))),
            React.createElement(Divider, null),
            React.createElement(ItemLayoutView, { onSave: this.saveItemLayout, formLayout: this.selectedFormLayout, itemLayoutOptions: form.itemLayoutOptions }));
    }
};
__decorate([
    observable
], FormLayoutView.prototype, "selectedFormLayout", void 0);
__decorate([
    observable
], FormLayoutView.prototype, "selectedLabelAlign", void 0);
__decorate([
    action
], FormLayoutView.prototype, "initialize", null);
__decorate([
    action
], FormLayoutView.prototype, "setProperty", null);
__decorate([
    action.bound
], FormLayoutView.prototype, "handleSubmit", void 0);
__decorate([
    computed
], FormLayoutView.prototype, "hasFormLayoutChanged", null);
__decorate([
    action
], FormLayoutView.prototype, "saveItemLayout", void 0);
FormLayoutView = __decorate([
    observer
], FormLayoutView);
export { FormLayoutView };
const WrappedIFormLayoutViewProps = Form.create({ name: 'FormLayoutView' })(FormLayoutView);
export default WrappedIFormLayoutViewProps;
