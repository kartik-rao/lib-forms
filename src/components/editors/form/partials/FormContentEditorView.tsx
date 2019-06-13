import { Button, Slider, notification, InputNumber, Select, Switch, DatePicker, Row, Col, Card, Divider } from "antd";
import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import { action, toJS, observable, set } from "mobx";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
import { computed } from "mobx";
import { ItemLayoutPreview } from "./ItemLayoutPreview";
import { observer } from "mobx-react";

export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {

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
class FormContentEditorView extends React.Component<IFormContentEditorViewProps,any> {
    constructor(props: IFormContentEditorViewProps) {
        super(props);
        this.initialize();
    }

    @action initialize() {
        this.labelOffset = 0;
        this.labelSpan = 8;
        this.dimension = this.props.store.editorStore.formStore.form.layout;
        if (this.dimension == 'vertical') {
            this.wrapperOffset = 2;
            this.wrapperSpan = 14;
        } else {
            this.wrapperOffset = 0;
            this.wrapperSpan = 16;
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
            }
        });
        return;
    }

    @observable dimension;
    @observable labelSpan;
    @observable wrapperSpan;
    @observable labelOffset;
    @observable wrapperOffset;

    @computed get fieldLayout() {
        if (!this.dimension) {
            return null;
        }

        let fieldLayout = {
            labelCol : {},
            wrapperCol : {span: this.wrapperSpan, offset: this.wrapperOffset}
        };

        fieldLayout.labelCol[this.dimension] = {
            span: this.labelSpan,
            offset: this.labelOffset
        };
        fieldLayout.wrapperCol[this.dimension] = {
            span: this.labelSpan, offset: this.labelOffset
        };
    }

    @action.bound onChange = (key: string, value: any) => {
        set(this, key, value);
    }

    render () {
        let {getFieldDecorator} = this.props.form;
        let {editorStore} = this.props.store;
        let form = editorStore.formEditorVisible ? toJS(editorStore.formStore.form) : null;
        let {dimension} = this;
        return <Form {...formItemLayout} onSubmit={(e) => this.handleSubmit(e)} layout={"horizontal"}>



            </Form>
    }
}

const WrappedFormContentEditorView = Form.create<IFormContentEditorViewProps>({ name: 'FormContentEditorView' })(FormContentEditorView);
export default WrappedFormContentEditorView;