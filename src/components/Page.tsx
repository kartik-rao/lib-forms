import * as React from "react";
import {IFormLayoutOptions} from "@kartikrao/lib-forms-core";
import Page, { IPage } from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";

import {SectionComponent} from "./Section";
import {Card} from "antd";
import RootStore from "../models/RootStore";
import { observer } from "mobx-react";

export interface PageProps {
    index: number;
    eventHooks: any;
    store: RootStore;
    page: IPage;
}

@observer
export class PageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;

    constructor(props: PageProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {store, page, index, eventHooks} = this.props;
        let {formStore} = store;
        return <div className="page-content">
            <Card title={formStore.form.formLayoutOptions.showPageTitles ? page.title : ""}>
                <div className="page" key={index.toString()}>
                    {page.sections.map((section: Section, sn: number) => {
                        return <SectionComponent sectionIndex={sn} pageIndex={index} key={sn} store={this.props.store} eventHooks={eventHooks}></SectionComponent>
                    })}
                </div>
            </Card>
        </div>
    }
}