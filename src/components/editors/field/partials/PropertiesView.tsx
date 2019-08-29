import { ChoiceOption, IFieldProps } from "@kartikrao/lib-forms-core";
import { Button, Empty, Form, notification } from "antd";
import { toJS } from "mobx";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { asDecoratedProperty, FieldPropertiesMap } from "./EditableFieldProperties";
import { FormComponentProps } from "antd/lib/form";

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 10},
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

const PropertiesView : React.FC<FormComponentProps> = ({form: {getFieldDecorator, getFieldValue, validateFieldsAndScroll}}) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        updateOptions : function (options: ChoiceOption[]) {
            store.selectedField.componentProps["options"] = options;
        },
        handleSubmit : function (e) {
            e.preventDefault();
            e.stopPropagation();
            let {selectedField: field} = store;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let merge = {componentProps: {}, fieldOptions: {}};
                    Object.keys(values).forEach((p: string) => {
                        if(p.indexOf("c_") == 0) {
                            // Component Property
                            merge.componentProps[p.replace("c_","")] = values[p];
                        } else if (p.indexOf("fo_") == 0){
                            // Field Option Property
                            merge.fieldOptions[p.replace("fo_", "")] = values[p];
                        } else {
                            merge[p] = values[p];
                        }
                    });
                    console.log("Merge object", merge);
                    console.log("Pre Update Field", toJS(field));
                    field.mergeUpdate(merge);
                    console.log("Updated Field", toJS(field));
                    notification.info({message: `Field - ${field.label||field.name}`,
                        description:"Field properties applied successfully"});
                }
            });
            return;
        }
    }));

    let fieldPOJO = toJS(store.selectedField) as IFieldProps;
    let formItems = FieldPropertiesMap[fieldPOJO.inputType];

    return useObserver(() => {
        return store.selectedField && <Form {...formItemLayout} onSubmit={(e) => localStore.handleSubmit(e)} layout={"horizontal"}>
                {formItems && formItems.map((item, index) => {
                    {return asDecoratedProperty(fieldPOJO, getFieldDecorator, getFieldValue, item, index)}
                })}
                {!formItems && <Empty description={
                    <span>No editable properties available for this field</span>
                }>
                </Empty>}
                {formItems && <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
                </Form.Item>}
        </Form>
    });
}

export default Form.create()(PropertiesView);

// export interface IPropertiesViewProps extends FormComponentProps, IEditorView {

// }


// @observer
// class PropertiesViewOld extends React.Component<IPropertiesViewProps, any> {
//     constructor(props: IPropertiesViewProps) {
//         super(props);
//     }

//     handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         let {selectedField: field} = this.props.store;
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 let merge = {componentProps: {}, fieldOptions: {}};
//                 Object.keys(values).forEach((p: string) => {
//                     if(p.indexOf("c_") == 0) {
//                         // Component Property
//                         merge.componentProps[p.replace("c_","")] = values[p];
//                     } else if (p.indexOf("fo_") == 0){
//                         // Field Option Property
//                         merge.fieldOptions[p.replace("fo_", "")] = values[p];
//                     } else {
//                         merge[p] = values[p];
//                     }
//                 });
//                 console.log("Merge object", merge);
//                 console.log("Pre Update Field", toJS(field));
//                 field.mergeUpdate(merge);
//                 console.log("Updated Field", toJS(field));
//                 notification.info({message: `Field - ${field.label||field.name}`,
//                     description:"Field properties applied successfully"});
//             }
//         });
//         return;
//     }

//     @action.bound updateOptions(options: ChoiceOption[]) {
//         this.props.store.selectedField.componentProps["options"] = options;
//     }

//     render() {
//         let field = toJS(this.props.store.selectedField) as IFieldProps;

//         const formItemLayout = {
//             labelCol: {
//               xs: { span: 24 },
//               sm: { span: 10},
//             },
//             wrapperCol: {
//               xs: { span: 18 },
//               sm: { span: 14 },
//             },
//         };

//         const tailFormItemLayout = {
//             wrapperCol: {
//               xs: {
//                 span: 24,
//                 offset: 21,
//               },
//               sm: {
//                 span: 24,
//                 offset: 21,
//               },
//             },
//         };
//         let {getFieldDecorator, getFieldValue} = this.props.form;
//         let formItems = FieldPropertiesMap[field.inputType];
//         return  <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
//             {formItems && formItems.map((item, index) => {
//                 {return asDecoratedProperty(field, getFieldDecorator, getFieldValue, item, index)}
//             })}
//             {!formItems && <Empty description={
//                     <span>No editable properties available for this field</span>
//                     }>
//             </Empty>}
//             {formItems && <Form.Item {...tailFormItemLayout}>
//                 <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
//             </Form.Item>}
//     </Form>
//     }
// }

// const WrappedPropertiesView = Form.create<IPropertiesViewProps>({ name: 'PropertiesView' })(PropertiesView);
// export default WrappedPropertiesView;