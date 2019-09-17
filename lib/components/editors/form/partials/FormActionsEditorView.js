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
const FormActionsEditorView = ({ form: { getFieldDecorator, validateFieldsAndScroll } }) => {
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
                    store.pushUndoState(`Form actions edited`);
                    form.errorRedirect = values.errorRedirect;
                    form.successRedirect = values.successRedirect;
                    form.submitErrorMessage = values.submitErrorMessage;
                    form.submitSuccessMessage = values.submitSuccessMessage;
                    notification.info({ message: `Form - ${form.name}`, description: "Form actions saved" });
                }
            });
            return;
        }
    }));
    let form = store.showFormEditor ? toJS(store.formStore.form) : null;
    return useObserver(() => {
        return form && React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
            React.createElement(Form.Item, { label: "Success Redirect URL", help: "Users will be redirected here on successful submission." }, getFieldDecorator('successRedirect', {
                initialValue: store.formStore.form.successRedirect,
                rules: [{ pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/gm }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Error Redirect URL (Optional)", help: "Users will be redirected here on submission failure." }, getFieldDecorator('errorRedirect', {
                initialValue: store.formStore.form.errorRedirect,
                rules: [{ pattern: /^(https?):\/\/[^\s$.?#].[^\s]*$/gm }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Success Message", help: "Shown on successful submissions (if no redirect)" }, getFieldDecorator('submitSuccessMessage', {
                initialValue: store.formStore.form.submitSuccessMessage,
            })(React.createElement(Input.TextArea, null))),
            React.createElement(Form.Item, { label: "Error Message", help: "Shown on submission failure (if no redirect)" }, getFieldDecorator('submitErrorMessage', {
                initialValue: store.formStore.form.submitErrorMessage
            })(React.createElement(Input.TextArea, null))),
            React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    });
};
export default Form.create()(FormActionsEditorView);
