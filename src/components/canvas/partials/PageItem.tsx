import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import RootStore from "../../../store/RootStore";
import { Container, getBadgeStyle, getItemStyle, ItemList } from "./dnd.common";
import { SectionItem } from "./SectionItem";
import { observer } from "mobx-react";

export interface IPageItemProps {
    page: Page;
    key: string;
    index: number;
    store: RootStore;
}

@observer
export class PageItem extends React.Component<IPageItemProps, any> {

    constructor(props: IPageItemProps) {
        super(props);
    }

    render() {
        let page: Page = this.props.page;
        return ( <div style={{padding: '4px'}}>
            <Draggable type="Page" draggableId={page.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <Button type="primary" size="small" icon="edit" style={{marginRight: '5px', userSelect: 'none'}}></Button>
                    <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Page")} text={`Page - ${page.title}`}/>
                    <Droppable droppableId={`${page.uuid}|sections`} type="Section">
                        {(provided, snapshot) => {
                            return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                                {page.sections.map((sec: Section, index) => {
                                    return <SectionItem store={this.props.store} key={sec.uuid} sec={sec} index={index}></SectionItem>
                                })}
                            {provided.placeholder}
                            </ItemList>
                        }}
                    </Droppable>
                {provided.placeholder}
              </Container>
            )}
        </Draggable>
        </div>
        )
    }
}