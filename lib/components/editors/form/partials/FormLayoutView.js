import { AllScreenWidths } from "@kartikrao/lib-forms-core";
import { Button, Divider, Form, notification, Select } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import ItemLayoutView from "./ItemLayoutView";
// export interface IFormLayoutViewProps extends FormComponentProps {
//     store: EditorStore;
// }
const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 14 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 2,
            offset: 22,
        },
        sm: {
            span: 2,
            offset: 22,
        },
    },
};
const FormContentEditorView = ({ form: { getFieldDecorator, getFieldValue, validateFieldsAndScroll } }) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        selectedFormLayout: store.formStore.form.layout,
        selectedLabelAlign: store.formStore.form.formLayoutOptions.labelAlign,
        setProperty: function (key, e) {
            let value = e && typeof (e) == 'object' && e.target ? e.target.value : e;
            this[key] = value;
        },
        handleSubmit: function (e) {
            e.preventDefault();
            e.stopPropagation();
            let { form } = store.formStore;
            console.log("Submitting");
            validateFieldsAndScroll((err, values) => {
                if (!err) {
                    form.layout = this.selectedFormLayout;
                    form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
                    notification.info({ message: `Form - ${form.name}`,
                        description: `Form layout set to "${form.layout}" ` });
                }
            });
            return;
        },
        get hasFormLayoutChanged() {
            let { form } = store.formStore;
            return this.selectedFormLayout != form.layout || this.selectedLabelAlign != form.formLayoutOptions.labelAlign;
        },
        saveItemLayout: function (layout) {
            let { form } = store.formStore;
            AllScreenWidths.map((w) => {
                layout.labelCol[w] && form.itemLayoutOptions.labelCol.add(w, layout.labelCol[w]);
                layout.wrapperCol[w] && form.itemLayoutOptions.wrapperCol.add(w, layout.wrapperCol[w]);
            });
            form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
            notification.info({ message: `Form - ${form.name}`,
                description: "Field layout updated successfully" });
        }
    }));
    return useObserver(() => {
        let { form } = store.formStore;
        return React.createElement("div", null,
            React.createElement(Form, Object.assign({}, formItemLayout, { onSubmit: (e) => localStore.handleSubmit(e), layout: "horizontal" }),
                React.createElement("p", null, "Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes."),
                React.createElement(Divider, null),
                React.createElement(Form.Item, { label: "Form Layout", help: React.createElement("ul", null,
                        React.createElement("li", null, "Horizontal\uFF1ALabels placed next to controls."),
                        React.createElement("li", null, "Vertical\uFF1ALabels placed above controls (default)."),
                        React.createElement("li", null, "Inline\uFF1AAll controls render in one line.")) }, getFieldDecorator('selectedFormLayout', {
                    initialValue: localStore.selectedFormLayout,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'A Layout is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { localStore.setProperty('selectedFormLayout', e); } },
                    React.createElement(Select.Option, { key: "horizontal" }, "Horizontal"),
                    React.createElement(Select.Option, { key: "vertical" }, "Vertical"),
                    React.createElement(Select.Option, { key: "inline" }, "Inline")))),
                React.createElement(Form.Item, { label: "Label Alignment", help: "Horizontal position of the labels" }, getFieldDecorator('selectedLabelAlign', {
                    initialValue: localStore.selectedLabelAlign,
                    rules: [
                        { type: 'string' },
                        { required: true, message: 'An alignment is required' }
                    ]
                })(React.createElement(Select, { onChange: (e) => { localStore.setProperty('selectedLabelAlign', e); } },
                    React.createElement(Select.Option, { key: "left" }, "Left"),
                    React.createElement(Select.Option, { key: "right" }, "Right")))),
                localStore.hasFormLayoutChanged && React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                    React.createElement(Button, { size: "small", type: "primary", htmlType: "submit" }, "Save"))),
            React.createElement(Divider, null),
            React.createElement(ItemLayoutView, { onSave: localStore.saveItemLayout, formLayout: localStore.selectedFormLayout, itemLayoutOptions: form.itemLayoutOptions }));
    });
};
export default Form.create()(FormContentEditorView);
// @observer
// export class FormLayoutViewOld extends React.Component<IFormLayoutViewProps, any> {
//     @observable selectedFormLayout : string;
//     @observable selectedLabelAlign : "left"|"right";
//     constructor(props: IFormLayoutViewProps) {
//         super(props);
//         this.initialize(props);
//     }
//     @action initialize(props: IFormLayoutViewProps) {
//         let {form} = props.store.formStore;
//         this.selectedFormLayout = form.layout;
//         this.selectedLabelAlign = form.formLayoutOptions.labelAlign;
//     }
//     @action setProperty(key: string, e) {
//         let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
//         this[key] = value;
//     }
//     @action.bound handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         let {form} = this.props.store.formStore;
//         console.log("Submitting");
//         this.props.form.validateFieldsAndScroll((err, values) => {
//             if (!err) {
//                 form.layout = this.selectedFormLayout;
//                 form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
//                 notification.info({message: `Form - ${form.name}`,
//                     description:`Form layout set to "${form.layout}" `});
//             }
//         });
//         return;
//     }
//     @computed get hasFormLayoutChanged() {
//         let {form} = this.props.store.formStore;
//         return this.selectedFormLayout != form.layout || this.selectedLabelAlign != form.formLayoutOptions.labelAlign;
//     }
//     @action saveItemLayout = (layout: ItemLayoutOptions) => {
//         let {form} = this.props.store.formStore;
//         AllScreenWidths.map((w: ScreenWidth) => {
//             layout.labelCol[w] && form.itemLayoutOptions.labelCol.add(w, layout.labelCol[w]);
//             layout.wrapperCol[w] && form.itemLayoutOptions.wrapperCol.add(w, layout.wrapperCol[w]);
//         });
//         form.formLayoutOptions.labelAlign = this.selectedLabelAlign;
//         notification.info({message: `Form - ${form.name}`,
//                 description:"Field layout updated successfully"});
//     }
//     render() {
//         let {getFieldDecorator} = this.props.form;
//         let {form} = this.props.store.formStore;
//         return <div>
//             <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
//             <p>Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes.</p>
//             <Divider/>
//             <Form.Item label="Form Layout" help={<ul>
//                 <li>Horizontal：Labels placed next to controls.</li>
//                 <li>Vertical：Labels placed above controls (default).</li>
//                 <li>Inline：All controls render in one line.</li>
//             </ul>}>
//                     {
//                     getFieldDecorator('selectedFormLayout', {
//                         initialValue: this.selectedFormLayout,
//                         rules: [
//                             {type: 'string'},
//                             {required: true, message: 'A Layout is required'}
//                         ]
//                     })(<Select onChange={(e) => {this.setProperty('selectedFormLayout', e)}}>
//                         <Select.Option key="horizontal">Horizontal</Select.Option>
//                         <Select.Option key="vertical">Vertical</Select.Option>
//                         <Select.Option key="inline">Inline</Select.Option>
//                     </Select>)
//                 }
//             </Form.Item>
//             <Form.Item label="Label Alignment" help="Horizontal position of the labels">
//             {
//                     getFieldDecorator('selectedLabelAlign', {
//                         initialValue: this.selectedLabelAlign,
//                         rules: [
//                             {type: 'string'},
//                             {required: true, message: 'An alignment is required'}
//                         ]
//                     })(<Select onChange={(e) => {this.setProperty('selectedLabelAlign', e)}}>
//                         <Select.Option key="left">Left</Select.Option>
//                         <Select.Option key="right">Right</Select.Option>
//                     </Select>)
//                 }
//             </Form.Item>
//             {this.hasFormLayoutChanged && <Form.Item {...tailFormItemLayout}>
//                 <Button size="small" type="primary" htmlType="submit">Save</Button>
//             </Form.Item>}
//         </Form>
//         <Divider />
//         <ItemLayoutView onSave={this.saveItemLayout}
//             formLayout={this.selectedFormLayout} itemLayoutOptions={form.itemLayoutOptions}/>
//     </div>
//     }
// }
// const WrappedIFormLayoutViewProps = Form.create<IFormLayoutViewProps>({ name: 'FormLayoutView' })(FormLayoutView);
// export default WrappedIFormLayoutViewProps;
