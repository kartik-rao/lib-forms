import { Button, Card, Form, Input, notification } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
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
export const SectionPropertiesEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        gutter: null,
        handleSubmit: (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { selectedSection: section } = store;
            props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({ message: `Section - ${section.name}`,
                        description: "Section properties applied successfully" });
                    Object.keys(values).forEach((p) => {
                        section[p] = values[p];
                    });
                }
            });
            return;
        }
    }));
    return useObserver(() => {
        return store.selectedSection ? React.createElement(Card, { size: "small", bordered: false },
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                React.createElement(Form.Item, { required: true, label: "Name" }, props.form.getFieldDecorator('name', {
                    initialValue: store.selectedSection.name,
                    rules: [{ type: 'string' }]
                })(React.createElement(Input, null))),
                React.createElement(Form.Item, { required: true, label: "Title" }, props.form.getFieldDecorator('title', {
                    initialValue: store.selectedSection.title,
                    rules: [{ type: 'string' }]
                })(React.createElement(Input, null))),
                React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' }, onClick: localStore.handleSubmit }, "Apply")))) : React.createElement(React.Fragment, null);
    });
};
export default Form.create()(SectionPropertiesEditorView);
