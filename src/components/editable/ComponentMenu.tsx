import { Icon, Menu, Divider } from 'antd';
import * as React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from 'styled-components';

const Container = styled.div`
    padding: 4px;
    background-color: white;
`;
const Item = styled.div`

`;
export class ComponentMenu extends React.Component<any, any> {
    render() {
        return <div style={{ borderRight: '1px solid grey' }}>
        <div style={{marginBottom: '2px'}}>
        <Droppable droppableId="NewPage" type="Page" isDropDisabled={true}>
            {(provided, snapshot) => (
                <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    <Menu>
                    <Menu.Item title="Page">
                        <Draggable type="Page" draggableId="p1" index={0}>
                            {(provided) => (
                                <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Icon type="layout"/>
                                    {provided.placeholder}
                                </Container>
                             )}
                        </Draggable>
                    </Menu.Item>
                    </Menu>
                </Item>
            )}
        </Droppable>
        </div>
        <Droppable droppableId="NewSection" type="Section" isDropDisabled={true}>
            {(provided, snapshot) => (
                <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    <Menu>
                    <Menu.Item title="Section">
                        <Draggable type="Section" draggableId="s1" index={1}>
                            {(provided) => (
                                <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Icon type="menu" />
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Draggable>
                    </Menu.Item>
                    </Menu>
                </Item>
            )}
        </Droppable>
        <Droppable droppableId="NewColumn" type="Column" isDropDisabled={true}>
            {(provided, snapshot) => (
                <Item isDraggingOver={snapshot.isDraggingOver} ref={provided.innerRef} {...provided.droppableProps}>
                    <Menu>
                    <Menu.Item title="Column">
                        <Draggable type="Column" draggableId="c1" index={2}>
                            {(provided) => (
                                <Container ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                    <Icon type="column-width" />
                                    {provided.placeholder}
                                </Container>
                            )}
                        </Draggable>
                    </Menu.Item>
                    </Menu>
                </Item>
            )}
        </Droppable>

        </div>
    }
}