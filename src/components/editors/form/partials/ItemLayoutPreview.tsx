import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
import { Col, Row } from "antd";
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";

export interface IITemLayoutPreview {
    itemLayoutOptions : ItemLayoutOptions;
    dimension: ScreenWidth;
    formLayout: string;
}

export const ItemLayoutPreview = (props: IITemLayoutPreview) => {
    const localStore = useLocalStore(() => ({
        get shouldRender() : boolean {
            let {formLayout, itemLayoutOptions, dimension} = props;
            return formLayout && itemLayoutOptions && dimension && !!itemLayoutOptions.wrapperCol[dimension];
        }
    }));

    let {formLayout, dimension} = props;
    let {wrapperCol, labelCol} = props.itemLayoutOptions;
    let wrapperSpan = wrapperCol[dimension].span;
    let wrapperOffset = wrapperCol[dimension].offset || 0;
    let labelSpan = labelCol[dimension].span;
    let labelOffset = labelCol[dimension].offset || 0;

    return useObserver(() => {
        return <div style={{background: '#ffff'}}>
        {localStore.shouldRender && formLayout == 'horizontal' && <Row className="fl-layout-demo-row">
            <Col span={labelOffset}>{'\u00A0'}</Col>
            <Col span={labelSpan} style={{background: 'rgba(0,160,233,0.6)', padding: '2px'}}>
                <strong style={{color: 'white'}}>Label - {(100*(labelSpan + labelOffset)/24).toFixed(2)}%</strong>
            </Col>
            <Col span={wrapperOffset}>{'\u00A0'}</Col>
            <Col span={wrapperSpan} style={{background: 'rgba(0,120,200,0.8)', padding: '2px'}}>
                <strong style={{color: 'white'}}>Field - {(100*(wrapperSpan + wrapperOffset)/24).toFixed(2)}%</strong>
            </Col>
        </Row>}
        {localStore.shouldRender && formLayout == 'vertical' && <div>
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
    });
}