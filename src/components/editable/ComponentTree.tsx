import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { Card, Icon } from "antd";
import { computed } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import styled from 'styled-components';

export interface ComponentTreeProps {
    store: FormStore;
}

const ItemList = styled.div`
  padding: 4px;
  transition: background-color: 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? "skyblue" : "white")};
`;

const Container = styled.div`
    padding: 6px;
    margin-bottom: 4px;
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
                <Container ref={provided.innerRef} {...provided.draggableProps} style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <span {...provided.dragHandleProps}>    <Icon type="number"></Icon> {fld.label}</span>
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
            <span>    <Icon type="column-width"></Icon> {col.name}</span>
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
            <span>   <Icon type="ordered-list"></Icon> {sec.name}</span>
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
    }

    render() {
        let page: Page = this.props.page;
        return (
            <Draggable type="Page" draggableId={page.uuid} index={this.props.index}>
            {(provided, snapshot) => (
              <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                <span><Icon type="layout"></Icon>   {page.title}</span>
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

    @computed get itemMap(): any {
        let { pages } = this.props.store.form.content;
        let itemMap = {};
        pages.forEach((p) => {
            itemMap[p.uuid] = p;
            p.sections.forEach((s, si) => {
                itemMap[s.uuid] = s;
                s.columns.forEach((c, ci) => {
                    itemMap[c.uuid] = c;
                    c.fields.forEach((f, fi) => {
                        itemMap[f.uuid] = f;
                    });
                })
            });
        });
        return itemMap;
    }

    onDragEnd = (result : DropResult) => {
        let { source, destination, type } = result;
        let { form } = this.props.store;
        let sIndex = source.index;
        let dIndex = destination.index;
        if (type == "Page") {
            form.swapPages(source.index, destination.index);
        } else {
            let [sParentId] = source.droppableId.split('|');
            let [dParentId] = destination.droppableId.split('|');
            let sameParent = sParentId == dParentId;
            console.log(`onDragEnd - ${type} sameParent=[${sameParent}]`);
            if (type == "Section") {
                let prev = this.itemMap[sParentId] as Page;
                if (sameParent) {
                    prev.swapSections(sIndex, dIndex);
                    return;
                }
                let next = this.itemMap[dParentId] as Page;
                let section = prev.sections[sIndex];
                prev.removeSection(sIndex);
                next.addSection(section, dIndex);
            } else if (type == "Column") {
                let prev = this.itemMap[sParentId] as Section;
                if (sameParent) {
                    prev.swapColumns(sIndex, dIndex);
                    return;
                }
                let next = this.itemMap[dParentId] as Section;
                let column = prev.columns[sIndex];
                prev.removeColumn(sIndex);
                next.addColumn(column, dIndex);
            } else if (type == "Field") {
                let prev = this.itemMap[sParentId] as Column;
                if (sameParent) {
                    prev.swapFields(sIndex, dIndex);
                    return;
                }
                let next = this.itemMap[dParentId] as Column;
                let column = prev.fields[sIndex];
                prev.removeField(sIndex);
                next.addField(column, dIndex);
            }
        }
    }

    render() {
        let { form } = this.props.store;
        let { pages } = form.content;
        this.itemMap;
        return <Card title="Form" style={{ overflow: 'scroll' }}><DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="pages" type="Page">
                {(provided, snapshot) => {
                    return <div><ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        {pages.map((page: Page, index) => {
                            return <PageItem key={page.uuid} page={page} index={index}></PageItem>
                        })}
                    </ItemList>
                    {provided.placeholder}
                    </div>
                    }}
                </Droppable>
        </DragDropContext>
    </Card>
    }
}