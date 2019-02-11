import * as React from "react";
import { Col } from "antd";
import { FieldComponent } from "./Field";
export class ColumnComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { column, formLayout, span, conditionals, decorators, eventHooks } = this.props;
        return React.createElement(Col, { span: span }, column.fields.map((field, fn) => {
            return React.createElement(FieldComponent, { field: field, key: fn, formLayout: formLayout, conditionals: conditionals, decorators: decorators, eventHooks: eventHooks });
        }));
    }
}
