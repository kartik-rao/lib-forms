var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, notification, Switch } from "antd";
import Form from "antd/lib/form/Form";
import { action, observable, set, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
const formItemLayout = {
    labelCol: {
        xs: { span: 8, offset: 10 },
        sm: { span: 8, offset: 10 },
    },
    wrapperCol: {
        xs: { span: 4, offset: 2 },
        sm: { span: 4, offset: 2 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 4,
            offset: 20,
        },
        sm: {
            span: 4,
            offset: 20,
        },
    },
};
let FormContentEditorView = class FormContentEditorView extends React.Component {
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
        this.onChange = (key, value) => {
            set(this, key, value);
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { editorStore } = this.props.store;
        if (!editorStore.formStore.form) {
            return React.createElement(React.Fragment, null);
        }
        let form = toJS(editorStore.formStore.form);
        let { formLayoutOptions, itemLayoutOptions } = form;
        console.log("FCEV", formLayoutOptions);
        return React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            React.createElement(Form.Item, { label: "Validation disables paging" }, getFieldDecorator('formLayoutOptions.validationDisablesPaging', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.validationDisablesPaging,
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Show Page Number" }, getFieldDecorator('formLayoutOptions.showSteps', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSteps,
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Show Page Title" }, getFieldDecorator('formLayoutOptions.showPageTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showPageTitles,
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Show Section Title" }, getFieldDecorator('formLayoutOptions.showSectionTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionTitles,
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Show Section Border" }, getFieldDecorator('formLayoutOptions.showSectionBorders', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionBorders,
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", size: "small", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
__decorate([
    observable
], FormContentEditorView.prototype, "selectedFormLayout", void 0);
__decorate([
    action.bound
], FormContentEditorView.prototype, "handleSubmit", void 0);
__decorate([
    action.bound
], FormContentEditorView.prototype, "onChange", void 0);
FormContentEditorView = __decorate([
    observer
], FormContentEditorView);
const WrappedFormContentEditorView = Form.create({ name: 'FormContentEditorView' })(FormContentEditorView);
export default WrappedFormContentEditorView;
