import * as React from "react";
import {IPage, ISection, FormLayoutOptions} from "@adinfinity/ai-core-forms";
import {EditableSectionComponent} from "./EditableSection";
import {Card} from "antd";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import RootStore from "../../models/RootStore";
import { observer } from "mobx-react";

export interface PageProps {
    index: number;
    eventHooks: any;
    store: RootStore
}

@observer
class EditablePageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;

    constructor(props: PageProps) {
        super(props);
        this.props = props;
    }

    render() {

        let {store, index, eventHooks} = this.props;
        let page = store.formData.content.pages[index];
        return <div className="page-content">
            <Card title={store.formData.formLayoutOptions.showPageTitles ? page.title : ""}>
                <div className="page" key={index.toString()}>
                    {page.sections.map((section: ISection, sn: number) => {
                        return <EditableSectionComponent sectionIndex={sn} pageIndex={index} key={sn} store={this.props.store} eventHooks={eventHooks}></EditableSectionComponent>
                    })}
                </div>
            </Card>
        </div>
    }
}

export default DragDropContext(HTML5Backend)(EditablePageComponent);