import { Button, Input, notification, Select, Switch, DatePicker } from "antd";
import Form from "antd/lib/form/Form";
import { toJS } from "mobx";
import * as React from "react";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { useLocalStore, useObserver } from "mobx-react";
// TODO: Convert to dynamic import
import * as moment from 'moment-timezone';
const timezones = moment.tz.names().map((name) => {
    return { label: name, value: name };
});
const FormPropertiesEditorView = ({ form: { getFieldDecorator, validateFieldsAndScroll } }) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { form } = store.formStore;
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    notification.info({ message: `Form - ${form.name}`, description: "Form properties applied successfully" });
                    form.desc = values.desc;
                    form.layout = values.layout;
                    form.content.title = values.content.title;
                    form.content.subtitle = values.content.subtitle;
                    form.status = Object.assign({}, form.status, values.status);
                }
            });
            return;
        }
    }));
    return useObserver(() => {
        let form = store.showFormEditor ? toJS(store.formStore.form) : null;
        return form && React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
            React.createElement(Form.Item, { required: true, label: "Name" }, getFieldDecorator('name', {
                initialValue: form.name,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { required: true, label: "Description" }, getFieldDecorator('desc', {
                initialValue: form.desc,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { required: true, label: "Title" }, getFieldDecorator('content.title', {
                initialValue: form.content.title,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Subtitle" }, getFieldDecorator('content.subtitle', {
                initialValue: form.content.subtitle,
                rules: [{ type: 'string' }]
            })(React.createElement(Input, null))),
            React.createElement(Form.Item, { label: "Entry Timezone Offset", help: "UTC by default, used to mark entry times" }, getFieldDecorator('status.timezone', {
                initialValue: form.status.timezone || 'UTC',
                rules: [
                    { type: 'string' },
                    { required: true, message: 'A timezone offset is required' }
                ]
            })(React.createElement(Select, null, timezones.map((options, index) => {
                return React.createElement(Select.Option, { key: index, value: options.value }, options.label);
            })))),
            React.createElement(Form.Item, { label: "Paused", help: "Pause this form (will stop collection of entries immediately)" }, getFieldDecorator('status.paused', {
                initialValue: form.status.paused
            })(React.createElement(Switch, null))),
            React.createElement(Form.Item, { label: "Starts", help: "Schedule form activation" }, getFieldDecorator('status.starts', {
                initialValue: form.status.starts,
            })(React.createElement(DatePicker, { showTime: true }))),
            React.createElement(Form.Item, { label: "Ends", help: "Schedule form deactivation" }, getFieldDecorator('status.ends', {
                initialValue: form.status.ends,
            })(React.createElement(DatePicker, { showTime: true }))),
            React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                React.createElement(Button, { type: "primary", htmlType: "submit", style: { marginTop: '15px' } }, "Apply")));
    });
};
export default Form.create()(FormPropertiesEditorView);
// export interface IFormPropertiesEditorViewProps extends FormComponentProps, IEditorView {
// }
// import * as moment from 'moment-timezone';
// import { useLocalStore } from "mobx-react";
// import { editorStoreContext } from "../../../../store/EditorStoreProvider";
// const timezones = moment.tz.names().map((name) => {
//     return {label: name, value: name};
// })
// class FormPropertiesEditorViewOld extends React.Component<IFormPropertiesEditorViewProps,any> {
//     constructor(props: IFormPropertiesEditorViewProps) {
//         super(props);
//     }
//     form: Form
//     @action.bound handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         let {form} = this.props.store.formStore;
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 notification.info({message: `Form - ${form.name}`,
//                     description:"Form properties applied successfully"});
//                 form.desc = values.desc;
//                 form.layout = values.layout;
//                 form.content.title = values.content.title;
//                 form.content.subtitle = values.content.subtitle;
//                 form.status = {...form.status, ...values.status}
//             }
//         });
//         return;
//     }
//     render () {
//         let {getFieldDecorator} = this.props.form;
//         let {store} = this.props;
//         let form = store.showFormEditor ? toJS(store.formStore.form) : null;
//         return <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
//                 <Form.Item required={true} label="Name">
//                         {
//                         getFieldDecorator('name', {
//                             initialValue: form.name,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item required={true} label="Description">
//                         {
//                         getFieldDecorator('desc', {
//                             initialValue: form.desc,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item required={true} label="Title">
//                         {
//                         getFieldDecorator('content.title', {
//                             initialValue: form.content.title,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item label="Subtitle">
//                         {
//                         getFieldDecorator('content.subtitle', {
//                             initialValue: form.content.subtitle,
//                             rules: [{type: 'string'}]
//                         })(<Input/>)
//                     }
//                 </Form.Item>
//                 <Form.Item label="Entry Timezone Offset" help="UTC by default, used to mark entry times">
//                         {
//                         getFieldDecorator('status.timezone', {
//                             initialValue: form.status.timezone || 'UTC',
//                             rules: [
//                                 {type: 'string'},
//                                 {required: true, message: 'A timezone offset is required'}
//                             ]
//                         })(<Select>
//                             {timezones.map((options, index) => {
//                                 return <Select.Option key={index} value={options.value}>{options.label}</Select.Option>
//                             })}
//                         </Select>)
//                     }
//                 </Form.Item>
//                 <Form.Item label="Paused" help="Pause this form (will stop collection of entries immediately)">
//                         {
//                         getFieldDecorator('status.paused', {
//                             initialValue: form.status.paused
//                         })(<Switch/>)
//                     }
//                 </Form.Item>
//                 <Form.Item label="Starts" help="Schedule form activation">
//                         {
//                         getFieldDecorator('status.starts', {
//                             initialValue: form.status.starts,
//                         })(<DatePicker showTime />)
//                     }
//                 </Form.Item>
//                 <Form.Item label="Ends" help="Schedule form deactivation">
//                         {
//                         getFieldDecorator('status.ends', {
//                             initialValue: form.status.ends,
//                         })(<DatePicker showTime />)
//                     }
//                 </Form.Item>
//                 <Form.Item {...tailFormItemLayout}>
//                     <Button type="primary" htmlType="submit" style={{marginTop: '15px'}}>Apply</Button>
//                 </Form.Item>
//             </Form>
//     }
// }
// const WrappedFormContentEditorView = Form.create<IFormPropertiesEditorViewProps>({ name: 'FormContentEditorView' })(FormPropertiesEditorView);
// export default WrappedFormContentEditorView;
