import { Button, Table } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import ValidationRule, { ValidationRuleMap } from "@kartikrao/lib-forms-core/lib/models/validation";

export interface IValidationListViewProps {
    validation: ValidationRule;
    onRemove: (rule: string) => void;
    onEdit: (rule: string) => void;
}

@observer
export class ValidationListView extends React.Component<IValidationListViewProps, any> {
    constructor(props: IValidationListViewProps) {
        super(props);
    }

    render() {
        let columns = [{
            title: 'Rule',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Message',
            dataIndex: 'defaultMessage',
            key: 'defaultMessage',
          },
          {
            title: 'Constraints',
            dataIndex: 'constraint',
            key: 'constraint',
            render: (text, record) => {
                return <ul>
                        {Object.keys(record.constraint).map((key) => {
                            return key == 'message' ? null : <li key={key}>{key} - {record.constraint[key]}</li>;
                        })}
                    </ul>
                }
          },
          {
            title: 'Actions',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button shape="circle" type="default" onClick={(e) => {this.props.onEdit(record.rule);}} icon="tool" size="small"  style={{marginRight: '5px'}}></Button>
                    <Button shape="circle" type="danger" onClick={(e) => {this.props.onRemove(record.rule);}} icon="delete" size="small"></Button>
                </span>
            ),
          }];

        let numConstraints = 0;
        let rows = [];
        if (this.props.validation && this.props.validation.constraints) {
            let {constraints} = this.props.validation;
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
        return <Table bordered={true} pagination={numConstraints > 5 ? {position: 'bottom'} : false} dataSource={rows} columns={columns} rowKey='key'/>
    }
}