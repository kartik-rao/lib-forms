import { Button, notification, Switch } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { action, observable, set, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import {RootStore} from "../../../../store/RootStore";
import { IEditorView } from "../../common/IComponentEditorView";


export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {
    store: RootStore;
}

const formItemLayout = {
    labelCol: {
      xs: { span: 8, offset: 10 },
      sm: { span: 8, offset: 10},
    },
    wrapperCol: {
      xs: { span: 4, offset: 2 },
      sm: { span: 4, offset: 2 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 4,
        offset: 20,
      },
      sm: {
        span: 4,
        offset: 20,
      },
    },
};

@observer
class FormContentEditorView extends React.Component<IFormContentEditorViewProps,any> {
    constructor(props: IFormContentEditorViewProps) {
        super(props);
    }

    @observable selectedFormLayout;

    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {form} = this.props.store.editorStore.formStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.info({message: `Form - ${form.name}`,
                    description:"Form properties applied successfully"});
                form.layout = values.layout;
                form.formLayoutOptions = values.formLayoutOptions;
            }
        });
        return;
    }

    @action.bound onChange = (key: string, value: any) => {
        set(this, key, value);
    }

    render () {
        let {getFieldDecorator} = this.props.form;
        let {editorStore} = this.props.store;
        if (!editorStore.formStore.form) {
            return <></>
        }
        let form = toJS(editorStore.formStore.form);
        let {formLayoutOptions, itemLayoutOptions} = form;
        console.log("FCEV", formLayoutOptions);
        return <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                <Form.Item label="Validation disables paging">
                    {getFieldDecorator('formLayoutOptions.validationDisablesPaging', {
                        valuePropName: 'defaultChecked',
                        initialValue: formLayoutOptions.validationDisablesPaging,
                    })(<Switch />)}
                </Form.Item>
                <Form.Item label="Show Page Number">
                    {getFieldDecorator('formLayoutOptions.showSteps', {
                        valuePropName: 'defaultChecked',
                        initialValue: formLayoutOptions.showSteps,
                    })(<Switch />)}
                </Form.Item>
                <Form.Item label="Show Page Title">
                    {getFieldDecorator('formLayoutOptions.showPageTitles', {
                        valuePropName: 'defaultChecked',
                        initialValue: formLayoutOptions.showPageTitles,
                    })(<Switch />)}
                </Form.Item>
                <Form.Item label="Show Section Title">
                    {getFieldDecorator('formLayoutOptions.showSectionTitles', {
                        valuePropName: 'defaultChecked',
                        initialValue: formLayoutOptions.showSectionTitles,
                    })(<Switch />)}
                </Form.Item>
                <Form.Item label="Show Section Border">
                    {getFieldDecorator('formLayoutOptions.showSectionBorders', {
                        valuePropName: 'defaultChecked',
                        initialValue: formLayoutOptions.showSectionBorders,
                    })(<Switch />)}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" size="small" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
                </Form.Item>
            </Form>
    }
}

const WrappedFormContentEditorView = Form.create<IFormContentEditorViewProps>({ name: 'FormContentEditorView' })(FormContentEditorView);
export default WrappedFormContentEditorView;