import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { Tag, Card, Badge, Row, Col } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

export interface ComponentTreeProps {
    store: FormStore;
}

const ItemList = styled.div`

`;

const Container = styled.div`
    cursor: 'grab'
`;

const getBadgeStyle = (type: string) => {
    switch (type) {
        case "Page": return "magenta";
        case "Section" : return "geekblue";
        case "Column" : return "gold";
        case "Field" : return "green"
    }
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    marginLeft : '12px',
    marginTop : '8px',
    borderRadius: '15px',
    ...draggableStyle
})

class FieldItem extends React.Component<any, any> {
    render() {
        let fld: Field = this.props.fld;
        return <Draggable type="Field" draggableId={fld.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Field")} text={`Field - ${fld.label}`}/>
                    {provided.placeholder}
                </Container>
        )}
      </Draggable>
    }
}

class ColumnItem extends React.Component<any, any> {
    render() {
        let col: Column = this.props.col;
        return <Draggable type="Column" draggableId={col.uuid} index={this.props.index}>
        {(provided, snapshot) => (
          <Container ref={provided.innerRef} {...provided.draggableProps}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
            <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Column")} text={`Column - ${col.name}`}/>
                <Droppable droppableId={`${col.uuid}|fields`} type="Field">
                    {(provided, snapshot) => {
                        return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                            {col.fields.map((f: Field, index) => {
                                return <FieldItem key={f.uuid} fld={f} index={index}></FieldItem>
                            })}
                        {provided.placeholder}
                        </ItemList>
                    }}
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
          <Container ref={provided.innerRef} {...provided.draggableProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
              <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Section")} text={`Section - ${sec.name}`}/>
                <Droppable droppableId={`${sec.uuid}|columns`} type="Column">
                {(provided, snapshot) => {
                    return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                        {sec.columns.map((col: Column, index) => {
                            return <ColumnItem key={col.uuid} col={col} index={index}></ColumnItem>
                        })}
                    { provided.placeholder }
                    </ItemList>
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
        return ( <div style={{padding: '4px'}}>
            <Draggable type="Page" draggableId={page.uuid} index={this.props.index}>
            {(provided, snapshot) => (
                <Container ref={provided.innerRef} {...provided.draggableProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}>
                    <Badge {...provided.dragHandleProps} status={snapshot.isDragging ? 'processing': "default"} color={getBadgeStyle("Page")} text={`Page - ${page.title}`}/>
                    <Droppable droppableId={`${page.uuid}|sections`} type="Section">
                        {(provided, snapshot) => {
                            return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                                {page.sections.map((sec: Section, index) => {
                                    return <SectionItem key={sec.uuid} sec={sec} index={index}></SectionItem>
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

        return <div>
            <Card title={"Layout"} bordered={false} bodyStyle={{padding: '8px', overflow: 'auto'}}>
            <Droppable droppableId="pages" type="Page">
            {(provided, snapshot) => {
                return <ItemList isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    { pages.map((page: Page, index) => {
                        return <Row style={{margin: '5px 0 5px 0'}}>
                            <Col><PageItem key={page.uuid} page={page} index={index}></PageItem></Col>
                        </Row>
                    })}
                {provided.placeholder}
                </ItemList>
            }}
        </Droppable>
        </Card>
        </div>
    }
}