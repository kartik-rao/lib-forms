import { Page } from "@kartikrao/lib-forms-core";
import { Badge, Button, Card, Divider } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Droppable } from "react-beautiful-dnd";
import { RootStore } from "../../store/RootStore";
import { getBadgeStyle, ItemList } from "./partials/dnd.common";
import { PageItem } from "./partials/PageItem";

export interface ComponentTreeProps {
    store: RootStore;
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
        let { formStore, editorStore } = this.props.store;
        let { form } = formStore;
        let { pages } = form.content;

        return <Card title={"Layout"} bordered={false} style={{height: '100%'}}
                bodyStyle={{height:'100%', padding: '10px', overflow: 'auto', paddingBottom:'48px'}}>
            <Button type="dashed" onClick={() => {editorStore.setFormEditorVisible(true)}} shape="circle" size="small" icon="edit" style={{marginRight: '5px', userSelect: 'none'}}></Button>
            <Badge status="default" color={getBadgeStyle("Form")} text={`Form - ${form.name}`}/>
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