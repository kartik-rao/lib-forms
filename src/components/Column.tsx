import * as React from "react";
import {Col} from "antd";

import {IField, IColumn, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {FieldComponent} from "./Field";

export interface ColumnProps {
    column: IColumn;
    formLayout: FormLayoutOptions;
    span: number;
    decorators: any;
    eventHooks:any;
    conditionals:any;
}

export class ColumnComponent extends React.Component<ColumnProps, any> {
    state: any;
    props: ColumnProps;

    constructor(props: ColumnProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {column, formLayout, span, conditionals, decorators, eventHooks} = this.props;
        return  <Col span={span}>
            {column.fields.map((field: IField, fn:number) => {
                return <FieldComponent field={field} key={fn} formLayout={formLayout} conditionals={conditionals} decorators={decorators} eventHooks={eventHooks}/>
            })}
        </Col>
    }
}