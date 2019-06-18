import { Button, Input, notification, InputNumber, Select, Switch, DatePicker } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { action, toJS } from "mobx";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
import {formItemLayout, tailFormItemLayout} from "../../common/FormLayoutCommon";

export interface IFormPropertiesEditorViewProps extends FormComponentProps, IEditorView {

}

import * as moment from 'moment-timezone';
const timezones = moment.tz.names().map((name) => {
    return {label: name, value: name};
})

class FormPropertiesEditorView extends React.Component<IFormPropertiesEditorViewProps,any> {
    constructor(props: IFormPropertiesEditorViewProps) {
        super(props);
    }

    form: Form
    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {form} = this.props.store.editorStore.formStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.info({message: `Form - ${form.name}`,
                    description:"Form properties applied successfully"});
                form.desc = values.desc;
                form.layout = values.layout;
                form.content.title = values.content.title;
                form.content.subtitle = values.content.subtitle;
                form.status = {...form.status, ...values.status}
            }
        });
        return;
    }

    render () {
        let {getFieldDecorator} = this.props.form;
        let {editorStore} = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;

        return <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                <Form.Item required={true} label="Name">
                        {
                        getFieldDecorator('name', {
                            initialValue: form.name,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item required={true} label="Description">
                        {
                        getFieldDecorator('desc', {
                            initialValue: form.desc,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item required={true} label="Title">
                        {
                        getFieldDecorator('content.title', {
                            initialValue: form.content.title,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item label="Subtitle">
                        {
                        getFieldDecorator('content.subtitle', {
                            initialValue: form.content.subtitle,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item label="Entry Timezone Offset" help="UTC by default, used to mark entry times">
                        {
                        getFieldDecorator('status.timezone', {
                            initialValue: form.status.timezone || 'UTC',
                            rules: [
                                {type: 'string'},
                                {required: true, message: 'A timezone offset is required'}
                            ]
                        })(<Select>
                            {timezones.map((options, index) => {
                                return <Select.Option key={index} value={options.value}>{options.label}</Select.Option>
                            })}
                        </Select>)
                    }
                </Form.Item>
                <Form.Item label="Paused" help="Pause this form (will stop collection of entries immediately)">
                        {
                        getFieldDecorator('status.paused', {
                            initialValue: form.status.paused
                        })(<Switch/>)
                    }
                </Form.Item>
                <Form.Item label="Starts" help="Schedule form activation">
                        {
                        getFieldDecorator('status.starts', {
                            initialValue: form.status.starts,
                        })(<DatePicker showTime />)
                    }
                </Form.Item>
                <Form.Item label="Ends" help="Schedule form deactivation">
                        {
                        getFieldDecorator('status.ends', {
                            initialValue: form.status.ends,
                        })(<DatePicker showTime />)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
                </Form.Item>
            </Form>
    }
}

const WrappedFormContentEditorView = Form.create<IFormPropertiesEditorViewProps>({ name: 'FormContentEditorView' })(FormPropertiesEditorView);
export default WrappedFormContentEditorView;