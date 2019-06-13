import { Col, Row } from "antd";
import { action, observable, computed } from "mobx";
import * as React from "react";
import { observer } from "mobx-react";

export interface IITemLayoutPreview {
    labelOffset: number;
    labelSpan: number;
    wrapperSpan: number;
    wrapperOffset: number;
    dimension: string;
    formLayout: string;
}

@observer
export class ItemLayoutPreview extends React.Component<IITemLayoutPreview, any> {

    @observable labelOffset;
    @observable labelSpan;
    @observable wrapperSpan;
    @observable wrapperOffset;
    @observable dimension;
    @observable formLayout;

    @computed get shouldRender() {
        return !!this.dimension && !isNaN(this.labelOffset) && !isNaN(this.labelSpan)
            && !isNaN(this.wrapperSpan) && !isNaN(this.wrapperOffset);
    }

    constructor(props: IITemLayoutPreview) {
        super(props);
        this.initialize(props);
    }

    @action initialize(props: IITemLayoutPreview) {
        this.labelOffset = props.labelOffset;
        this.labelSpan = props.labelSpan;
        this.wrapperSpan = props.wrapperSpan;
        this.wrapperOffset = props.wrapperOffset;
        this.dimension = props.dimension;
        this.formLayout = props.formLayout;
    }

    render() {
        let {formLayout, dimension, wrapperOffset, wrapperSpan, labelSpan, labelOffset} = this.props;
        let {shouldRender} = this;
        console.log("Preview", this.props)
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