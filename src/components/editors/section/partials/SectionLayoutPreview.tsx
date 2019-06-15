import * as React from "react";
import { Card, Row, Col } from "antd";

export interface ISectionLayoutPreviewProps {
    gutter: number;
    colspans: number[];
}

export class SectionLayoutPreview extends React.Component<ISectionLayoutPreviewProps, any>{
    constructor(props: ISectionLayoutPreviewProps) {
        super(props);
    }

    render() {
        let {gutter, colspans} = this.props;
        let colors = ['rgba(0,160,233,0.6)', 'rgba(0,120,200,0.8)'];

        return <Card title="Preview" size="small" bordered={false}>
            <Row className="fl-layout-demo-row" gutter={gutter}>
                {
                    colspans.map((span, ci) => {
                        return <Col key={ci} span={span}>
                            <div style={{ minHeight: '50px', padding: '5px 10px', background: ci%2 == 0 ? colors[0] : colors[1]}}>
                                <strong style={{color: 'white'}}>{ci+1} - {(100*(span)/24).toFixed(2)}%</strong>
                            </div>
                        </Col>
                    })
                }
            </Row>
        </Card>
    }
}