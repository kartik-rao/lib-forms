import { Button, Card, Form, Modal, Select, Slider, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { action, computed, observable, set } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { ItemLayoutPreview } from "./ItemLayoutPreview";
import { ItemLayoutOptions, ScreenWidth, AllScreenWidths } from "@kartikrao/lib-forms-core";

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

@observer
export class ItemLayoutView extends React.Component<IItemLayoutViewProps, any> {

    @observable isAdding : boolean;
    @observable isEditing : boolean;
    @observable dimension : ScreenWidth;
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

    @computed get currentDimensions() : ScreenWidth[] {
        let {labelCol, wrapperCol} = this.props.itemLayoutOptions;
        let rows = [];
        let dMap = {};
        Object.keys(labelCol).forEach((d) => {
            dMap[d] = {formLayout: this.props.formLayout, dimension: d, labelSpan: labelCol[d].span, labelOffset: labelCol[d].offset || 0};
        });
        Object.keys(wrapperCol).forEach((d) => {
            dMap[d]['wrapperSpan'] =  wrapperCol[d].span;
            dMap[d]['wrapperOffset'] = wrapperCol[d].offset || 0;
            rows.push(dMap[d]);
        });
        return rows;
    }

    @computed get availableDimensions() : ScreenWidth[] {
        let {labelCol} = this.props.itemLayoutOptions;
        let usedDimensions = Object.keys(labelCol);
        let available: ScreenWidth[] = (AllScreenWidths as ScreenWidth[]).filter((d) => {
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
        let {itemLayoutOptions} = this.props;
        itemLayoutOptions.labelCol[record.dimension] = null;
        itemLayoutOptions.wrapperCol[record.dimension] = null;
        this.props.onSave(itemLayoutOptions);
    }

    @action save = () => {
        let {itemLayoutOptions} = this.props;
        itemLayoutOptions.wrapperCol[this.dimension] = {span: this.wrapperSpan, offset: this.wrapperOffset}
        itemLayoutOptions.labelCol[this.dimension] = {span: this.labelSpan, offset: this.labelOffset}
        this.isAdding = false;
        this.isEditing = false;
        console.log("Pre Save", itemLayoutOptions);
        this.props.onSave(itemLayoutOptions);
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

        return <Card size="small" bodyStyle={{padding: 0}}>
            <Table title={() =><span>Field Layouts <small>click (+) to see preview</small></span>} size="small" bordered={false} pagination={false} dataSource={this.currentDimensions} columns={columns}
                rowKey='dimension' expandedRowRender={(record) => <ItemLayoutPreview {...record}/>}
                footer={() => {return this.availableDimensions.length > 0 ? <Button onClick={() => this.setIsAdding()}>Add</Button> : <></>}}/>
            {(isAdding || isEditing) && this.availableDimensions.length > 0 && <Card size="small" title={this.isAdding ? "Add Field Layout" : "Edit Field Layout"} style={{marginTop: '15px'}}>
                    <ItemLayoutPreview formLayout={this.props.formLayout} itemLayoutOptions={this.props.itemLayoutOptions} dimension={ this.dimension }/>
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