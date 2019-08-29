import * as React from "react";
import { Card, Row, Col } from "antd";
import { useObserver } from 'mobx-react';
const colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];
export const SectionLayoutPreview = (props) => {
    return useObserver(() => {
        return React.createElement(Card, { title: "Preview", size: "small", bordered: false },
            React.createElement(Row, { className: "fl-layout-demo-row", gutter: props.gutter }, Object.keys(props.colspans).map((key, index) => {
                return React.createElement(Col, { key: key, span: props.colspans[key] },
                    React.createElement("div", { style: { minHeight: '50px', padding: '5px 10px', background: index % 2 == 0 ? colors[0] : colors[1] } },
                        React.createElement("strong", { style: { color: 'white' } },
                            index + 1,
                            " - ",
                            (100 * (props.colspans[key]) / 24).toFixed(2),
                            "%")));
            })));
    });
};
