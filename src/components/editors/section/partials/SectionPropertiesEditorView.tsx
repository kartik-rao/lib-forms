import { Button, Card, Form, Input, notification } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";

export interface ISectionPropertiesEditorViewProps extends FormComponentProps {

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
        span: 3,
        offset: 21,
      },
      sm: {
        span: 3,
        offset: 21,
      },
    },
};

export const SectionPropertiesEditorView : React.FC<ISectionPropertiesEditorViewProps> = (props: ISectionPropertiesEditorViewProps) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        gutter: null as number,
        handleSubmit : (e) => {
            e.preventDefault();
            e.stopPropagation();
            let {selectedSection: section} = store;
            props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    store.pushUndoState(`Section "${section.name}" properties edited`);
                    Object.keys(values).forEach((p: string) => {
                        section[p] = values[p];
                    });
                    notification.info({message: `Section - ${section.name}`,
                        description:"Section properties applied successfully"});
                }
            });
            return;
        }
    }));

    return useObserver(() => {
        return store.selectedSection ? <Card size="small" bordered={false}>
            <Form {...formItemLayout} onSubmit={(e) => localStore.handleSubmit(e)} layout={"horizontal"}>
                <Form.Item required={true} label="Name">
                        {
                        props.form.getFieldDecorator('name', {
                            initialValue: store.selectedSection.name,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item required={true} label="Title">
                        {
                        props.form.getFieldDecorator('title', {
                            initialValue: store.selectedSection.title,
                            rules: [{type: 'string'}]
                        })(<Input/>)
                    }
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={localStore.handleSubmit}>Apply</Button>
                </Form.Item>
            </Form>
        </Card> : <></>
    })
}

export default Form.create<ISectionPropertiesEditorViewProps>()(SectionPropertiesEditorView);