import { Page, Section } from "@kartikrao/lib-forms-core";
import { Badge, Button } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, getBadgeStyle, getItemStyle, getItemListStyle, DraggableItemList } from "./dnd.common";
import { SectionItem } from "./SectionItem";

export interface IPageItemProps {
    page: Page;
    key: string;
    index: number;
}

export const PageItem: React.FC<IPageItemProps> = (props) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    let {title, subtitle, name} = props.page;
    return <Draggable type="Page" draggableId={props.page.uuid} index={props.index}>
        {(provided, snapshot) => (
            <DraggableItem ref={provided.innerRef} {...provided.draggableProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                <Button type="dashed" onClick={() => {store.setEditable(props.page)}} shape="circle" title={`Edit ${title||"Page"}`} size="small" icon="edit" className="fl-tree-button"></Button>
                <Badge style={{userSelect: 'none'}} {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Page")} text={`Page - ${props.page.title}`}/>
                <Droppable droppableId={`${props.page.uuid}|sections`} type="Section">
                    {(provided, snapshot) => {
                        return <DraggableItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps} style={getItemListStyle(snapshot.isDraggingOver, "Page")}>
                            {props.page.sections.map((sec: Section, index) => {
                                return <SectionItem key={sec.uuid} sec={sec} index={index}></SectionItem>
                            })}
                        {provided.placeholder}
                        </DraggableItemList>
                    }}
                </Droppable>
            {provided.placeholder}
            </DraggableItem>
        )}
    </Draggable>
}
