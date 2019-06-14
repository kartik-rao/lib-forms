import { ItemLayoutOptions, IItemLayoutOptions, FormLayoutOptions, IFormLayoutOptions } from "@kartikrao/lib-forms-core";
import { Button, Form, notification, Select, Divider } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import {RootStore} from "../../../../store/RootStore";
import ItemLayoutView from "./ItemLayoutView";


type ScreenWidth = "xs"|"sm"|"md"|"lg"|"xl";

export interface IFormLayoutViewProps extends FormComponentProps {
    store: RootStore;
}

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
        span: 6,
        offset: 18,
      },
      sm: {
        span: 6,
        offset: 18,
      },
    },
};

@observer
export class FormLayoutView extends React.Component<IFormLayoutViewProps, any> {

    constructor(props: IFormLayoutViewProps) {
        super(props);
        this.initialize(props);
    }

    @action initialize(props: IFormLayoutViewProps) {
        let {form} = props.store.formStore;
        let {itemLayoutOptions, formLayoutOptions, layout} = form;

        this.itemLayoutOptions = itemLayoutOptions;
        this.formLayoutOptions = formLayoutOptions;
        this.selectedFormLayout = layout;
    }

    @action setProperty(key: string, e) {
        let value = e && typeof(e) == 'object' && e.target ? e.target.value: e;
        this[key] = value;
    }

    @computed get selectedItemLayout() {
        let {selectedDimension} = this;
        if(selectedDimension) {
            let {itemLayoutOptions} = this;
            let response = {
                formLayout: this.selectedFormLayout,
                dimension: selectedDimension,
                labelOffset: 0,
                labelSpan: 0,
                wrapperOffset: 0,
                wrapperSpan: 0
            };
            let {wrapperCol, labelCol} = itemLayoutOptions;
            response.labelOffset = labelCol[selectedDimension].offset;
            response.labelSpan = labelCol[selectedDimension].span;
            response.wrapperOffset = wrapperCol[selectedDimension].offset;
            response.wrapperSpan = wrapperCol[selectedDimension].span;
            return response;
        }
    }

    @computed get dimensions() {
        if (this.itemLayoutOptions.wrapperCol) {
            return Object.keys(this.itemLayoutOptions.wrapperCol);
        } else if (this.itemLayoutOptions.labelCol) {
            return Object.keys(this.itemLayoutOptions.labelCol);
        } else {
            return ["xs", "sm", "md", "lg", "xl"];
        }
    }

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

    @observable selectedFormLayout    : string;
    @observable itemLayoutOptions : ItemLayoutOptions;
    @observable formLayoutOptions : IFormLayoutOptions;
    @observable selectedDimension : ScreenWidth;

    @computed get hasFormLayoutChanged() {
        let {form} = this.props.store.editorStore.formStore;
        return this.selectedFormLayout != form.layout;
    }

    @action saveLayout = (layout: ItemLayoutOptions) => {
        let {form} = this.props.store.editorStore.formStore;
        form.itemLayoutOptions = layout;
        notification.info({message: `Form - ${form.name}`,
                description:"Form properties applied successfully"});
        console.log("Post Save", form.itemLayoutOptions);
    }

    render() {
        let {getFieldDecorator} = this.props.form;
        return <div>
            <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>
            <p>Change form layout to render labels next to or above fields, add field layouts for fine grained control of rendering on a variety of screen sizes.</p>
            <Divider/>
            <Form.Item label="Form Layout" help={<ul>
                <li>Horizontal：Labels placed next to controls.</li>
                <li>Vertical：Labels placed above controls (default).</li>
                <li>Inline：All controls render in one line.</li>
            </ul>}>
                    {
                    getFieldDecorator('selectedFormLayout', {
                        initialValue: this.selectedFormLayout,
                        rules: [
                            {type: 'string'},
                            {required: true, message: 'A Layout is required'}
                        ]
                    })(<Select onChange={(e) => {this.setProperty('selectedFormLayout', e)}}>
                        <Select.Option key="horizontal">Horizontal</Select.Option>
                        <Select.Option key="vertical">Vertical</Select.Option>
                        <Select.Option key="inline">Inline</Select.Option>
                    </Select>)
                }
            </Form.Item>
            {this.hasFormLayoutChanged && <Form.Item {...tailFormItemLayout}>
                <Button size="small" type="primary">Update Form Layout</Button>
            </Form.Item>}
        </Form>
        <Divider />
        <ItemLayoutView onSave={this.saveLayout}
                formLayout={this.selectedFormLayout} itemLayoutOptions={this.itemLayoutOptions}/>
    </div>
    }
}

const WrappedIFormLayoutViewProps = Form.create<IFormLayoutViewProps>({ name: 'FormLayoutView' })(FormLayoutView);
export default WrappedIFormLayoutViewProps;