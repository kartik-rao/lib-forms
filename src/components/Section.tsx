import * as React from "react";
import {Card, Row} from "antd";

import {IColumn, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {ColumnComponent} from "./Column";

export interface SectionProps {
    section: ISection;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}

export class SectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;

    constructor(props: SectionProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {section, formLayout, conditionals, decorators, eventHooks} = this.props;
        let {showSectionTitles, showSectionBorders} = formLayout;
        const numColumns = section.columns.length;
        return <Card bordered={showSectionBorders} title={showSectionTitles ? section.name : ""}>
            <Row  gutter={16}>
                { section.columns.map((column: IColumn, fn: number) => {
                    return <ColumnComponent formLayout={formLayout} key={fn} column={column} span={24/numColumns} conditionals={conditionals} decorators={decorators} eventHooks={eventHooks}/>
                })}
            </Row>
        </Card>
    }
}