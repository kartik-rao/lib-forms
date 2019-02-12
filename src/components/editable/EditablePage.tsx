import * as React from "react";
import {IPage, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {EditableSectionComponent} from "./EditableSection";
import {Card} from "antd";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export interface PageProps {
    page: IPage;
    formLayout: FormLayoutOptions;
    index: number;
    decorators: any;
    eventHooks: any;
    conditionals:any;
}

class EditablePageComponent extends React.Component<PageProps, any> {
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
                        return <EditableSectionComponent section={section} key={sn} conditionals={conditionals} formLayout={formLayout} decorators={decorators} eventHooks={eventHooks}></EditableSectionComponent>
                    })}
                </div>
            </Card>
        </div>
    }
}

export default DragDropContext(HTML5Backend)(EditablePageComponent);