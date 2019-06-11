import Page from "@kartikrao/lib-forms-core/lib/models/page";
import { Card, Divider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import RootStore from "../../store/RootStore";
import { ItemList } from "./partials/dnd.common";
import { PageItem } from "./partials/PageItem";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";


export interface ComponentTreeProps {
    store: RootStore;
}

const onSelect = (itemType: string, item: Page|Section|Column|Field) => {

}

@observer
export class ComponentTree extends React.Component<ComponentTreeProps, any> {
    nodeMap: any = {};
    props: ComponentTreeProps;

    constructor(props: ComponentTreeProps) {
        super(props);
        this.props = props;
    }

    render() {
        let {formStore, editorStore} = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;

        return <Card title={"Layout"} bordered={false} style={{height: '100%'}}
                bodyStyle={{height:'100%', padding: '8px', overflow: 'auto', paddingBottom:'48px'}}>
            <Droppable droppableId="pages" type="Page">
            {(provided, snapshot) => {
                return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    { pages.map((page: Page, index) => {
                        return <div key={page.uuid} >
                            <PageItem store={this.props.store} key={page.uuid} page={page} index={index}></PageItem>
                            <Divider style={{margin: '12px 0'}}/>
                        </div>
                    })}
                {provided.placeholder}
                </ItemList>
            }}
        </Droppable>
        </Card>
    }
}