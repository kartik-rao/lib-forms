var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Input, notification, Select, Switch, DatePicker } from "antd";
import Form from "antd/lib/form/Form";
import { action, toJS } from "mobx";
import * as React from "react";
const formItemLayout = {
    labelCol: {
        xs: { span: 14, offset: 1 },
        sm: { span: 10, offset: 1 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
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
var moment = require('moment-timezone');
const timezones = moment.tz.names().map((name) => {
    return { label: name, value: name };
});
class FormPropertiesEditorView extends React.Component {
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
                    form.desc = values.desc;
                    form.layout = values.layout;
                    form.content = Object.assign({}, form.content, values.content);
                    form.status = Object.assign({}, form.status, values.status);
                }
            });
            return;
        };
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { editorStore } = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;
        return React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            React.createElement(Form.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                initialValue: form.name,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { required: true, label: "Description" }, getFieldDecorator('desc', {
                initialValue: form.desc,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { required: true, label: "Title" }, getFieldDecorator('content.title', {
                initialValue: form.content.title,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Subtitle" }, getFieldDecorator('content.subtitle', {
                initialValue: form.content.subtitle,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Entry Timezone Offset", help: "UTC by default, used to mark entry times" }, getFieldDecorator('status.timezone', {
                initialValue: form.status.timezone || 'UTC',
                rules: [
                    { type: 'string' },
                    { required: true, message: 'A timezone offset is required' }
                ]
            })(React.createElement(Select, null, timezones.map((options, index) => {
                return React.createElement(Select.Option, { key: index, value: options.value }, options.label);
            })))),
            React.createElement(Form.Item, { label: "Paused", help: "Pause this form (will stop collection of entries immediately)" }, getFieldDecorator('status.paused', {
                initialValue: form.status.paused
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Starts", help: "Schedule form activation" }, getFieldDecorator('status.starts', {
                initialValue: form.status.starts,
            })(React.createElement(DatePicker, { showTime: true }))),
            React.createElement(Form.Item, { label: "Ends", help: "Schedule form deactivation" }, getFieldDecorator('status.ends', {
                initialValue: form.status.ends,
            })(React.createElement(DatePicker, { showTime: true }))),
            React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
}
__decorate([
    action.bound
], FormPropertiesEditorView.prototype, "handleSubmit", void 0);
const WrappedFormContentEditorView = Form.create({ name: 'FormContentEditorView' })(FormPropertiesEditorView);
export default WrappedFormContentEditorView;
