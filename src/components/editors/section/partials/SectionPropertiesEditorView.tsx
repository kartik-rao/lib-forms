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
                    notification.info({message: `Section - ${section.name}`,
                        description:"Section properties applied successfully"});
                    Object.keys(values).forEach((p: string) => {
                        section[p] = values[p];
                    });
                }
            });
            return;
        }
    }));

    return useObserver(() => {
        console.log("SPEV.render", store.selectedSection);
        return store.selectedSection ? <Card size="small" bordered={false}>
            <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
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
                    <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
                </Form.Item>
            </Form>
        </Card> : <></>
    })
}

export default Form.create<ISectionPropertiesEditorViewProps>()(SectionPropertiesEditorView);

// @observer
// class SectionPropertiesEditorViewOld extends React.Component<ISectionPropertiesEditorViewProps, any> {

//     @observable gutter: number;

//     constructor(props: ISectionPropertiesEditorViewProps) {
//         super(props);
//     }

//     @action.bound handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         let {selectedSection: section} = this.props.store;
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 notification.info({message: `Section - ${section.name}`,
//                     description:"Section properties applied successfully"});
//                 Object.keys(values).forEach((p: string) => {
//                     section[p] = values[p];
//                 });
//             }
//         });
//         return;
//     }

//     render() {

//         let {store} = this.props;
//         let {selectedSection: section} = store;
//         let {getFieldDecorator} = this.props.form;
//         console.log("SPEV.render", store.selectedSection);
//         if (!section) {
//             return <></>
//         }
//         return  <Card size="small" bordered={false}>
//             <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
//                 <Form.Item required={true} label="Name">
//                         {
//                         getFieldDecorator('name', {
//                             initialValue: section.name,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item required={true} label="Title">
//                         {
//                         getFieldDecorator('title', {
//                             initialValue: section.title,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item {...tailFormItemLayout}>
//                     <Button type="primary" htmlType="submit" style={{marginTop: '15px'}} onClick={this.handleSubmit}>Apply</Button>
//                 </Form.Item>
//             </Form>
//         </Card>
//     }
// }

// const WrappedSectionPropertiesEditorView = Form.create<ISectionPropertiesEditorViewProps>({ name: 'SectionPropertiesEditorView' })(SectionPropertiesEditorView);
// export default WrappedSectionPropertiesEditorView;