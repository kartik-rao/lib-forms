import * as React from "react";
import {Card, Row} from "antd";

import {IColumn, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import EditableColumnComponent from "./EditableColumn";
import {DnDHelper} from "./DnDHelper";

export interface SectionProps {
    section: ISection;
    formLayout: FormLayoutOptions;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}

export class EditableSectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;

    constructor(props: SectionProps) {
        super(props);
        this.props = props;
        this.state = {
            columns : props.section.columns
        }
    }

    onDragEnd(result: any) {
        // dropped outside the list
        if (!result.destination) {
          return;
        }

        const items = DnDHelper.reorder(
          this.state.columns,
          result.source.index,
          result.destination.index
        );

        this.setState({columns : items});
    }

    render() {
        let {section, formLayout, conditionals, decorators, eventHooks} = this.props;
        let {showSectionTitles, showSectionBorders} = formLayout;
        const numColumns = section.columns.length;
        return <Card bordered={showSectionBorders} title={showSectionTitles ? section.name : ""}>
            <Row  gutter={8}>
                {this.state.columns.map((column: IColumn, fn: number) => {
                    return <EditableColumnComponent formLayout={formLayout} key={fn} column={column} span={24/numColumns} conditionals={conditionals} decorators={decorators} eventHooks={eventHooks}/>
                })}
            </Row>
        </Card>
    }
}