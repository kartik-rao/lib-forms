import { Button, notification, Switch } from "antd";
import Form from "antd/lib/form/Form";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";

const FormContentEditorView =  ({form: {getFieldDecorator, validateFieldsAndScroll}}) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        selectedFormLayout : null,
        handleSubmit : function (e) {
            e.preventDefault();
            e.stopPropagation();
            let {form} = store.formStore;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({message: `Form - ${form.name}`,
                        description:"Form properties applied successfully"});
                    form.layout = values.layout;
                    form.formLayoutOptions = values.formLayoutOptions;
                }
            });
            return;
        }
    }));

    let form = toJS(store.formStore.form);
    let {formLayoutOptions} = form;

    return useObserver(() => {
        return <Form {...formItemLayout} onSubmit={(e) => localStore.handleSubmit(e)} layout={"horizontal"}>
        <Form.Item label="Validation disables paging" help="Allow page navigation when validation failures exist on current page">
            {getFieldDecorator('formLayoutOptions.validationDisablesPaging', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.validationDisablesPaging,
            })(<Switch />)}
        </Form.Item>
        <Form.Item label="Show Page Number" help="Show current/total pages in the form header">
            {getFieldDecorator('formLayoutOptions.showSteps', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSteps,
            })(<Switch />)}
        </Form.Item>
        <Form.Item label="Show Page Title" help="Show the title of each page">
            {getFieldDecorator('formLayoutOptions.showPageTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showPageTitles,
            })(<Switch />)}
        </Form.Item>
        <Form.Item label="Show Section Title" help="Show section title above section content">
            {getFieldDecorator('formLayoutOptions.showSectionTitles', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionTitles,
            })(<Switch />)}
        </Form.Item>
        <Form.Item label="Show Section Border" help="Show borders around a section block">
            {getFieldDecorator('formLayoutOptions.showSectionBorders', {
                valuePropName: 'defaultChecked',
                initialValue: formLayoutOptions.showSectionBorders,
            })(<Switch />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
        </Form.Item>
    </Form>
    });

}

export default Form.create()(FormContentEditorView);
