import { ItemLayoutOptions, ScreenWidth, AllScreenWidths } from "@kartikrao/lib-forms-core";
import { Button, Card, Form, Modal, Select, Slider, Table } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { ItemLayoutPreview } from "./ItemLayoutPreview";
import { toJS } from 'mobx';

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

const ItemLayoutView =  (props: IItemLayoutViewProps&FormComponentProps) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    const localStore = useLocalStore(() => ({
        isAdding : false,
        isEditing : false,
        selectedDimension : null as ScreenWidth,
        itemLayout: new ItemLayoutOptions({}),
        setDimension : function(dimension: ScreenWidth) {
            this.selectedDimension = dimension;
        },
        setLayoutProperty : function (key: string, value: any) {
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
        },
        get asRows() : any[] {
            let {labelCol, wrapperCol} = props.itemLayoutOptions;
            let rows = [];
            let dMap = {};

            labelCol && labelCol.used.forEach((d) => {
                if(!dMap[d]) {dMap[d] = {
                    formLayout: props.formLayout,
                    dimension: d
                }}
                dMap[d]["labelSpan"] = labelCol[d] ? labelCol[d].span : 4,
                dMap[d]["labelOffset"] = labelCol[d] ? labelCol[d].offset : 0
            })
            wrapperCol && wrapperCol.used.forEach((d) => {
                if(!dMap[d]) {dMap[d] = {
                    formLayout: props.formLayout,
                    dimension: d
                }}
                dMap[d]["wrapperSpan"] = wrapperCol[d] ? wrapperCol[d].span : 8,
                dMap[d]["wrapperOffset"] = wrapperCol[d] ? wrapperCol[d].offset : 0
            });
            Object.keys(dMap).forEach((d) => {
                rows.push(dMap[d]);
            })
            return rows;
        },
        get availableDimensions() : ScreenWidth[] {
            let {wrapperCol} = props.itemLayoutOptions;
            return wrapperCol ? wrapperCol.unused : AllScreenWidths;
        },
        setIsAdding : function () {
            let dimension = this.availableDimensions[0];
            // Initialize defaults for this dimension
            this.itemLayout.wrapperCol.add(dimension, {offset:0, span:12});
            this.itemLayout.labelCol.add(dimension, {offset:0, span:12});
            this.selectedDimension = dimension;
            // Now the layout editor form should render
            this.isAdding = true;
        },
        reset : function () {
            this.isAdding = false;
            this.isEditing = false;
            this.itemLayout = new ItemLayoutOptions({});
            this.selectedDimension = null;
        },
        setIsEditing : function (record: any) {
            this.selectedDimension = record.dimension;
            this.itemLayout.wrapperCol.add(record.dimension, props.itemLayoutOptions.wrapperCol[record.dimension]);
            this.itemLayout.labelCol.add(record.dimension, props.itemLayoutOptions.labelCol[record.dimension]);
            this.isEditing = true;
        },
        confirmRemove : function (record: any) {
            let self = this;
            Modal.confirm({
                title: `Are you sure ?`,
                content: `Clicking OK will remove field layout targeting "${dimensionNameMap[record.dimension]}"`,
                onOk() {
                    self.remove(record);
                },
                onCancel() {},
            });
        },
        remove : function (record: any) {
            let {itemLayoutOptions} = props;
            itemLayoutOptions.labelCol[record.dimension] = null;
            itemLayoutOptions.wrapperCol[record.dimension] = null;
            props.onSave(itemLayoutOptions);
        },
        save : function () {
            this.isAdding = false;
            this.isEditing = false;
            props.onSave(this.itemLayout);
            this.reset();
        }
    }));

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
                <Button shape="circle" type="default" onClick={(e) => {localStore.setIsEditing(record);}} icon="tool" size="small"  style={{marginRight: '5px'}}></Button>
                <Button shape="circle" type="danger" onClick={(e) => {localStore.confirmRemove(record);}} icon="delete" size="small"></Button>
            </span>
        ),
    }];

    let {getFieldDecorator} = props.form;
    console.log("Selected Dimension", localStore.selectedDimension);
    return useObserver(() => {
        return <Card size="small" bodyStyle={{padding: 0}}>
        <Table title={() =><span>Field Layouts <small>click (+) to see preview</small></span>} size="small" bordered={false} pagination={false} dataSource={localStore.asRows} columns={columns}
            defaultExpandAllRows={false} rowKey='dimension'
            expandedRowRender={(record) => <ItemLayoutPreview  formLayout={props.formLayout} dimension={record.dimension} itemLayoutOptions={props.itemLayoutOptions}/>}
            footer={() => {return localStore.availableDimensions.length > 0 ? <Button onClick={() => localStore.setIsAdding()}>Add</Button> : <></>}}/>
        {(localStore.isAdding || localStore.isEditing) && localStore.selectedDimension && <Card size="small" title={localStore.isAdding ? "Add Field Layout" : `Edit Field Layout - ${localStore.selectedDimension}`} style={{marginTop: '15px'}}>
                <ItemLayoutPreview formLayout={props.formLayout} itemLayoutOptions={localStore.itemLayout} dimension={ localStore.selectedDimension }/>
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
                                initialValue: localStore.selectedDimension,
                                rules: [
                                    {type: 'string'},
                                    {required: true, message: 'A dimension'}
                                ]
                            })(<Select onChange={(e) => {localStore.setDimension(e as ScreenWidth)}}>
                                {localStore.availableDimensions.map((d) => {
                                    return <Select.Option key={d}>{dimensionNameMap[d]}</Select.Option>
                                })}
                            </Select>)
                        }
                    </Form.Item>
                    <Form.Item label="Label Offset" help="Left offset for label">
                            {
                            getFieldDecorator('labelOffset', {
                                initialValue: localStore.itemLayout.labelCol[localStore.selectedDimension] ? localStore.itemLayout.labelCol[localStore.selectedDimension].offset : 0,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24} onChange={(e) => {localStore.setLayoutProperty('labelOffset', e)}}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Label Width" help="Label available width">
                            {
                            getFieldDecorator('labelSpan', {
                                initialValue: localStore.itemLayout.labelCol[localStore.selectedDimension] ? localStore.itemLayout.labelCol[localStore.selectedDimension].span : 4,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24} onChange={(e) => {localStore.setLayoutProperty('labelSpan', e)}}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Field Offset" help="Left offset for fields">
                            {
                            getFieldDecorator('wrapperOffset', {
                                initialValue: localStore.itemLayout.wrapperCol[localStore.selectedDimension] ? localStore.itemLayout.wrapperCol[localStore.selectedDimension].offset : 2,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={0} max={24} onChange={(e) => {localStore.setLayoutProperty('wrapperOffset', e)}}/>)
                        }
                    </Form.Item>
                    <Form.Item label="Field width" help="Field available width">
                            {
                            getFieldDecorator('wrapperSpan', {
                                initialValue: localStore.itemLayout.wrapperCol[localStore.selectedDimension] ? localStore.itemLayout.wrapperCol[localStore.selectedDimension].span : 8,
                                rules: [
                                    {type: 'number'}
                                ]
                            })(<Slider step={1} min={1} max={24} onChange={(e) => {localStore.setLayoutProperty('wrapperSpan', e)}}/>)
                        }
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button size="small" type="primary" style={{marginRight: '15px'}} onClick={localStore.save}>Save</Button>
                        <Button size="small" type="danger" style={{marginTop: '15px'}} onClick={localStore.reset}>Cancel</Button>
                    </Form.Item>
                </Form>
            </Card>}
        </Card>
    });
}

export default Form.create<IItemLayoutViewProps&FormComponentProps>()(ItemLayoutView);

