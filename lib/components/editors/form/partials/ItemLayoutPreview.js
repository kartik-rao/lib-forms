var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Col, Row } from "antd";
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
let ItemLayoutPreview = class ItemLayoutPreview extends React.Component {
    constructor(props) {
        super(props);
    }
    get shouldRender() {
        let { formLayout, itemLayoutOptions, dimension } = this.props;
        return formLayout && itemLayoutOptions && dimension && itemLayoutOptions.wrapperCol[dimension];
    }
    render() {
        let { shouldRender } = this;
        let { formLayout, dimension } = this.props;
        let { wrapperCol, labelCol } = this.props.itemLayoutOptions;
        let wrapperSpan = wrapperCol[dimension].span;
        let wrapperOffset = wrapperCol[dimension].offset || 0;
        let labelSpan = labelCol[dimension].span;
        let labelOffset = labelCol[dimension].offset || 0;
        return React.createElement("div", { style: { background: '#ffff' } },
            shouldRender && formLayout == 'horizontal' && React.createElement(Row, { className: "fl-layout-demo-row" },
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
            shouldRender && formLayout == 'vertical' && React.createElement("div", null,
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
    }
};
__decorate([
    computed
], ItemLayoutPreview.prototype, "shouldRender", null);
ItemLayoutPreview = __decorate([
    observer
], ItemLayoutPreview);
export { ItemLayoutPreview };
//
