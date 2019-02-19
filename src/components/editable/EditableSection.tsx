import * as React from "react";
import {Card, Row} from "antd";

import {IColumn, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import EditableColumnComponent from "./EditableColumn";
import {DnDHelper} from "./DnDHelper";
import RootStore from "../../models/RootStore";
import { observable } from "mobx";
import { observer } from "mobx-react";

export interface SectionProps {
    eventHooks: any;
    index:number;
    store: RootStore;
}

@observer
export class EditableSectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;

    constructor(props: SectionProps) {
        super(props);
        this.props = props;
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
        let {store, eventHooks} = this.props;
        let section = store.formData.content.pages[store.currentPage].sections[this.props.index];
        let {showSectionTitles, showSectionBorders} = store.formData.formLayoutOptions;
        const numColumns = section.columns.length;
        return <Card bordered={showSectionBorders} title={showSectionTitles ? section.name : ""}>
            <Row  gutter={8}>
                {section.columns.map((column: IColumn, cn: number) => {
                    return <EditableColumnComponent store={store}  column={column} index={cn} key={cn} span={24/numColumns} eventHooks={eventHooks}/>
                })}
            </Row>
        </Card>
    }
}