import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { Divider, Icon, Tag } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

export interface ComponentTreeProps {
    store: FormStore;
}

const ItemList = styled.div`
    margin-left: 6px;
    padding: 4px;
`;

const Container = styled.div`
    padding: 4px;
    background-color: white;
`;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? '#ededed' : '#fff',
    // styles we need to apply on draggables
    ...draggableStyle
})

class FieldItem extends React.Component<any, any> {
    render() {
        let fld: Field = this.props.fld;
        return <Draggable type="Field" draggableId={fld.uuid} index={this.props.index}>
            {(provided, snapshot) => (
            <div>
                <Container ref={provided.innerRef} {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <span {...provided.dragHandleProps}><Tag color="green">Field</Tag>{fld.label}</span>
                </Container>
                {provided.placeholder}
            </div>
        )}
      </Draggable>
    }
}

class ColumnItem extends React.Component<any, any> {
    render() {
        let col: Column = this.props.col;
        return <Draggable type="Column" draggableId={col.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <span><Tag>Column</Tag>{col.name}</span>
                <Droppable droppableId={`${col.uuid}|fields`} type="Field">
                    {(provided, snapshot) => {
                        return <div>
                            <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                            {col.fields.map((f: Field, index) => {
                                return <FieldItem key={f.uuid} fld={f} index={index}></FieldItem>
                            })}
                        </ItemList>
                        {provided.placeholder}
                    </div>}}
                </Droppable>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    }
}

class SectionItem extends React.Component<any, any> {
    render() {
        let sec: Section = this.props.sec;
        return <Draggable type="Section" draggableId={sec.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <span><Tag color="blue">Section</Tag>{sec.name}</span>
                <Droppable droppableId={`${sec.uuid}|columns`} type="Column">
                {(provided, snapshot) => {
                    return <div>
                        <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        {sec.columns.map((col: Column, index) => {
                            return <ColumnItem key={col.uuid} col={col} index={index}></ColumnItem>
                        })}
                    </ItemList>
                    { provided.placeholder }
                    </div>
                }}
            </Droppable>
            {provided.placeholder}
          </Container>
        )}
      </Draggable>
    }
}

class PageItem extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = { isExpanded: false };
    }

    render() {
        let page: Page = this.props.page;
        return (
            <Draggable type="Page" draggableId={page.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <span>
                        <Tag color="magenta">Page</Tag>{page.title}
                    </span>
                    <Droppable droppableId={`${page.uuid}|sections`} type="Section">
                        {(provided, snapshot) => {
                            return <div>
                                <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                                {page.sections.map((sec: Section, index) => {
                                    return <SectionItem key={sec.uuid} sec={sec} index={index}></SectionItem>
                                })}
                            </ItemList>
                            {provided.placeholder}
                            </div>
                        }}
                    </Droppable>
                {provided.placeholder}
                <Divider style={{margin: '2px'}}/>
              </Container>
            )}
        </Draggable>
        )
    }
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
        let { form } = this.props.store;
        let { pages } = form.content;

        return <div style={{ height:'100vh', backgroundColor: "white", fontSize: "14px" }}>
        <Droppable droppableId="pages" type="Page">
            {(provided, snapshot) => {
                return <div>
                    <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    {pages.map((page: Page, index) => {
                        return <PageItem key={page.uuid} page={page} index={index}></PageItem>
                    })}
                </ItemList>
                {provided.placeholder}
                </div>
            }}
        </Droppable>
    </div>
    }
}