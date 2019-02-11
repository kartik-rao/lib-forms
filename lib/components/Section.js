import * as React from "react";
import { Card, Row } from "antd";
import { ColumnComponent } from "./Column";
export class SectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { section, formLayout, conditionals, decorators, eventHooks } = this.props;
        let { showSectionTitles, showSectionBorders } = formLayout;
        const numColumns = section.columns.length;
        return React.createElement(Card, { bordered: showSectionBorders, title: showSectionTitles ? section.name : "" },
            React.createElement(Row, { gutter: 16 }, section.columns.map((column, fn) => {
                return React.createElement(ColumnComponent, { formLayout: formLayout, key: fn, column: column, span: 24 / numColumns, conditionals: conditionals, decorators: decorators, eventHooks: eventHooks });
            })));
    }
}
