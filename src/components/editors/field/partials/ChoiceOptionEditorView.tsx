import { ChoiceOption } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import { Button, Card, Empty, Icon, Input, Table } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ReactDragListView from "react-drag-listview";
import Highlighter from 'react-highlight-words';

export interface IChoiceOptionEditorProps {
    type: string;
    items: ChoiceOption[];
    onChange: (options: ChoiceOption[]) => void;
}

@observer
export class ChoiceOptionEditorView extends React.Component<IChoiceOptionEditorProps> {
    @observable type: string;
    @observable items : any[];
    @observable label: string;
    @observable value: string;
    @observable isEditing: boolean;
    @observable searchText: string;
    @observable searchInput: any;

    constructor(props: IChoiceOptionEditorProps) {
        super(props);
        this.initialize(props);
    }

    @action initialize(props: IChoiceOptionEditorProps) {
        this.type = props.type;
        this.items = props.items;
        this.value = null;
        this.label = null;
        this.isEditing = false;
    }

    @action.bound move(fromIndex: number, toIndex: number) {
        this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
        this.props.onChange(this.items);
    }

    @action edit(record: ChoiceOption) {
        this.isEditing = true;
        this.label = record.label;
        this.value = record.value;
    }

    @action add() {
        this.items.push({label: this.label, value: this.value});
        this.props.onChange(this.items);
    }

    @action remove(index: number) {
        this.items.splice(index, 1);
        this.props.onChange(this.items);
    }


    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
          setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => { this.searchInput = node; }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
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
    })

    @action handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    @action handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }

    render() {
        let columns = [{
          title: '',
          key: "operate",
          render: (text, record, index) =>
            <span style={{float:'right', marginRight:'20%'}}><Icon className="drag-handle" type="drag"/></span>
        },
          {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
            sorter: true,
            ...this.getColumnSearchProps('label')
          },
          {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            sorter: true,
            ...this.getColumnSearchProps('value')
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button shape="circle" type="default" onClick={() => {this.edit(record);}} icon="tool" size="small" style={{marginLeft:'5px', marginRight: '5px'}}></Button>
                    <Button shape="circle" type="danger" onClick={() => {this.remove(record.index);}} icon="delete" size="small" style={{marginLeft:'5px', marginRight: '5px'}}></Button>
                </span>
            ),
        }];

        let rows = [];
        this.items.forEach((item: ChoiceOption, index: number) => {
            rows.push({index: index, label: item.label, value: item.value, key: index});
        });

        return <div>
            <Card title="Options" style={{padding: 0}}>
                {this.items.length == 0 && <Empty description={
                    <span>No options on this field</span>
                    }>
                </Empty>}
                {this.items.length > 0 && <ReactDragListView onDragEnd={this.move} handleSelector="i" nodeSelector="tr.ant-table-row">
                    <Table size="middle" pagination={rows.length > 5 ? {position: 'bottom'} : false} dataSource={rows} columns={columns} rowKey='key'/>
                  </ReactDragListView>
                }
            </Card>
        </div>
    }
}