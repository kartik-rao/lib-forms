import { Button, Card, Empty, Icon, Input, Table } from "antd";
import Form from "antd/lib/form/Form";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import ReactDragListView from "react-drag-listview";
import Highlighter from 'react-highlight-words';
import { editorStoreContext } from "../../../../store/EditorStoreProvider";
import { formItemLayout, tailFormItemLayout } from "../../common/FormLayoutCommon";
;
const ChoiceOptionEditorView = (props) => {
    const store = React.useContext(editorStoreContext);
    if (!store)
        throw new Error("Store is null");
    let { type, items, onChange } = props;
    const localStore = useLocalStore(() => ({
        type: type,
        items: items,
        label: null,
        value: null,
        isEditing: false,
        searchInput: null,
        showAdd: false,
        searchText: null,
        showAddChoiceItem: function (show) {
            this.showAdd = show;
        },
        move: function (fromIndex, toIndex) {
            this.items.splice(toIndex, 0, this.items.splice(fromIndex, 1)[0]);
            onChange(this.items);
        },
        edit: function (record) {
            this.isEditing = true;
            this.label = record.label;
            this.value = record.value;
        },
        addChoiceOption: function (e) {
            e.preventDefault();
            e.stopPropagation();
            store.selectedField.componentProps.options.push({ label: this.label, value: this.value });
            this.showAdd = false;
        },
        remove: function (index) {
            store.selectedField.componentProps.options.splice(index, 1);
        },
        setSearchInput: function (node) {
            this.searchInput = node;
        },
        getColumnSearchProps: (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (React.createElement("div", { style: { padding: 8 } },
                React.createElement(Input, { ref: node => { localStore.setSearchInput(node); }, placeholder: `Search ${dataIndex}`, value: selectedKeys[0], onChange: e => setSelectedKeys(e.target.value ? [e.target.value] : []), onPressEnter: () => localStore.handleSearch(selectedKeys, confirm), style: { width: 188, marginBottom: 8, display: 'block' } }),
                React.createElement(Button, { type: "primary", onClick: () => localStore.handleSearch(selectedKeys, confirm), icon: "search", size: "small", style: { width: 90, marginRight: 8 } }, "Search"),
                React.createElement(Button, { onClick: () => localStore.handleReset(clearFilters), size: "small", style: { width: 90 } }, "Reset"))),
            filterIcon: filtered => React.createElement(Icon, { type: "search", style: { color: filtered ? '#1890ff' : undefined } }),
            onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: (visible) => {
                if (visible) {
                    setTimeout(() => localStore.searchInput.select());
                }
            },
            render: (text) => (React.createElement(Highlighter, { highlightStyle: { backgroundColor: '#ffc069', padding: 0 }, searchWords: [localStore.searchText], autoEscape: true, textToHighlight: text ? text.toString() : "" })),
        }),
        get uniqueValuePattern() {
            let allValues = localStore.items.map((item) => {
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
        },
        get rows() {
            let rows = [];
            this.items.forEach((item, index) => {
                rows.push({ index: index, label: item.label, value: item.value, key: index });
            });
            return rows;
        }
    }));
    let columns = [{
            title: '',
            key: "operate",
            render: (text, record, index) => React.createElement("span", { style: { float: 'right', marginRight: '20%' } },
                React.createElement(Icon, { className: "drag-handle", type: "drag" }))
        }, Object.assign({ title: 'Label', dataIndex: 'label', key: 'label', sorter: true }, localStore.getColumnSearchProps('label')), Object.assign({ title: 'Value', dataIndex: 'value', key: 'value', sorter: true }, localStore.getColumnSearchProps('value')), {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (React.createElement("span", null,
                React.createElement(Button, { shape: "circle", type: "default", onClick: () => { localStore.edit(record); }, icon: "tool", size: "small", style: { marginLeft: '5px', marginRight: '5px' } }),
                React.createElement(Button, { shape: "circle", type: "danger", onClick: () => { localStore.remove(record.index); }, icon: "delete", size: "small", style: { marginLeft: '5px', marginRight: '5px' } })))
        }];
    return useObserver(() => {
        return React.createElement(Card, { size: "small", bodyStyle: { padding: 0 }, bordered: false },
            localStore.items.length == 0 && React.createElement(Empty, { description: React.createElement("span", null, "No options on this field") }),
            localStore.items.length > 0 && React.createElement(ReactDragListView, { onDragEnd: localStore.move, handleSelector: "i", nodeSelector: "tr.ant-table-row" },
                React.createElement(Table, { size: "small", pagination: localStore.rows.length > 5 ? { position: 'bottom' } : false, dataSource: localStore.rows, columns: columns, rowKey: 'key', footer: () => localStore.showAdd ? React.createElement(React.Fragment, null) : React.createElement(Button, { size: "small", onClick: (e) => localStore.showAddChoiceItem(true) }, "Add") })),
            localStore.showAdd && React.createElement(Card, { title: "Add option", size: "small", style: { marginTop: '15px' } },
                React.createElement(Form, Object.assign({}, formItemLayout, { layout: "horizontal", onSubmit: (e) => localStore.addChoiceOption(e) }),
                    React.createElement(Form.Item, { help: "Enter the label shown to the user (must be unique)", label: "Label" }, props.form.getFieldDecorator('label', {
                        valuePropName: 'label',
                        rules: [
                            { type: 'string' },
                            { required: true, message: 'A label is required' }
                        ]
                    })(React.createElement(Input, { onChange: (e) => { localStore.label = e.target.value; } }))),
                    React.createElement(Form.Item, { help: "Enter the value that will be submitted (must be unique)", label: "Value" }, props.form.getFieldDecorator('value', {
                        valuePropName: 'value',
                        rules: [{ type: 'string' },
                            { required: true, message: 'A value is required' },
                            { pattern: localStore.uniqueValuePattern, message: "Invalid value, must be unique" }
                        ]
                    })(React.createElement(Input, { onChange: (e) => { localStore.value = e.target.value; } }))),
                    React.createElement(Form.Item, Object.assign({}, tailFormItemLayout),
                        React.createElement(Button, { type: "danger", style: { marginRight: '15px' }, onClick: () => localStore.showAddChoiceItem(false) }, "Cancel"),
                        React.createElement(Button, { type: "primary", htmlType: "submit" }, "Save")))));
    });
};
export default Form.create()(ChoiceOptionEditorView);
