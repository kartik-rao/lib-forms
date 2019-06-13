import { Button, Table, Divider, Form, Card, Select, Slider, Modal } from "antd";
import { action, observable, set, computed, toJS } from "mobx";
import * as React from "react";
import RootStore from "../../../../store/RootStore";
import { ItemLayoutPreview } from "./ItemLayoutPreview";
import { FormComponentProps } from "antd/lib/form";
import { observer } from "mobx-react";

export interface IItemLayoutViewProps extends FormComponentProps {
    store: RootStore;
}

const dimensionNameMap = {
    xs : 'Extra Small',
    sm : 'Small',
    md : 'Medium',
    lg : 'Large',
    xl : 'Extra Large'
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
        span: 8,
        offset: 16,
      },
      sm: {
        span: 8,
        offset: 16,
      },
    },
};

@observer
export class ItemLayoutView extends React.Component<IItemLayoutViewProps, any> {

    @observable isAdding : boolean;
    @observable isEditing : boolean;
    @observable dimension : string;
    @observable labelSpan : number;
    @observable wrapperSpan : number;
    @observable labelOffset : number;
    @observable wrapperOffset : number;

    @computed get fieldLayout() {
        if (!this.dimension) {
            return null;
        }
        let {dimension} = this;
        let fieldLayout = {
            labelCol : {},
            wrapperCol : {}
        };

        fieldLayout.labelCol[dimension] = {
            span: this.labelSpan,
            offset: this.labelOffset
        };
        fieldLayout.wrapperCol[dimension] = {
            span: this.wrapperSpan,
            offset: this.wrapperOffset
        };

        return fieldLayout;
    }

    @action.bound onChange = (key: string, value: any) => {
        set(this, key, value);
    }

    constructor(props: IItemLayoutViewProps) {
        super(props);
    }

    @action initialize(props: IItemLayoutViewProps) {

    }

    @computed get currentDimensions() {
        let {formStore} = this.props.store.editorStore;
        let {layout} = formStore.form;
        let {labelCol, wrapperCol} = formStore.form.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        Object.keys(labelCol).forEach((d) => {
            dMap[d] = {formLayout: layout, dimension: d, labelSpan: labelCol[d].span, labelOffset: labelCol[d].offset || 0};
        });
        Object.keys(wrapperCol).forEach((d) => {
            dMap[d]['wrapperSpan'] =  wrapperCol[d].span;
            dMap[d]['wrapperOffset'] = wrapperCol[d].offset || 0;
            rows.push(dMap[d]);
        });

        return rows;
    }

    @computed get availableDimensions() {
        let {formStore} = this.props.store.editorStore;
        let {labelCol} = formStore.form.itemLayoutOptions;
        let usedDimensions = Object.keys(labelCol);
        let available = ["xs", "sm", "md", "lg", "xl"].filter((d) => {
            return usedDimensions.indexOf(d) < 0;
        });
        return available;
    }

    @action setIsAdding = () => {
        this.isAdding = true;
        this.labelOffset = 0;
        this.labelSpan = 8;
        this.wrapperOffset = 2;
        this.wrapperSpan = 14;
        this.dimension = this.availableDimensions[0];
    }

    @action reset = () => {
        this.isAdding = false;
        this.isEditing = false;
        this.labelOffset = null;
        this.labelSpan = null;
        this.wrapperOffset = null;
        this.wrapperSpan = null;
    }

    @action setIsEditing = (record: any) => {
        this.labelOffset = record.labelOffset;
        this.labelSpan = record.labelSpan;
        this.wrapperOffset = record.wrapperOffset;
        this.wrapperSpan = record.wrapperSpan;
        this.dimension = record.dimension;
        this.isEditing = true;
    }

    confirmRemove = (record: any) => {
        let self = this;
        Modal.confirm({
            title: `Are you sure ?`,
            content: `Clicking OK will remove field layout targeting "${dimensionNameMap[record.dimension]}"`,
            onOk() {
                self.remove(record);
            },
            onCancel() {},
        });
    }

    @action remove = (record: any) => {
        let {form} = this.props.store.editorStore.formStore;
        let {labelCol, wrapperCol} = form.itemLayoutOptions;
        delete labelCol[record.dimension];
        delete wrapperCol[record.dimension];
    }

    @action save = () => {
        let {fieldLayout} = this;
        let {form} = this.props.store.editorStore.formStore;
        console.log("New Field Layout", fieldLayout);
        console.log("Old Field Layout", toJS(form.itemLayoutOptions));
        form.itemLayoutOptions.labelCol = {...form.itemLayoutOptions.labelCol, ...fieldLayout.labelCol};
        form.itemLayoutOptions.wrapperCol = {...form.itemLayoutOptions.wrapperCol, ...fieldLayout.wrapperCol};
        console.log("After Save", toJS(form.itemLayoutOptions));
        this.isAdding = false;
        this.isEditing = false;
    }

    render() {
        let columns = [{
            title: 'Dimension',
            dataIndex: 'dimension',
            key: 'dimension',
          },
          {
            title: 'Label Offset',
            dataIndex: 'labelOffset',
            key: 'labelOffset',
          },
          {
            title: 'Label Span',
            dataIndex: 'labelSpan',
            key: 'labelSpan',
          },
          {
            title: 'Field Offset',
            dataIndex: 'wrapperOffset',
            key: 'wrapperOffset',
          },
          {
            title: 'Field Span',
            dataIndex: 'wrapperSpan',
            key: 'wrapperSpan',
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button shape="circle" type="default" onClick={(e) => {this.setIsEditing(record);}} icon="tool" size="small"  style={{marginRight: '5px'}}></Button>
                    <Button shape="circle" type="danger" onClick={(e) => {this.confirmRemove(record);}} icon="delete" size="small"></Button>
                </span>
            ),
        }];

        let {getFieldDecorator} = this.props.form;
        let {layout} = this.props.store.editorStore.formStore.form;
        let {isAdding, isEditing} = this;

        return <Card size="small" bodyStyle={{padding: 0}}>
            <Table title={() =><strong>Item Layout</strong>} size="small" bordered={false} pagination={false} dataSource={this.currentDimensions} columns={columns}
                rowKey='dimension' expandedRowRender={(record) => <ItemLayoutPreview {...record}/>}
                footer={() => {return this.availableDimensions.length > 0 ? <Button onClick={() => this.setIsAdding()}>Add</Button> : <></>}}/>
            {(isAdding || isEditing) && this.availableDimensions.length > 0 && <Card size="small" title={this.isAdding ? "Add Field Layout" : "Edit Field Layout"} style={{marginTop: '15px'}}>
                    <ItemLayoutPreview formLayout={layout} dimension={ this.dimension } labelOffset={this.labelOffset} labelSpan={this.labelSpan}
                        wrapperOffset={this.wrapperOffset} wrapperSpan={this.wrapperSpan}/>
                    <p>Assign 24 units (aliquots) across the label and field to control how label-field pairs are displayed</p>
                    <Form {...formItemLayout} layout={"horizontal"}>
                        <Form.Item label="Target Screen Width" help={<ul>
                            <li>Extra Small (below 768px)</li>
                            <li>Small (768px - 992px)</li>
                            <li>Medium (992px - 1200px)</li>
                            <li>Large (1200px - 1440px)</li>
                            <li>Extra Large (1440px and above)</li>
                        </ul>}>
                                {
                                getFieldDecorator('dimension', {
                                    initialValue: this.dimension,
                                    rules: [
                                        {type: 'string'},
                                        {required: true, message: 'A dimension'}
                                    ]
                                })(<Select onChange={(e) => {this.onChange('dimension', e)}}>
                                    {this.availableDimensions.map((d) => {
                                        return <Select.Option key={d}>{dimensionNameMap[d]}</Select.Option>
                                    })}
                                </Select>)
                            }
                        </Form.Item>
                        <Form.Item label="Label Offset" help="Left offset for label">
                                {
                                getFieldDecorator('labelOffset', {
                                    initialValue: this.labelOffset,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.onChange('labelOffset', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Label Width" help="Label available width">
                                {
                                getFieldDecorator('labelSpan', {
                                    initialValue: this.labelSpan,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.onChange('labelSpan', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Field Offset" help="Left offset for fields">
                                {
                                getFieldDecorator('wrapperOffset', {
                                    initialValue: this.wrapperOffset,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.onChange('wrapperOffset', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Field width" help="Field available width">
                                {
                                getFieldDecorator('wrapperSpan', {
                                    initialValue: this.wrapperSpan,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={1} max={24} onChange={(e) => {this.onChange('wrapperSpan', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button size="small" type="primary" style={{marginRight: '15px'}} onClick={this.save}>Apply</Button>
                            <Button size="small" type="danger" style={{marginTop: '15px'}} onClick={this.reset}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Card>}
        </Card>
    }
}

const WrappedIItemLayoutViewProps = Form.create<IItemLayoutViewProps>({ name: 'ItemLayoutView' })(ItemLayoutView);
export default WrappedIItemLayoutViewProps;