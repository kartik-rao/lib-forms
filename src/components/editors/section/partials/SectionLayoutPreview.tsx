import * as React from "react";
import { Card, Row, Col } from "antd";
import { useObserver } from 'mobx-react';

export interface ISectionLayoutPreviewProps {
    gutter: number;
    colspans: any;
}

const colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];

export const SectionLayoutPreview : React.FC<ISectionLayoutPreviewProps> = (props: ISectionLayoutPreviewProps) => {

    return useObserver(() => {
        return <Card title="Preview" size="small" bordered={false}>
            <Row className="fl-layout-demo-row" gutter={props.gutter}>
                {
                    Object.keys(props.colspans).map((key, index) => {
                        return <Col key={key} span={props.colspans[key]}>
                            <div style={{ minHeight: '50px', padding: '5px 10px', background: index%2 == 0 ? colors[0] : colors[1]}}>
                                <strong style={{color: 'white'}}>{index+1} - {(100*(props.colspans[key])/24).toFixed(2)}%</strong>
                            </div>
                        </Col>
                    })
                }
            </Row>
        </Card>
    });
}