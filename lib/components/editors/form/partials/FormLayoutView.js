var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Form, notification, Select, Divider } from "antd";
import { action, computed, observable, toJS } from "mobx";
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
            span: 6,
            offset: 18,
        },
        sm: {
            span: 6,
            offset: 18,
        },
    },
};
let FormLayoutView = class FormLayoutView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { form } = this.props.store.editorStore.formStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({ message: `Form - ${form.name}`,
                        description: "Form properties applied successfully" });
                    form.layout = values.layout;
                    form.formLayoutOptions = values.formLayoutOptions;
                }
            });
            return;
        };
        this.saveLayout = (layout) => {
            let { form } = this.props.store.editorStore.formStore;
            form.itemLayoutOptions = layout;
            notification.info({ message: `Form - ${form.name}`,
                description: "Form properties applied successfully" });
            console.log("Post Save", form.itemLayoutOptions);
        };
        this.initialize(props);
    }
    initialize(props) {
        let { form } = props.store.formStore;
        let { itemLayoutOptions, formLayoutOptions } = form;
        this.itemLayoutOptions = itemLayoutOptions ? toJS(itemLayoutOptions) : {};
        this.formLayoutOptions = formLayoutOptions ? toJS(formLayoutOptions) : {};
        this.selectedFormLayout = form.layout;
    }
    setProperty(key, e) {
        let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
        this[key] = value;
    }
    get selectedItemLayout() {
        let { selectedDimension } = this;
        if (selectedDimension) {
            let { itemLayoutOptions } = this;
            let response = {
                formLayout: this.selectedFormLayout,
                dimension: selectedDimension,
                labelOffset: 0,
                labelSpan: 0,
                wrapperOffset: 0,
                wrapperSpan: 0
            };
            let { wrapperCol, labelCol } = itemLayoutOptions;
            response.labelOffset = labelCol[selectedDimension].offset;
            response.labelSpan = labelCol[selectedDimension].span;
            response.wrapperOffset = wrapperCol[selectedDimension].offset;
            response.wrapperSpan = wrapperCol[selectedDimension].span;
            return response;
        }
    }
    get dimensions() {
        if (this.itemLayoutOptions.wrapperCol) {
            return Object.keys(this.itemLayoutOptions.wrapperCol);
        }
        else if (this.itemLayoutOptions.labelCol) {
            return Object.keys(this.itemLayoutOptions.labelCol);
        }
        else {
            return ["xs", "sm", "md", "lg", "xl"];
        }
    }
    get hasFormLayoutChanged() {
        let { form } = this.props.store.editorStore.formStore;
        return this.selectedFormLayout != form.layout;
    }
    render() {
        let { getFieldDecorator } = this.props.form;
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
                this.hasFormLayoutChanged && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { size: "small", type: "primary" }, "Update Form Layout"))),
            React.createElement(Divider, null),
            React.createElement(ItemLayoutView, { onSave: this.saveLayout, formLayout: this.selectedFormLayout, itemLayoutOptions: this.itemLayoutOptions }));
    }
};
__decorate([
    action
], FormLayoutView.prototype, "initialize", null);
__decorate([
    action
], FormLayoutView.prototype, "setProperty", null);
__decorate([
    computed
], FormLayoutView.prototype, "selectedItemLayout", null);
__decorate([
    computed
], FormLayoutView.prototype, "dimensions", null);
__decorate([
    action.bound
], FormLayoutView.prototype, "handleSubmit", void 0);
__decorate([
    observable
], FormLayoutView.prototype, "selectedFormLayout", void 0);
__decorate([
    observable
], FormLayoutView.prototype, "itemLayoutOptions", void 0);
__decorate([
    observable
], FormLayoutView.prototype, "formLayoutOptions", void 0);
__decorate([
    observable
], FormLayoutView.prototype, "selectedDimension", void 0);
__decorate([
    computed
], FormLayoutView.prototype, "hasFormLayoutChanged", null);
__decorate([
    action
], FormLayoutView.prototype, "saveLayout", void 0);
FormLayoutView = __decorate([
    observer
], FormLayoutView);
export { FormLayoutView };
const WrappedIFormLayoutViewProps = Form.create({ name: 'FormLayoutView' })(FormLayoutView);
export default WrappedIFormLayoutViewProps;
