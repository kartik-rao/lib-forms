import { Col, Row } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
export const ItemLayoutPreview = (props) => {
    const localStore = useLocalStore(() => ({
        get shouldRender() {
            let { formLayout, itemLayoutOptions, dimension } = props;
            return formLayout && itemLayoutOptions && dimension && !!itemLayoutOptions.wrapperCol[dimension];
        }
    }));
    let { formLayout, dimension } = props;
    let { wrapperCol, labelCol } = props.itemLayoutOptions;
    let wrapperSpan = wrapperCol[dimension].span;
    let wrapperOffset = wrapperCol[dimension].offset || 0;
    let labelSpan = labelCol[dimension].span;
    let labelOffset = labelCol[dimension].offset || 0;
    return useObserver(() => {
        return React.createElement("div", { style: { background: '#ffff' } },
            localStore.shouldRender && formLayout == 'horizontal' && React.createElement(Row, { className: "fl-layout-demo-row" },
                React.createElement(Col, { span: labelOffset }, '\u00A0'),
                React.createElement(Col, { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                    React.createElement("strong", { style: { color: 'white' } },
                        "Label - ",
                        (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                        "%")),
                React.createElement(Col, { span: wrapperOffset }, '\u00A0'),
                React.createElement(Col, { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                    React.createElement("strong", { style: { color: 'white' } },
                        "Field - ",
                        (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                        "%"))),
            localStore.shouldRender && formLayout == 'vertical' && React.createElement("div", null,
                React.createElement(Row, { className: "fl-layout-demo-row" },
                    React.createElement(Col, { span: labelOffset }, '\u00A0'),
                    React.createElement(Col, { span: labelSpan, style: { background: 'rgba(0,160,233,0.6)', padding: '2px' } },
                        React.createElement("strong", { style: { color: 'white' } },
                            "Label - ",
                            (100 * (labelSpan + labelOffset) / 24).toFixed(2),
                            "%"))),
                React.createElement(Row, { className: "fl-layout-demo-row", style: { marginTop: '15px' } },
                    React.createElement(Col, { span: wrapperOffset }, '\u00A0'),
                    React.createElement(Col, { span: wrapperSpan, style: { background: 'rgba(0,120,200,0.8)', padding: '2px' } },
                        React.createElement("strong", { style: { color: 'white' } },
                            "Field - ",
                            (100 * (wrapperSpan + wrapperOffset) / 24).toFixed(2),
                            "%")))));
    });
};
