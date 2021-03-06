import { AllScreenWidths, LayoutOption } from "@kartikrao/lib-forms-core";
import { Button, Divider, Form, notification, Select } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import ItemLayoutView from "./ItemLayoutView";
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 2,
            offset: 22,
        },
        sm: {
            span: 2,
            offset: 22,
        },
    },
};
const FormContentEditorView = ({ form: { getFieldDecorator, getFieldValue, validateFieldsAndScroll } }) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        selectedFormLayout: store.formStore.form.layout,
        selectedLabelAlign: store.formStore.form.formLayoutOptions.labelAlign,
        setProperty: function (key, e) {
            let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
            this[key] = value;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { form } = store.formStore;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    store.pushUndoState(`Form layout edited`);
                    form.layout = this.selectedFormLayout;
                    form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
                    notification.info({ message: `Form - ${form.name}`,
                        description: `Form layout set to "${form.layout}" ` });
                }
            });
            return;
        },
        get hasFormLayoutChanged() {
            let { form } = store.formStore;
            return this.selectedFormLayout != form.layout || this.selectedLabelAlign != form.formLayoutOptions.labelAlign;
        },
        saveItemLayout: function (layout) {
            let { form } = store.formStore;
            AllScreenWidths.map((w) => {
                if (layout.labelCol[w]) {
                    if (!form.itemLayoutOptions.labelCol) {
                        form.itemLayoutOptions.labelCol = new LayoutOption();
                    }
                    form.itemLayoutOptions.labelCol.add(w, layout.labelCol[w]);
                }
                ;
                if (layout.wrapperCol[w]) {
                    if (!form.itemLayoutOptions.wrapperCol) {
                        form.itemLayoutOptions.wrapperCol = new LayoutOption();
                    }
                    form.itemLayoutOptions.wrapperCol.add(w, layout.wrapperCol[w]);
                }
            });
            form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
            notification.info({ message: `Form - ${form.name}`,
                description: "Field layout updated successfully" });
        }
    }));
    return useObserver(() => {
        return React.createElement("div", null,
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                React.createElement("p", null, "Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),
                React.createElement(Divider, null),
                React.createElement(Form.Item, { label: "Form Layout", help: React.createElement("ul", null,
                        React.createElement("li", null, "Horizontal\uFF1ALabels placed next to controls."),
                        React.createElement("li", null, "Vertical\uFF1ALabels placed above controls (default)."),
                        React.createElement("li", null, "Inline\uFF1AAll controls render in one line.")) }, getFieldDecorator('selectedFormLayout', {
                    initialValue: localStore.selectedFormLayout,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A Layout is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { localStore.setProperty('selectedFormLayout', e); } },
                    React.createElement(Select.Option, { key: "horizontal" }, "Horizontal"),
                    React.createElement(Select.Option, { key: "vertical" }, "Vertical"),
                    React.createElement(Select.Option, { key: "inline" }, "Inline")))),
                React.createElement(Form.Item, { label: "Label Alignment", help: "Horizontal position of the labels" }, getFieldDecorator('selectedLabelAlign', {
                    initialValue: localStore.selectedLabelAlign,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'An alignment is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { localStore.setProperty('selectedLabelAlign', e); } },
                    React.createElement(Select.Option, { key: "left" }, "Left"),
                    React.createElement(Select.Option, { key: "right" }, "Right")))),
                localStore.hasFormLayoutChanged && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { size: "small", type: "primary", htmlType: "submit" }, "Save"))),
            React.createElement(Divider, null),
            React.createElement(ItemLayoutView, { onSave: localStore.saveItemLayout, formLayout: localStore.selectedFormLayout, itemLayoutOptions: store.formStore.form.itemLayoutOptions }));
    });
};
export default Form.create()(FormContentEditorView);
