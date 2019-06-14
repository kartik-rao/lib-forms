var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Row, Col, Card } from "antd";
import { action } from "mobx";
let PageEditorView = class PageEditorView extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { page } = this.props.store.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({ message: `Page - ${page.name}`,
                        description: "Page properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        page[p] = values[p];
                    });
                }
            });
            return;
        };
    }
    render() {
        let { editorStore } = this.props.store;
        let { page } = editorStore;
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
                    span: 4,
                    offset: 20,
                },
                sm: {
                    span: 4,
                    offset: 20,
                },
            },
        };
        let { getFieldDecorator } = this.props.form;
        return page && React.createElement(Drawer, { title: `Page "${page.name}" (id=${page.id || ''})`, onClose: () => editorStore.setEditable(null), visible: editorStore.showPageEditor, width: 500, style: { overflow: 'hidden' } }, React.createElement(Card, { size: "small", bordered: false },
            React.createElement(Row, null,
                React.createElement(Col, { span: 24 },
                    React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                        React.createElement(Form.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                            initialValue: page.name,
                            rules: [{ type: 'string' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { required: true, label: "Title" }, getFieldDecorator('title', {
                            initialValue: page.title,
                            rules: [{ type: 'string' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { label: "Subtitle" }, getFieldDecorator('subtitle', {
                            initialValue: page.subtitle,
                            rules: [{ type: 'string' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                            React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")))))));
    }
};
__decorate([
    action.bound
], PageEditorView.prototype, "handleSubmit", void 0);
PageEditorView = __decorate([
    observer
], PageEditorView);
const WrappedPageEditorView = Form.create({ name: 'PageEditorView' })(PageEditorView);
export default WrappedPageEditorView;
