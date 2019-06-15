import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Row, Col, Card } from "antd";
import { IEditorView } from "../common/IComponentEditorView";
import { action } from "mobx";
import { FormComponentProps } from "antd/lib/form";

export interface IPageEditorViewProps extends FormComponentProps, IEditorView {

}

@observer
class PageEditorView extends React.Component<IPageEditorViewProps, any> {

    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {page} = this.props.store.editorStore;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                notification.info({message: `Page - ${page.name}`,
                    description:"Page properties applied successfully"});
                Object.keys(values).forEach((p: string) => {
                    page[p] = values[p];
                });
            }
        });
        return;
    }

    render() {
        let {editorStore} = this.props.store;
        let {page} = editorStore;
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


        let {getFieldDecorator} = this.props.form;

        return page && <Drawer title={`Page "${page.name}" (id=${page.id||''})`}
            onClose={() => editorStore.setEditable(null)} visible={editorStore.showPageEditor}
            width={500}
            style={{ overflow: 'hidden'}}>
            {
                <Card size="small" bordered={false}>
                <Row><Col span={24}>
                <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                    <Form.Item required={true} label="Name">
                         {
                            getFieldDecorator('name', {
                                initialValue: page.name,
                                rules: [{type: 'string'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item required={true} label="Title">
                         {
                            getFieldDecorator('title', {
                                initialValue: page.title,
                                rules: [{type: 'string'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item label="Subtitle">
                         {
                            getFieldDecorator('subtitle', {
                                initialValue: page.subtitle,
                                rules: [{type: 'string'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
                    </Form.Item>
                </Form>
                </Col></Row>
                </Card>
            }
        </Drawer>
    }
}

const WrappedPageEditorView = Form.create<IPageEditorViewProps>({ name: 'PageEditorView' })(PageEditorView);
export default WrappedPageEditorView;