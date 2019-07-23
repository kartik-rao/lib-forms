import * as React from "react";
import { observer } from "mobx-react";
import { Drawer, Form, notification, Button, Input, Row, Col, Card, Tabs } from "antd";
import { IEditorView } from "../common/IComponentEditorView";
import { action, computed } from "mobx";
import { FormComponentProps } from "antd/lib/form";
import {formItemLayout, tailFormItemLayout} from "../common/FormLayoutCommon";

export interface IPageEditorViewProps extends FormComponentProps, IEditorView {

}

@observer
class PageEditorView extends React.Component<IPageEditorViewProps, any> {

    @action.bound handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let {selectedPage: page} = this.props.store;
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

    @computed get hasErrors() {
        let errors = this.props.form.getFieldsError();
        let fieldsWithErrors = Object.keys(errors).filter((field) => {
            return !!errors[field]
        });
        return fieldsWithErrors.length > 0;
    }

    render() {
        let {store} = this.props;
        let {selectedPage: page} = store;
        let {getFieldDecorator} = this.props.form;

        return page && <Drawer title={`Page "${page.name}" (id=${page.id||''})`}
            onClose={() => store.setEditable(null)} visible={store.showPageEditor}
            width={600} closable={!this.hasErrors} maskClosable={!this.hasErrors}
            style={{ overflow: 'auto', height: 'calc(80% - 108px)', paddingBottom: '108px' }}>
            {
                <Tabs>
                <Tabs.TabPane key="1" tab="Settings">
                <Card size="small" bordered={false}>
                <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
                    <Form.Item required={true} label="Name" help="Choose a name that distinguishes this page from others">
                         {
                            getFieldDecorator('name', {
                                initialValue: page.name,
                                rules: [{type: 'string'}, {required: true, message: 'A name is required'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item required={true} label="Title" help="The title of this page, displayed above the page's content">
                         {
                            getFieldDecorator('title', {
                                initialValue: page.title,
                                rules: [{type: 'string'}, {required: true, message: 'A title is required'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item label="Subtitle" help="A subtitle for this page, displayed underneath the title">
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
                </Card>
                </Tabs.TabPane>
                </Tabs>
            }
        </Drawer>
    }
}

const WrappedPageEditorView = Form.create<IPageEditorViewProps>({ name: 'PageEditorView' })(PageEditorView);
export default WrappedPageEditorView;