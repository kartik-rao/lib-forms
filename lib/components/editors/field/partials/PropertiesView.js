var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Empty, Form, notification } from "antd";
import { action, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { asDecoratedProperty, FieldPropertiesMap } from "./EditableFieldProperties";
import { ChoiceOptionEditorView } from "./ChoiceOptionEditorView";
let PropertiesView = class PropertiesView extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = (e) => {
            e.preventDefault();
            e.stopPropagation();
            let { field } = this.props.store.editorStore;
            this.props.form.validateFieldsAndScroll((err, values) => {
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
        };
    }
    updateOptions(options) {
        this.props.store.editorStore.field.componentProps["options"] = options;
    }
    render() {
        let field = toJS(this.props.store.editorStore.field);
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
        let { getFieldDecorator, getFieldValue } = this.props.form;
        let formItems = FieldPropertiesMap[field.inputType];
        return React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => this.handleSubmit(e), layout: "horizontal" }),
            formItems && formItems.map((item, index) => {
                {
                    return asDecoratedProperty(field, getFieldDecorator, getFieldValue, item, index);
                }
            }),
            !formItems && React.createElement(Empty, { description: React.createElement("span", null, "No editable properties available for this field") }),
            (field.inputType == 'select' || field.inputType == 'checkboxgroup' || field.inputType == 'radiogroup') &&
                React.createElement(ChoiceOptionEditorView, { type: "select", items: field.componentProps['options'], onChange: this.updateOptions }),
            formItems && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    }
};
__decorate([
    action.bound
], PropertiesView.prototype, "updateOptions", null);
PropertiesView = __decorate([
    observer
], PropertiesView);
const WrappedPropertiesView = Form.create({ name: 'PropertiesView' })(PropertiesView);
export default WrappedPropertiesView;
