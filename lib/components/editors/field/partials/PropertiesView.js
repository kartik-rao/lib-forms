import { Button, Empty, Form, notification } from "antd";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { asDecoratedProperty, FieldPropertiesMap } from "./EditableFieldProperties";
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 18 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 21,
        },
        sm: {
            span: 24,
            offset: 21,
        },
    },
};
const PropertiesView = ({ form: { getFieldDecorator, getFieldValue, validateFieldsAndScroll } }) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        updateOptions: function (options) {
            store.selectedField.componentProps["options"] = options;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { selectedField: field } = store;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let merge = { componentProps: {}, fieldOptions: {} };
                    Object.keys(values).forEach((p) => {
                        if (p.indexOf("c_") == 0) {
                            // Component Property
                            merge.componentProps[p.replace("c_", "")] = values[p];
                        }
                        else if (p.indexOf("fo_") == 0) {
                            // Field Option Property
                            merge.fieldOptions[p.replace("fo_", "")] = values[p];
                        }
                        else {
                            merge[p] = values[p];
                        }
                    });
                    console.log("Merge object", merge);
                    console.log("Pre Update Field", toJS(field));
                    field.mergeUpdate(merge);
                    console.log("Updated Field", toJS(field));
                    notification.info({ message: `Field - ${field.label || field.name}`,
                        description: "Field properties applied successfully" });
                }
            });
            return;
        }
    }));
    let fieldPOJO = toJS(store.selectedField);
    let formItems = FieldPropertiesMap[fieldPOJO.inputType];
    return useObserver(() => {
        return store.selectedField && React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
            formItems && formItems.map((item, index) => {
                {
                    return asDecoratedProperty(fieldPOJO, getFieldDecorator, getFieldValue, item, index);
                }
            }),
            !formItems && React.createElement(Empty, { description: React.createElement("span", null, "No editable properties available for this field") }),
            formItems && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    });
};
export default Form.create()(PropertiesView);
