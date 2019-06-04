import * as React from "react";
import {Card, Row} from "antd";

import {IFormLayoutOptions} from "@kartikrao/lib-forms-core";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import Column from "@kartikrao/lib-forms-core/lib/models/column";
import {ColumnComponent} from "./Column";
import RootStore from "../models/RootStore";

export interface SectionProps {
    eventHooks: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex:number;
}

export class SectionComponent extends React.Component<SectionProps, any> {
    state: any;
    props: SectionProps;

    constructor(props: SectionProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, eventHooks, pageIndex, sectionIndex} = this.props;
        let {showSectionTitles, showSectionBorders} = store.formStore.form.formLayoutOptions;
        let section = store.formData.content.pages[pageIndex].sections[sectionIndex];

        const numColumns = section.columns.length;
        return <Card bordered={showSectionBorders} title={showSectionTitles ? section.name : ""}>
            <Row gutter={16}>
                { section.columns.map((column: Column, fn: number) => {
                    return <ColumnComponent column={column} span={24/numColumns} store={store} eventHooks={eventHooks}/>
                })}
            </Row>
        </Card>
    }
}