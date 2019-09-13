import { Page, Section } from "@kartikrao/lib-forms-core";
import { Button, Tag, Icon, Popconfirm } from "antd";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { editorStoreContext } from "../../../store/EditorStoreProvider";
import { DraggableItem, DraggableItemList, getBadgeStyle, getItemListStyle, getItemStyle } from "./dnd.common";
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
                <span {...provided.dragHandleProps} style={{userSelect: 'none'}}>
                    <Icon type="drag" style={{marginRight: '10px'}}/>
                    <Tag style={{cursor: "pointer"}} onClick={()=>store.setEditable(props.page)} color={getBadgeStyle("Page")}>{`Page - ${props.page.title}`}</Tag>
                    <Popconfirm title="Delete Page ?" onConfirm={() => store.deletePage(props.index)}><Icon type="delete" style={{cursor: "pointer"}}/></Popconfirm>
                </span>
                <Droppable droppableId={`${props.page.uuid}|sections`} type="Section">
                    {(provided, snapshot) => {
                        return <DraggableItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps} style={getItemListStyle(snapshot.isDraggingOver, "Page")}>
                            {props.page.sections.map((sec: Section, index) => {
                                return <SectionItem key={sec.uuid} sec={sec} index={index} pageIndex={props.index}></SectionItem>
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
