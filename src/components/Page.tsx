import * as React from "react";
import {IPage, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {SectionComponent} from "./Section";
import {Card} from "antd";

export interface PageProps {
    page: IPage;
    formLayout: FormLayoutOptions;
    index: number;
    decorators: any;
    eventHooks: any;
    conditionals:any;
}

export class PageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;

    constructor(props: PageProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {page, formLayout, index, eventHooks, decorators, conditionals} = this.props;
        return <div className="page-content">
            <Card title={formLayout.showPageTitles ? page.title : ""}>
                <div className="page" key={index.toString()}>
                    {page.sections.map((section: ISection, sn: number) => {
                        return <SectionComponent section={section} key={sn} conditionals={conditionals} formLayout={formLayout} decorators={decorators} eventHooks={eventHooks}></SectionComponent>
                    })}
                </div>
            </Card>
        </div>
    }
}