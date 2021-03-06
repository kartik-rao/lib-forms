import { Button, Input, notification } from "antd";
import Form from "antd/lib/form/Form";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
// TODO: Convert to dynamic import
import * as moment from 'moment-timezone';
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
const timezones = moment.tz.names().map((name) => {
    return { label: name, value: name };
});
const FormPropertiesEditorView = ({ form: { getFieldDecorator, validateFieldsAndScroll } }) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { form } = store.formStore;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    store.pushUndoState(`Form settings edited`);
                    form.name = values.name;
                    form.description = values.desc;
                    form.content.title = values.content.title;
                    form.content.subtitle = values.content.subtitle;
                    notification.info({ message: `Form - ${form.name}`, description: "Form settings updated" });
                }
            });
            return;
        }
    }));
    let form = store.showFormEditor ? toJS(store.formStore.form) : null;
    return useObserver(() => {
        return form && React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
            React.createElement(Form.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                initialValue: form.name,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { required: true, label: "Description" }, getFieldDecorator('desc', {
                initialValue: form.description,
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
            React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    });
};
export default Form.create()(FormPropertiesEditorView);
