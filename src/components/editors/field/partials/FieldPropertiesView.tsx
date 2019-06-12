import { ChoiceOption, IFieldProps } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import { Button, Empty, Form, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { action, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { IComponentEditorView } from "../../IComponentEditorView";
import { asDecoratedProperty, FieldPropertiesMap } from "../EditableProperties";
import { ChoiceOptionEditorView } from "./ChoiceOptionEditorView";

export interface IFieldPropertiesViewProps extends FormComponentProps, IComponentEditorView {

}


@observer
class FieldPropertiesView extends React.Component<IFieldPropertiesViewProps, any> {
    constructor(props: IFieldPropertiesViewProps) {
        super(props);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {field} = this.props.store.editorStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
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

    @action.bound updateOptions(options: ChoiceOption[]) {
        this.props.store.editorStore.field.componentProps["options"] = options;
    }

    render() {
        let field = toJS(this.props.store.editorStore.field) as IFieldProps;

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
        let {getFieldDecorator, getFieldValue} = this.props.form;
        let formItems = FieldPropertiesMap[field.inputType];
        return  <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
            {formItems && formItems.map((item, index) => {
                {return asDecoratedProperty(field, getFieldDecorator, getFieldValue, item, index)}
            })}
            {!formItems && <Empty description={
                    <span>No editable properties available for this field</span>
                    }>
            </Empty>}
            {(field.inputType == 'select' || field.inputType == 'checkboxgroup' || field.inputType == 'radiogroup') &&
                <ChoiceOptionEditorView type="select" items={field.componentProps['options']} onChange={this.updateOptions}/>
            }
            {formItems && <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
            </Form.Item>}
    </Form>
    }
}

const WrappedFieldPropertiesView = Form.create<IFieldPropertiesViewProps>({ name: 'FieldPropertiesView' })(FieldPropertiesView);
export default WrappedFieldPropertiesView;