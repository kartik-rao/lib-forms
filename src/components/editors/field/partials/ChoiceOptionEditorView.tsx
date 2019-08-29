import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { Button, Card, Empty, Icon, Input, Table } from "antd";
import Form, { FormComponentProps } from "antd/lib/form/Form";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import ReactDragListView from "react-drag-listview";
import Highlighter from 'react-highlight-words';
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";

export interface IChoiceOptionEditorViewProps {
    type: string;
    items: ChoiceOption[];
    onChange: any;
};

const ChoiceOptionEditorView : React.FC<IChoiceOptionEditorViewProps & FormComponentProps> = (props: IChoiceOptionEditorViewProps & FormComponentProps) => {
    const store = React.useContext(editorStoreContext);
    if (!store) throw new Error("Store is null");
    let {type, items, onChange} = props;
    const localStore = useLocalStore(() => ({
        type: type,
        items: items,
        label: null as string,
        value: null as string,
        isEditing: false,
        searchInput: null as any,
        showAdd: false,
        searchText: null as string,
        showAddChoiceItem: function (show: boolean) {
            this.showAdd = show;
        },
        move: function (fromIndex: number, toIndex: number) {
            this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
            onChange(this.items);
        },
        edit: function (record: ChoiceOption) {
            this.isEditing = true;
            this.label = record.label;
            this.value = record.value;
        },
        addChoiceOption: function (e)  {
            console.log("Adding", e);
            this.items.push({label: this.label, value: this.value});
            onChange(this.items);
        },
        remove: function (index: number) {
            this.items.splice(index, 1);
            onChange(this.items);
        },
        setSearchInput: function (node: React.ReactNode) {
            this.searchInput = node;
        },
        getColumnSearchProps: (dataIndex) => ({
            filterDropdown: ({
                setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
                    <div style={{ padding: 8 }}>
                        <Input ref={node => { this.setSearchInput(node); }} placeholder={`Search ${dataIndex}`}
                            value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                            onPressEnter={() => this.handleSearch(selectedKeys, confirm)} style={{ width: 188, marginBottom: 8, display: 'block' }}
                        />
                        <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)}
                            icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
                            Search
            </Button>
                        <Button onClick={() => this.handleReset(clearFilters)} size="small"
                            style={{ width: 90 }}>Reset</Button>
                    </div>
                ),
            filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) => (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[this.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ),
        }),
        get uniqueValuePattern(): RegExp {
            let allValues = this.items.map((item) => {
                return item.value;
            });
            return new RegExp(`^((?!(${allValues.join("|")})).)*$`, "gi");
        },
        handleSearch: function (selectedKeys, confirm) {
            confirm();
            this.searchText = selectedKeys[0];
        },
        handleReset: function (clearFilters) {
            clearFilters();
            this.searchText = '';
        }
    }));

    return useObserver(() => {
        let rows = [];
        localStore.items.forEach((item: ChoiceOption, index: number) => {
            rows.push({ index: index, label: item.label, value: item.value, key: index });
        });

        let columns = [{
            title: '',
            key: "operate",
            render: (text, record, index) =>
                <span style={{ float: 'right', marginRight: '20%' }}><Icon className="drag-handle" type="drag" /></span>
        },
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            sorter: true,
            ...localStore.getColumnSearchProps('label')
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            sorter: true,
            ...localStore.getColumnSearchProps('value')
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button shape="circle" type="default" onClick={() => { localStore.edit(record); }} icon="tool" size="small" style={{ marginLeft: '5px', marginRight: '5px' }}></Button>
                    <Button shape="circle" type="danger" onClick={() => { localStore.remove(record.index); }} icon="delete" size="small" style={{ marginLeft: '5px', marginRight: '5px' }}></Button>
                </span>
            ),
        }];

        return <Card size="small" bodyStyle={{ padding: 0 }} bordered={false}>
            {localStore.items.length == 0 && <Empty description={
                <span>No options on this field</span>
            }>
            </Empty>}
            {localStore.items.length > 0 && <ReactDragListView onDragEnd={localStore.move} handleSelector="i" nodeSelector="tr.ant-table-row">
                <Table size="small" pagination={rows.length > 5 ? { position: 'bottom' } : false} dataSource={rows} columns={columns} rowKey='key'
                    footer={() => localStore.showAdd ? <></> : <Button size="small" onClick={(e) => localStore.showAddChoiceItem(true)}>Add</Button>} />
            </ReactDragListView>
            }
            {localStore.showAdd && <Card title="Add option" size="small" style={{ marginTop: '15px' }}>
                <Form {...formItemLayout} layout="horizontal" onSubmit={(e) => localStore.addChoiceOption(e)}>
                    <Form.Item help="Enter the label shown to the user (must be unique)" label="Label">
                        {props.form.getFieldDecorator('label', {
                            valuePropName: 'label',
                            rules: [
                                { type: 'string' },
                                { required: true, message: 'A label is required' }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item help="Enter the value that will be submitted (must be unique)" label="Value">
                        {props.form.getFieldDecorator('value', {
                            valuePropName: 'value',
                            rules: [{ type: 'string' },
                            { required: true, message: 'A value is required' },
                            { pattern: localStore.uniqueValuePattern, message: "Invalid value, must be unique" }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="danger" style={{ marginRight: '15px' }} onClick={() => localStore.showAddChoiceItem(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit">Save</Button>
                    </Form.Item>
                </Form></Card>}
        </Card>
    });
}
export default Form.create<FormComponentProps&IChoiceOptionEditorViewProps>()(ChoiceOptionEditorView);

// export interface IChoiceOptionEditorViewProps extends FormComponentProps {
//     type: string;
//     items: ChoiceOption[];
//     onChange: (options: ChoiceOption[]) => void;
// }

// @observer
// class ChoiceOptionEditorViewOld extends React.Component<IChoiceOptionEditorViewProps> {
//     @observable type: string;
//     @observable items : any[];
//     @observable label: string;
//     @observable value: string;
//     @observable isEditing: boolean;
//     @observable searchInput: any;
//     @observable showAdd: boolean;
//     @observable searchText: string;

//     constructor(props: IChoiceOptionEditorViewProps) {
//         super(props);
//         this.initialize(props);
//     }

//     @action showAddChoiceItem = (show: boolean) => {
//         this.showAdd = show;
//     }

//     @action initialize(props: IChoiceOptionEditorViewProps) {
//         this.type = props.type;
//         this.items = props.items;
//         this.value = null;
//         this.label = null;
//         this.isEditing = false;
//     }

//     @action.bound move(fromIndex: number, toIndex: number) {
//         this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
//         this.props.onChange(this.items);
//     }

//     @action edit(record: ChoiceOption) {
//         this.isEditing = true;
//         this.label = record.label;
//         this.value = record.value;
//     }

//     @action addChoiceOption = (e) => {
//         console.log("Adding", e);
//         // this.items.push({label: this.label, value: this.value});
//         // this.props.onChange(this.items);
//     }


//     @action remove(index: number) {
//         this.items.splice(index, 1);
//         this.props.onChange(this.items);
//     }

//     @action.bound setSearchInput(node: React.ReactNode) {
//         this.searchInput = node;
//     }

//     getColumnSearchProps = (dataIndex) => ({
//         filterDropdown: ({
//           setSelectedKeys, selectedKeys, confirm, clearFilters,
//         }) => (
//           <div style={{ padding: 8 }}>
//             <Input ref={node => { this.setSearchInput(node); }} placeholder={`Search ${dataIndex}`}
//               value={selectedKeys[0]} onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//               onPressEnter={() => this.handleSearch(selectedKeys, confirm)} style={{ width: 188, marginBottom: 8, display: 'block' }}
//             />
//             <Button type="primary" onClick={() => this.handleSearch(selectedKeys, confirm)}
//               icon="search" size="small" style={{ width: 90, marginRight: 8 }}>
//               Search
//             </Button>
//             <Button onClick={() => this.handleReset(clearFilters)} size="small"
//               style={{ width: 90 }}>Reset</Button>
//           </div>
//         ),
//         filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
//         onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//         onFilterDropdownVisibleChange: (visible) => {
//           if (visible) {
//             setTimeout(() => this.searchInput.select());
//           }
//         },
//         render: (text) => (
//           <Highlighter
//             highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
//             searchWords={[this.searchText]}
//             autoEscape
//             textToHighlight={text.toString()}
//           />
//         ),
//     })

//     @computed get uniqueValuePattern() : RegExp {
//         let allValues = this.items.map((item) => {
//             return item.value;
//         });
//         return new RegExp(`^((?!(${allValues.join("|")})).)*$`, "gi");
//     }

//     @action handleSearch = (selectedKeys, confirm) => {
//         confirm();
//         this.searchText = selectedKeys[0];
//     }

//     @action handleReset = (clearFilters) => {
//         clearFilters();
//         this.searchText = '';
//     }

//     render() {
//         console.log("COEV - PRERENDER", this.props);
//         let columns = [{
//           title: '',
//           key: "operate",
//           render: (text, record, index) =>
//             <span style={{float:'right', marginRight:'20%'}}><Icon className="drag-handle" type="drag"/></span>
//         },
//           {
//             title: 'Label',
//             dataIndex: 'label',
//             key: 'label',
//             sorter: true,
//             ...this.getColumnSearchProps('label')
//           },
//           {
//             title: 'Value',
//             dataIndex: 'value',
//             key: 'value',
//             sorter: true,
//             ...this.getColumnSearchProps('value')
//           },
//           {
//             title: 'Actions',
//             key: 'action',
//             render: (text, record) => (
//                 <span>
//                     <Button shape="circle" type="default" onClick={() => {this.edit(record);}} icon="tool" size="small" style={{marginLeft:'5px', marginRight: '5px'}}></Button>
//                     <Button shape="circle" type="danger" onClick={() => {this.remove(record.index);}} icon="delete" size="small" style={{marginLeft:'5px', marginRight: '5px'}}></Button>
//                 </span>
//             ),
//         }];

//         let rows = [];
//         this.items.forEach((item: ChoiceOption, index: number) => {
//             rows.push({index: index, label: item.label, value: item.value, key: index});
//         });
//         let {getFieldDecorator} = this.props.form;
//         return <Card size="small" bodyStyle={{padding: 0}} bordered={false}>
//               {this.items.length == 0 && <Empty description={
//                   <span>No options on this field</span>
//                   }>
//               </Empty>}
//               {this.items.length > 0 && <ReactDragListView onDragEnd={this.move} handleSelector="i" nodeSelector="tr.ant-table-row">
//                   <Table size="small" pagination={rows.length > 5 ? {position: 'bottom'} : false} dataSource={rows} columns={columns} rowKey='key'
//                   footer={() => this.showAdd ? <></> : <Button size="small" onClick={(e) => this.showAddChoiceItem(true)}>Add</Button>} />
//                 </ReactDragListView>
//               }
//               {this.showAdd && <Card title="Add option" size="small" style={{marginTop : '15px'}}>
//                 <Form {...formItemLayout} layout="horizontal" onSubmit={(e) => this.addChoiceOption(e)}>
//                     <Form.Item help="Enter the label shown to the user (must be unique)" label="Label">
//                         { getFieldDecorator('label', {
//                             valuePropName: 'label',
//                             rules: [
//                                 {type: 'string'},
//                                 {required: true, message: 'A label is required'}
//                             ]
//                         })(<Input />)}
//                     </Form.Item>
//                     <Form.Item help="Enter the value that will be submitted (must be unique)" label="Value">
//                         { getFieldDecorator('value', {
//                             valuePropName: 'value',
//                             rules: [{type: 'string'},
//                             { required: true, message: 'A value is required' },
//                             { pattern : this.uniqueValuePattern, message: "Invalid value, must be unique"}
//                         ]
//                         })(<Input />)}
//                     </Form.Item>
//                     <Form.Item {...tailFormItemLayout}>
//                         <Button type="danger" style={{marginRight: '15px'}} onClick={() => this.showAddChoiceItem(false)}>Cancel</Button>
//                         <Button type="primary" htmlType="submit">Save</Button>
//                     </Form.Item>
//               </Form></Card>}
//           </Card>
//     }
// }

// const WrappedChoiceOptionEditorView = Form.create<IChoiceOptionEditorViewProps>({ name: 'ChoiceOptionEditorView' })(ChoiceOptionEditorView);
// export default WrappedChoiceOptionEditorView;