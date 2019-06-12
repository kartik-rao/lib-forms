import { observer } from "mobx-react";
import {toJS, action, computed} from "mobx";
import * as React from "react";
import { Form, Input, Select,  Button, DatePicker, InputNumber, notification, Col, Row, Empty} from "antd";
import { IComponentEditorView } from "../../IComponentEditorView";
import { IFieldProps, ISelectProps, ChoiceOption } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import { FormComponentProps } from "antd/lib/form";
import { ChoiceOptionEditorView } from "./ChoiceOptionEditorView";
import TextArea from "antd/lib/input/TextArea";

export interface IFieldPropertiesViewProps extends FormComponentProps, IComponentEditorView {

}

import {generateFieldItems, FieldPropertiesMap, asDecoratedProperty} from "../EditableProperties";

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
                let merge = {componentProps: {}};
                Object.keys(values).forEach((p: string) => {
                    if(p.indexOf("c_") == 0) {
                        merge.componentProps[p.replace("c_","")] = values[p]
                    } else  {
                        merge[p] = values[p];
                    }
                });
                field.mergeUpdate(merge);
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