import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import { Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import RootStore from "../models/RootStore";
import { FieldComponent } from "./Field";

export interface ColumnProps {
    column: Column;
    span: number;
    eventHooks:any;
    store: RootStore;
}

@observer
export class ColumnComponent extends React.Component<ColumnProps, any> {
    state: any;
    props: ColumnProps;

    constructor(props: ColumnProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, column, span, eventHooks} = this.props;

        return  <Col span={span}>
            {column.fields.map((field: Field, fn:number) => {
                return <FieldComponent field={field} store={store} eventHooks={eventHooks}/>
            })}
        </Col>
    }
}