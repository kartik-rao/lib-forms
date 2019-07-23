var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { observer } from "mobx-react";
import { Form, notification, Button, Input, Card } from "antd";
import { action, observable } from "mobx";
const formItemLayout = {
    labelCol: {
        xs: { span: 12, offset: 4 },
        sm: { span: 8, offset: 4 },
    },
    wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 3,
            offset: 21,
        },
        sm: {
            span: 3,
            offset: 21,
        },
    },
};
let SectionPropertiesEditorView = class SectionPropertiesEditorView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = this.props.store;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({ message: `Section - ${section.name}`,
                        description: "Section properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        section[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    render() {
        let { store } = this.props;
        let { selectedSection: section } = store;
        let { getFieldDecorator } = this.props.form;
        console.log("SPEV.render", store.selectedSection);
        if (!section) {
            return React.createElement(React.Fragment, null);
        }
        return React.createElement(Card, { size: "small", bordered: false },
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                React.createElement(Form.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                    initialValue: section.name,
                    rules: [{ type: 'string' }]
                })(React.createElement(Input, null))),
                React.createElement(Form.Item, { required: true, label: "Title" }, getFieldDecorator('title', {
                    initialValue: section.title,
                    rules: [{ type: 'string' }]
                })(React.createElement(Input, null))),
                React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply"))));
    }
};
__decorate([
    observable
], SectionPropertiesEditorView.prototype, "gutter", void 0);
__decorate([
    action.bound
], SectionPropertiesEditorView.prototype, "handleSubmit", void 0);
SectionPropertiesEditorView = __decorate([
    observer
], SectionPropertiesEditorView);
const WrappedSectionPropertiesEditorView = Form.create({ name: 'SectionPropertiesEditorView' })(SectionPropertiesEditorView);
export default WrappedSectionPropertiesEditorView;
