import { Button, Card, Drawer, Form, Input, notification, Tabs } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../common/FormLayoutCommon";
const PageEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { selectedPage: page } = store;
            props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    store.pushUndoState(`Page "${page.name}" properties edited`);
                    Object.keys(values).forEach((p) => {
                        page[p] = values[p];
                    });
                    notification.info({ message: `Page - ${page.name}`, description: "Page properties applied successfully" });
                }
            });
            return;
        },
        hasErrors: function () {
            let errors = props.form.getFieldsError();
            let fieldsWithErrors = Object.keys(errors).filter((field) => {
                return !!errors[field];
            });
            return fieldsWithErrors.length > 0;
        }
    }));
    return useObserver(() => {
        return store.showPageEditor && store.selectedPage && React.createElement(Drawer, { title: `Page "${store.selectedPage.name}" (id=${store.selectedPage.id || ''})`, onClose: () => store.setEditable(null), visible: store.showPageEditor, width: 600, closable: !localStore.hasErrors(), maskClosable: !localStore.hasErrors(), style: { overflow: 'auto', paddingBottom: '108px' } }, React.createElement(Tabs, null,
            React.createElement(Tabs.TabPane, { key: "1", tab: "Settings" },
                React.createElement(Card, { size: "small", bordered: false },
                    React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                        React.createElement(Form.Item, { required: true, label: "Name", help: "Choose a name that distinguishes this page from others" }, props.form.getFieldDecorator('name', {
                            initialValue: store.selectedPage.name,
                            rules: [{ type: 'string' }, { required: true, message: 'A name is required' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { required: true, label: "Title", help: "The title of this page, displayed above the page's content" }, props.form.getFieldDecorator('title', {
                            initialValue: store.selectedPage.title,
                            rules: [{ type: 'string' }, { required: true, message: 'A title is required' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, { label: "Subtitle", help: "A subtitle for this page, displayed underneath the title" }, props.form.getFieldDecorator('subtitle', {
                            initialValue: store.selectedPage.subtitle,
                            rules: [{ type: 'string' }]
                        })(React.createElement(Input, null))),
                        React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                            React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: localStore.handleSubmit }, "Apply")))))));
    });
};
export default Form.create()(PageEditorView);
