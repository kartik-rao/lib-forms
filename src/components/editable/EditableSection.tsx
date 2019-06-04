import * as React from "react";
import {Card, Row} from "antd";

import {IColumn, ISection, IFormLayoutOptions} from "@kartikrao/lib-forms-core";
import EditableColumnComponent from "./EditableColumn";
import {DnDHelper} from "./DnDHelper";
import RootStore from "../../models/RootStore";

import { observer } from "mobx-react";

export interface SectionProps {
    eventHooks: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex:number;
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
        console.log("section.onDragEnd")
        if (!result.destination) {
          return;
        }
        let {store, pageIndex, sectionIndex} = this.props;
        let section = store.formData.content.pages[pageIndex].sections[sectionIndex];

        const items = DnDHelper.reorder(
          section.columns,
          result.source.columnIndex,
          result.destination.columnIndex
        );
        section.columns = items;
    }

    render() {
        let {store, eventHooks, pageIndex, sectionIndex} = this.props;
        let section = store.formData.content.pages[pageIndex].sections[sectionIndex];
        let {showSectionTitles, showSectionBorders} = store.formData.formLayoutOptions;
        const numColumns = section.columns.length;
        return <Card bordered={showSectionBorders} title={showSectionTitles ? section.name : ""}>
            <Row  gutter={8}>
                {section.columns.map((column: IColumn, cn: number) => {
                    return <EditableColumnComponent listId={column.id} store={store} key={cn} column={column} pageIndex={pageIndex} sectionIndex={sectionIndex} columnIndex={cn} span={24/numColumns} eventHooks={eventHooks}/>
                })}
            </Row>
        </Card>
    }
}