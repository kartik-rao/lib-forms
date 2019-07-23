var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Card, Tabs } from "antd";
import { action, computed } from "mobx";
import { formItemLayout, tailFormItemLayout } from "../common/FormLayoutCommon";
let PageEditorView = class PageEditorView extends React.Component {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedPage: page } = this.props.store;
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
    get hasErrors() {
        let errors = this.props.form.getFieldsError();
        let fieldsWithErrors = Object.keys(errors).filter((field) => {
            return !!errors[field];
        });
        return fieldsWithErrors.length > 0;
    }
    render() {
        let { store } = this.props;
        let { selectedPage: page } = store;
        let { getFieldDecorator } = this.props.form;
        return page && React.createElement(Drawer, { title: `Page "${page.name}" (id=${page.id || ''})`, onClose: () => store.setEditable(null), visible: store.showPageEditor, width: 600, closable: !this.hasErrors, maskClosable: !this.hasErrors, style: { overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' } }, React.createElement(Tabs, null,
            React.createElement(Tabs.TabPane, { key: "1", tab: "Settings" },
                React.createElement(Card, { size: "small", bordered: false },
                    React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
                        React.createElement(Form.Item, { required: true, label: "Name", help: "Choose a name that distinguishes this page from others" }, getFieldDecorator('name', {
                            initialValue: page.name,
                            rules: [{ type: 'string' }, { required: true, message: 'A name is required' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { required: true, label: "Title", help: "The title of this page, displayed above the page's content" }, getFieldDecorator('title', {
                            initialValue: page.title,
                            rules: [{ type: 'string' }, { required: true, message: 'A title is required' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { label: "Subtitle", help: "A subtitle for this page, displayed underneath the title" }, getFieldDecorator('subtitle', {
                            initialValue: page.subtitle,
                            rules: [{ type: 'string' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                            React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: this.handleSubmit }, "Apply")))))));
    }
};
__decorate([
    action.bound
], PageEditorView.prototype, "handleSubmit", void 0);
__decorate([
    computed
], PageEditorView.prototype, "hasErrors", null);
PageEditorView = __decorate([
    observer
], PageEditorView);
const WrappedPageEditorView = Form.create({ name: 'PageEditorView' })(PageEditorView);
export default WrappedPageEditorView;
