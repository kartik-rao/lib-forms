import { ValidationRule, ValidationRuleMap } from "@kartikrao/lib-forms-core";
import { Button, Table, Tag } from "antd";
import { useObserver } from "mobx-react";
import * as React from "react";

export interface IValidationListViewProps {
    validation: ValidationRule;
    onRemove: (rule: string) => void;
    onEdit: (rule: string) => void;
}

export const ValidationListView : React.FC<IValidationListViewProps> = (props: IValidationListViewProps) => {
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
            return <>
                    {Object.keys(record.constraint).map((key) => {
                        let value;
                        if(!Array.isArray(record.constraint[key])) {
                            value = [record.constraint[key]];
                        } else {
                            value = record.constraint[key]
                        }
                        return key == 'message' ? null : <div key={key}>
                            <Tag key={`${key}-k`}>{key}</Tag>
                            <span key={`${key}-v`}>{
                                value.map((v, vi) => {
                                    return <Tag key={`${key}-v-${vi}`} color="#87d068">{v}</Tag>
                                })
                            }</span>
                        </div>
                    })}
                </>
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
        render: (text, record) => (
            <span>
                <Button shape="circle" type="default" onClick={(e) => {props.onEdit(record.rule);}} icon="tool" size="small"  style={{marginRight: '5px'}}></Button>
                <Button shape="circle" type="danger" onClick={(e) => {props.onRemove(record.rule);}} icon="delete" size="small"></Button>
            </span>
        )
        }
    ];

    let numConstraints = 0;
    let rows = [];
    if (props.validation && props.validation.constraints) {
        let {constraints} = props.validation;
        numConstraints = Object.keys(constraints).length;
        Object.keys(constraints).forEach((rule: string, index: number) => {
            let row: any = {};
            let {message} = constraints[rule];
            row.rule = rule;
            row.name = ValidationRuleMap[rule];
            row.key = index;
            row.defaultMessage = message;
            row.constraint = constraints[rule];
            rows.push(row);
        });
    }
    return useObserver(() => {
        return <Table title={() => <span>Validation rules</span>} size="small" pagination={numConstraints > 5 ? {position: 'bottom'} : false} dataSource={rows} columns={columns} rowKey='key'/>
    });
}
