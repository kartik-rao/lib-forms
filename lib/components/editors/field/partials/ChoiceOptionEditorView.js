var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Button, Card, Empty, Icon, Input, Table } from "antd";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import ReactDragListView from "react-drag-listview";
import Highlighter from 'react-highlight-words';
let ChoiceOptionEditorView = class ChoiceOptionEditorView extends React.Component {
    constructor(props) {
        super(props);
        this.getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }) => (React.createElement("div", { style: { padding: 8 } },
                React.createElement(Input, { ref: node => { this.setSearchInput(node); }, placeholder: `Search ${dataIndex}`, value: selectedKeys[0], onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => this.handleSearch(selectedKeys, confirm), style: { width: 188, marginBottom: 8, display: 'block' } }),
                React.createElement(Button, { type: "primary", onClick: () => this.handleSearch(selectedKeys, confirm), icon: "search", size: "small", style: { width: 90, marginRight: 8 } }, "Search"),
                React.createElement(Button, { onClick: () => this.handleReset(clearFilters), size: "small", style: { width: 90 } }, "Reset"))),
            filterIcon: filtered => React.createElement(Icon, { type: "search", style: { color: filtered ? '#1890ff' : undefined } }),
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => this.searchInput.select());
                }
            },
            render: (text) => (React.createElement(Highlighter, { highlightStyle: { backgroundColor: '#ffc069', padding: 0 }, searchWords: [this.searchText], autoEscape: true, textToHighlight: text.toString() })),
        });
        this.handleSearch = (selectedKeys, confirm) => {
            confirm();
            this.setState({ searchText: selectedKeys[0] });
        };
        this.handleReset = (clearFilters) => {
            clearFilters();
            this.setState({ searchText: '' });
        };
        this.initialize(props);
    }
    initialize(props) {
        this.type = props.type;
        this.items = props.items;
        this.value = null;
        this.label = null;
        this.isEditing = false;
    }
    move(fromIndex, toIndex) {
        this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
        this.props.onChange(this.items);
    }
    edit(record) {
        this.isEditing = true;
        this.label = record.label;
        this.value = record.value;
    }
    add() {
        this.items.push({ label: this.label, value: this.value });
        this.props.onChange(this.items);
    }
    remove(index) {
        this.items.splice(index, 1);
        this.props.onChange(this.items);
    }
    setSearchInput(node) {
        this.searchInput = node;
    }
    render() {
        console.log("COEV - PRERENDER", this.props);
        let columns = [{
                title: '',
                key: "operate",
                render: (text, record, index) => React.createElement("span", { style: { float: 'right', marginRight: '20%' } },
                    React.createElement(Icon, { className: "drag-handle", type: "drag" }))
            }, Object.assign({ title: 'Label', dataIndex: 'label', key: 'label', sorter: true }, this.getColumnSearchProps('label')), Object.assign({ title: 'Value', dataIndex: 'value', key: 'value', sorter: true }, this.getColumnSearchProps('value')), {
                title: 'Actions',
                key: 'action',
                render: (text, record) => (React.createElement("span", null,
                    React.createElement(Button, { shape: "circle", type: "default", onClick: () => { this.edit(record); }, icon: "tool", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }),
                    React.createElement(Button, { shape: "circle", type: "danger", onClick: () => { this.remove(record.index); }, icon: "delete", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }))),
            }];
        let rows = [];
        this.items.forEach((item, index) => {
            rows.push({ index: index, label: item.label, value: item.value, key: index });
        });
        return React.createElement("div", null,
            React.createElement(Card, { title: "Options", size: "small", bodyStyle: { padding: 0 } },
                this.items.length == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No options on this field") }),
                this.items.length > 0 && React.createElement(ReactDragListView, { onDragEnd: this.move, handleSelector: "i", nodeSelector: "tr.ant-table-row" },
                    React.createElement(Table, { size: "small", pagination: rows.length > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key' }))));
    }
};
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "type", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "items", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "label", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "value", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "isEditing", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "searchText", void 0);
__decorate([
    observable
], ChoiceOptionEditorView.prototype, "searchInput", void 0);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "initialize", null);
__decorate([
    action.bound
], ChoiceOptionEditorView.prototype, "move", null);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "edit", null);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "add", null);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "remove", null);
__decorate([
    action.bound
], ChoiceOptionEditorView.prototype, "setSearchInput", null);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "handleSearch", void 0);
__decorate([
    action
], ChoiceOptionEditorView.prototype, "handleReset", void 0);
ChoiceOptionEditorView = __decorate([
    observer
], ChoiceOptionEditorView);
export { ChoiceOptionEditorView };
