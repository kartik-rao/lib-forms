import { Button, Slider, notification, InputNumber, Select, Switch, DatePicker, Row, Col, Card } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { action, toJS } from "mobx";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";


export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {

}

const formItemLayout = {
    labelCol: {
      xs: { span: 14, offset: 1 },
      sm: { span: 10, offset: 1 },
    },
    wrapperCol: {
      xs: { span: 16 },
      sm: { span: 12 },
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

var moment = require('moment-timezone');
const timezones = moment.tz.names().map((name) => {
    return {label: name, value: name};
})

class FormContentEditorView extends React.Component<IFormContentEditorViewProps,any> {
    constructor(props: IFormContentEditorViewProps) {
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
                form.layout = values.layout;
            }
        });
        return;
    }

    @action.bound onchange = (e) => {
        console.log(e);
    }

    render () {
        let {getFieldDecorator} = this.props.form;
        let {editorStore} = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;
        let {getFieldValue} = this.props.form;
        return <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                <Form.Item label="Form Layout" help={<ul>
                    <li>Horizontal：Labeld placed next to controls.</li>
                    <li>Vertical：Labels placed above controls (default).</li>
                    <li>Inline：All controls render in one line.</li>
                </ul>}>
                        {
                        getFieldDecorator('layout', {
                            initialValue: form.layout,
                            rules: [
                                {type: 'string'},
                                {required: true, message: 'A Layout is required'}
                            ]
                        })(<Select>
                            <Select.Option key="horizontal">Horizontal</Select.Option>
                            <Select.Option key="vertical">Vertical</Select.Option>
                            <Select.Option key="inline">Inline</Select.Option>
                        </Select>)
                    }
                </Form.Item>
                <Card size="small" title="Add Field Layout">
                    <Form.Item label="Target Screen Width" help={<ul>
                        <li>Extra Small (below 768px)</li>
                        <li>Small (768px - 992px)</li>
                        <li>Medium (992px - 1200px)</li>
                        <li>Large (1200px - 1440px)</li>
                        <li>Extra Large (1440px and above)</li>
                    </ul>}>
                            {
                            getFieldDecorator('dimension', {
                                initialValue: 'lg',
                                rules: [
                                    {type: 'string'},
                                    {required: true, message: 'A dimension'}
                                ]
                            })(<Select>
                                <Select.Option key="xs">Extra Small</Select.Option>
                                <Select.Option key="sm">Small</Select.Option>
                                <Select.Option key="md">Medium</Select.Option>
                                <Select.Option key="lg">Large</Select.Option>
                                <Select.Option key="xl">Extra Large</Select.Option>
                            </Select>)
                        }
                    </Form.Item>
                    <Form.Item label="Label Offset" help="Left offset for label">
                            {
                            getFieldDecorator('labelCol.offset', {
                                initialValue: 0,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Label Width" help="Label available width">
                            {
                            getFieldDecorator('labelCol.span', {
                                initialValue: 8,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Field Offset" help="Left offset for fields">
                            {
                            getFieldDecorator('wrapperCol.offset', {
                                initialValue: 2,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Field width" help="Field available width">
                            {
                            getFieldDecorator('wrapperCol.span', {
                                initialValue: 14,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24}/>)
                        }
                    </Form.Item>
                    <div>
                        <div>Layout Preview</div>
                        <Row className="fl-layout-demo-row">
                            <Col offset={getFieldValue('labelCol.offset')} span={getFieldValue('labelCol.span')} style={{background: 'rgba(0,160,233,0.6)'}}>
                                <span>Label - {(100*(getFieldValue('labelCol.span') + getFieldValue('labelCol.offset'))/24).toFixed(2)}%</span>
                            </Col>
                            <Col offset={getFieldValue('wrapperCol.offset')} span={getFieldValue('wrapperCol.span')} style={{background: 'rgba(0,120,200,0.8)'}}>
                                <span>Field - {(100*(getFieldValue('wrapperCol.span') + getFieldValue('wrapperCol.offset'))/24).toFixed(2)}%</span>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
                </Form.Item>
            </Form>
    }
}

const WrappedFormContentEditorView = Form.create<IFormContentEditorViewProps>({ name: 'FormContentEditorView' })(FormContentEditorView);
export default WrappedFormContentEditorView;