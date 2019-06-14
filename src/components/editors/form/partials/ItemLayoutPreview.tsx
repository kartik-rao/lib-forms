import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
import { Col, Row } from "antd";
import { computed, observable, toJS } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

export interface IITemLayoutPreview {
    itemLayoutOptions : ItemLayoutOptions;
    dimension: ScreenWidth;
    formLayout: string;
}

@observer
export class ItemLayoutPreview extends React.Component<IITemLayoutPreview, any> {

    @computed get shouldRender() {
        return this.props.formLayout
            && this.props.itemLayoutOptions && this.props.dimension && this.props.itemLayoutOptions[this.props.dimension];
    }

    constructor(props: IITemLayoutPreview) {
        super(props);
    }

    render() {
        console.log("PREVIEW", this.props.dimension, toJS(this.props.itemLayoutOptions))
        let {formLayout} = this.props;
        let {wrapperCol, labelCol} = this.props.itemLayoutOptions;
        let wrapperSpan = wrapperCol[this.props.dimension].span;
        let wrapperOffset = wrapperCol[this.props.dimension].offset
        let labelSpan = labelCol[this.props.dimension].span;
        let labelOffset = labelCol[this.props.dimension].offset;

        let {shouldRender} = this;
        return <div style={{background: '#ffff'}}>
        {shouldRender && formLayout == 'horizontal' && <Row className="fl-layout-demo-row">
        <Col span={labelOffset}>{'\u00A0'}</Col>
            <Col span={labelSpan} style={{background: 'rgba(0,160,233,0.6)', padding: '2px'}}>
                <strong style={{color: 'white'}}>Label - {(100*(labelSpan + labelOffset)/24).toFixed(2)}%</strong>
            </Col>
            <Col span={wrapperOffset}>{'\u00A0'}</Col>
            <Col span={wrapperSpan} style={{background: 'rgba(0,120,200,0.8)', padding: '2px'}}>
                <strong style={{color: 'white'}}>Field - {(100*(wrapperSpan + wrapperOffset)/24).toFixed(2)}%</strong>
            </Col>
        </Row>}
        {shouldRender && formLayout == 'vertical' && <div>
            <Row className="fl-layout-demo-row">
                <Col span={labelOffset}>{'\u00A0'}</Col>
                <Col span={labelSpan} style={{background: 'rgba(0,160,233,0.6)', padding: '2px'}}>
                    <strong style={{color: 'white'}}>Label - {(100*(labelSpan + labelOffset)/24).toFixed(2)}%</strong>
                </Col>
            </Row>
            <Row className="fl-layout-demo-row" style={{marginTop: '15px'}}>
                <Col span={wrapperOffset}>{'\u00A0'}</Col>
                <Col span={wrapperSpan} style={{background: 'rgba(0,120,200,0.8)', padding: '2px'}}>
                    <strong style={{color: 'white'}}>Field - {(100*(wrapperSpan + wrapperOffset)/24).toFixed(2)}%</strong>
                </Col>
            </Row>
        </div>}
    </div>
    }
}

//