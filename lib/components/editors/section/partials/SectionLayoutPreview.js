import * as React from "react";
import { Card, Row, Col } from "antd";
export class SectionLayoutPreview extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { gutter, colspans } = this.props;
        let colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];
        return React.createElement(Card, { title: "Preview", size: "small", bordered: false },
            React.createElement(Row, { className: "fl-layout-demo-row", gutter: gutter }, colspans.map((span, ci) => {
                return React.createElement(Col, { key: ci, span: span },
                    React.createElement("div", { style: { minHeight: '50px', padding: '5px 10px', background: ci % 2 == 0 ? colors[0] : colors[1] } },
                        React.createElement("strong", { style: { color: 'white' } },
                            ci + 1,
                            " - ",
                            (100 * (span) / 24).toFixed(2),
                            "%")));
            })));
    }
}
