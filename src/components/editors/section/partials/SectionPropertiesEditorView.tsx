import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Row, Col, Card } from "antd";
import { IEditorView } from "../../common/IComponentEditorView";
import { action } from "mobx";
import { FormComponentProps } from "antd/lib/form";

export interface ISectionPropertiesEditorViewProps extends FormComponentProps, IEditorView {

}

const formItemLayout = {
    labelCol: {
      xs: { span: 12, offset: 4 },
      sm: { span: 8, offset: 4},
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

@observer
class SectionPropertiesEditorView extends React.Component<ISectionPropertiesEditorViewProps, any> {

    constructor(props: ISectionPropertiesEditorViewProps) {
        super(props);
    }

    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {section} = this.props.store.editorStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.info({message: `Section - ${section.name}`,
                    description:"Section properties applied successfully"});
                Object.keys(values).forEach((p: string) => {
                    section[p] = values[p];
                });
            }
        });
        return;
    }

    render() {

        let {editorStore} = this.props.store;
        let {section} = editorStore;
        let {getFieldDecorator} = this.props.form;
        console.log("SPEV.render", editorStore.section);
        if (!section) {
            return <></>
        }
        return  <Card size="small" bordered={false}>
                <Row><Col span={24}>
                <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                    <Form.Item required={true} label="Name">
                         {
                            getFieldDecorator('name', {
                                initialValue: section.name,
                                rules: [{type: 'string'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item required={true} label="Title">
                         {
                            getFieldDecorator('title', {
                                initialValue: section.title,
                                rules: [{type: 'string'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
                    </Form.Item>
                </Form>
                </Col>
            </Row>
        </Card>
    }
}

const WrappedSectionPropertiesEditorView = Form.create<ISectionPropertiesEditorViewProps>({ name: 'SectionPropertiesEditorView' })(SectionPropertiesEditorView);
export default WrappedSectionPropertiesEditorView;