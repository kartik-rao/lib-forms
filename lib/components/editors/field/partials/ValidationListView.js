import { ValidationRuleMap } from "@kartikrao/lib-forms-core";
import { Button, Table, Tag } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";
export const ValidationListView = (props) => {
    let columns = [{
            title: 'Rule',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Constraints',
            dataIndex: 'constraint',
            key: 'constraint',
            render: (text, record) => {
                return React.createElement(React.Fragment, null, Object.keys(record.constraint).map((key) => {
                    let value;
                    if (!Array.isArray(record.constraint[key])) {
                        value = [record.constraint[key]];
                    }
                    else {
                        value = record.constraint[key];
                    }
                    return key == 'message' ? null : React.createElement("div", { key: key },
                        React.createElement(Tag, { key: `${key}-k` }, key),
                        React.createElement("span", { key: `${key}-v` }, value.map((v, vi) => {
                            return React.createElement(Tag, { key: `${key}-v-${vi}`, color: "#87d068" }, v);
                        })));
                }));
            }
        },
        {
            title: 'Message',
            dataIndex: 'defaultMessage',
            key: 'defaultMessage',
        },
        {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (React.createElement("span", null,
                React.createElement(Button, { shape: "circle", type: "default", onClick: (e) => { props.onEdit(record.rule); }, icon: "tool", size: "small", style: { marginRight: '5px' } }),
                React.createElement(Button, { shape: "circle", type: "danger", onClick: (e) => { props.onRemove(record.rule); }, icon: "delete", size: "small" })))
        }
    ];
    let numConstraints = 0;
    let rows = [];
    if (props.validation && props.validation.constraints) {
        let { constraints } = props.validation;
        numConstraints = Object.keys(constraints).length;
        Object.keys(constraints).forEach((rule, index) => {
            let row = {};
            let { message } = constraints[rule];
            row.rule = rule;
            row.name = ValidationRuleMap[rule];
            row.key = index;
            row.defaultMessage = message;
            row.constraint = constraints[rule];
            rows.push(row);
        });
    }
    return useObserver(() => {
        return React.createElement(Table, { title: () => React.createElement("span", null, "Validation rules"), size: "small", pagination: numConstraints > 5 ? { position: 'bottom' } : false, dataSource: rows, columns: columns, rowKey: 'key' });
    });
};
