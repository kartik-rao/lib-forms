import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
import { Button, Card, Form, Modal, Select, Slider, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { action, computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { ItemLayoutPreview } from "./ItemLayoutPreview";


export interface IItemLayoutViewProps extends FormComponentProps {
    formLayout: string;
    itemLayoutOptions: ItemLayoutOptions;
    onSave: (item: ItemLayoutOptions) => void;
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

let defaultDimensions = {
    'vertical': {offset:0, span:12},
    'horizontal': {offset:0, span:10}
};

@observer
export class ItemLayoutView extends React.Component<IItemLayoutViewProps, any> {

    @observable isAdding : boolean;
    @observable isEditing : boolean;
    @observable selectedDimension : ScreenWidth;
    @observable itemLayout: ItemLayoutOptions;

    @action setDimension = (dimension: ScreenWidth) => {
        this.selectedDimension = dimension;
    }

    @action.bound setLayoutProperty = (key: string, value: any) => {
        let target;
        let {selectedDimension} = this;
        if (key.indexOf('wrapper') > -1) {
            target = this.itemLayout.wrapperCol[selectedDimension];
        } else {
            target = this.itemLayout.labelCol[selectedDimension];
        }

        if (key.indexOf('Span') > -1) {
            target.span = value;
        } else {
            target.offset = value;
        }
        return;
    }

    @action initialize({itemLayoutOptions}) {
        this.itemLayout = new ItemLayoutOptions({});
    }

    constructor(props: IItemLayoutViewProps) {
        super(props);
        this.initialize(props);
    }

    @computed get asRows() : any[] {
        let {labelCol, wrapperCol} = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};

        wrapperCol.used.forEach((d) => {
            dMap[d] = {
                formLayout: this.props.formLayout,
                dimension: d,
                labelSpan: labelCol[d].span,
                labelOffset: labelCol[d].offset || 0,
                wrapperOffset : wrapperCol[d].offset || 0,
                wrapperSpan: wrapperCol[d].span,
            };
            rows.push(dMap[d]);
        });
        return rows;
    }

    @computed get availableDimensions() : ScreenWidth[] {
        let {wrapperCol} = this.props.itemLayoutOptions;
        return wrapperCol.unused;
    }


    @action setIsAdding = () => {
        let dimension = this.availableDimensions[0];
        // Initialize defaults for this dimension
        this.itemLayout.wrapperCol.add(dimension, {offset:0, span:12});
        this.itemLayout.labelCol.add(dimension, {offset:0, span:12});

        this.selectedDimension = dimension;
        // Now the layout editor form should render
        this.isAdding = true;
    }

    @action reset = () => {
        this.isAdding = false;
        this.isEditing = false;
        this.itemLayout = new ItemLayoutOptions({});
        this.selectedDimension = null;
    }

    @action setIsEditing = (record: any) => {
        this.selectedDimension = record.dimension;
        this.itemLayout.wrapperCol.add(record.dimension, this.props.itemLayoutOptions.wrapperCol[record.dimension]);
        this.itemLayout.labelCol.add(record.dimension, this.props.itemLayoutOptions.labelCol[record.dimension]);
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
        let {itemLayoutOptions} = this.props;
        itemLayoutOptions.labelCol[record.dimension] = null;
        itemLayoutOptions.wrapperCol[record.dimension] = null;
        this.props.onSave(itemLayoutOptions);
    }

    @action save = () => {
        this.isAdding = false;
        this.isEditing = false;
        this.props.onSave(this.itemLayout);
        this.reset();
    }

    render() {
        let columns = [{
            title: 'Dimension',
            dataIndex: 'dimension',
            key: 'dimension'
          },
          {title: 'Label', children: [
                {
                title: 'Offset',
                dataIndex: 'labelOffset',
                key: 'labelOffset',
              },
              {
                title: 'Span',
                dataIndex: 'labelSpan',
                key: 'labelSpan',
              }
          ]},
          {
              title: 'Field',
              children: [
                  {
                    title: 'Offset',
                    dataIndex: 'wrapperOffset',
                    key: 'wrapperOffset',
                  },
                  {
                    title: 'Span',
                    dataIndex: 'wrapperSpan',
                    key: 'wrapperSpan',
                  }
              ]
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
        let {isAdding, isEditing} = this;
        let {labelCol, wrapperCol} = this.itemLayout;

        return <Card size="small" bodyStyle={{padding: 0}}>
            <Table title={() =><span>Field Layouts <small>click (+) to see preview</small></span>} size="small" bordered={false} pagination={false} dataSource={this.asRows} columns={columns}
                defaultExpandAllRows={false} rowKey='dimension'
                expandedRowRender={(record) => <ItemLayoutPreview  formLayout={this.props.formLayout} dimension={record.dimension} itemLayoutOptions={this.props.itemLayoutOptions}/>}
                footer={() => {return this.availableDimensions.length > 0 ? <Button onClick={() => this.setIsAdding()}>Add</Button> : <></>}}/>
            {(isAdding || isEditing) && this.selectedDimension && <Card size="small" title={this.isAdding ? "Add Field Layout" : `Edit Field Layout - ${this.selectedDimension}`} style={{marginTop: '15px'}}>
                    <ItemLayoutPreview formLayout={this.props.formLayout} itemLayoutOptions={this.itemLayout} dimension={ this.selectedDimension }/>
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
                                    initialValue: this.selectedDimension,
                                    rules: [
                                        {type: 'string'},
                                        {required: true, message: 'A dimension'}
                                    ]
                                })(<Select onChange={(e) => {this.setDimension(e as ScreenWidth)}}>
                                    {this.availableDimensions.map((d) => {
                                        return <Select.Option key={d}>{dimensionNameMap[d]}</Select.Option>
                                    })}
                                </Select>)
                            }
                        </Form.Item>
                        <Form.Item label="Label Offset" help="Left offset for label">
                                {
                                getFieldDecorator('labelOffset', {
                                    initialValue: labelCol[this.selectedDimension].offset || 0,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.setLayoutProperty('labelOffset', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Label Width" help="Label available width">
                                {
                                getFieldDecorator('labelSpan', {
                                    initialValue: labelCol[this.selectedDimension].span || 0,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.setLayoutProperty('labelSpan', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Field Offset" help="Left offset for fields">
                                {
                                getFieldDecorator('wrapperOffset', {
                                    initialValue: wrapperCol[this.selectedDimension].offset || 0,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={0} max={24} onChange={(e) => {this.setLayoutProperty('wrapperOffset', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item label="Field width" help="Field available width">
                                {
                                getFieldDecorator('wrapperSpan', {
                                    initialValue: wrapperCol[this.selectedDimension].span || 0,
                                    rules: [
                                        {type: 'number'}
                                    ]
                                })(<Slider step={1} min={1} max={24} onChange={(e) => {this.setLayoutProperty('wrapperSpan', e)}}/>)
                            }
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            <Button size="small" type="primary" style={{marginRight: '15px'}} onClick={this.save}>Save</Button>
                            <Button size="small" type="danger" style={{marginTop: '15px'}} onClick={this.reset}>Cancel</Button>
                        </Form.Item>
                    </Form>
                </Card>}
        </Card>
    }
}

const WrappedIItemLayoutViewProps = Form.create<IItemLayoutViewProps>({ name: 'ItemLayoutView' })(ItemLayoutView);
export default WrappedIItemLayoutViewProps;