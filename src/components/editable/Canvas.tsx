import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import { FormView } from "@kartikrao/lib-forms-core/lib/views/FormView";
import { Card, Col, Layout, Row } from 'antd';
import { computed } from "mobx";
import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import RootStore from "../../models/RootStore";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";
const { Sider, Content } = Layout;

export interface CanvasProps {
    store: RootStore;
}

export class Canvas extends React.Component<CanvasProps, any>{
    @computed get itemMap(): any {
        let { form } = this.props.store.formStore;
        let { pages } = form.content;
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
        let { form } = this.props.store.formStore;
        let sIndex = source.index;
        let dIndex = destination.index;
        console.log(`onDragEnd - ${type}`, result);
        if (source.droppableId.startsWith('New')) {
            console.log(result);
            return;
        }
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

    state = {
        collapsed: true,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        let { formStore } = this.props.store;
        return <Layout style={{ height: "100vh" }}>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Sider theme="light" collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <ComponentMenu />
                </Sider>
            <Layout>
                <Content>
                    <Row>
                        <Col span={5}>
                            <ComponentTree store={formStore} />
                        </Col>
                        <Col span={18}>
                            <Card title="Preview">
                                <FormView store={formStore} />
                            </Card>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </DragDropContext>
    </Layout>
    }
}