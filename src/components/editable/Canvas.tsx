import Column from "@kartikrao/lib-forms-core/lib/models/column";
import Page from "@kartikrao/lib-forms-core/lib/models/page";
import Section from "@kartikrao/lib-forms-core/lib/models/section";
import { FormView } from "@kartikrao/lib-forms-core/lib/views/FormView";
import {Factory} from "@kartikrao/lib-forms-core/lib/models/factory"
import { Card, Col, Layout, Row, Menu, Icon } from 'antd';
import { computed } from "mobx";
import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import RootStore from "../../models/RootStore";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";

const { Content } = Layout;

export interface CanvasProps {
    store: RootStore;
}

export class Canvas extends React.Component<CanvasProps, any>{
    factory: Factory;
    constructor(props: CanvasProps) {
        super(props);
        this.factory = new Factory(this.props.store.formStore);
    }

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

    handleNewItem = (result: DropResult) => {
        const { destination, type } = result;
        const { form } = this.props.store.formStore;
        const dIndex = destination.index;
        if (type == "Page") {
            let page = this.factory.makePages({
                id: `page-${form.content.pages.length}`,
                title: "Untitled Page",
                name: "Untitled Page",
                sections: []
            })[0];
            form.addPage(page, dIndex);
        } else {
            let [dParentId] = destination.droppableId.split('|');
            if (type == "Section") {
                let page = this.itemMap[dParentId] as Page;
                let section = this.factory.makeSections({
                    id: `section-${page.sections.length}`,
                    name: `Untitled Section`,
                    columns: []
                })[0];
                page.addSection(section, dIndex);
            }
            if (type == "Column") {
                let section = this.itemMap[dParentId] as Section;
                let column = this.factory.makeColumns({
                    id: `column-${section.columns.length}`,
                    name: 'Untitled Column',
                    fields: []
                })[0];
                section.addColumn(column, dIndex)
            }
            if (type == "Field") {
                let column = this.itemMap[dParentId] as Column;
                let field = this.factory.makeFields({
                    id: `field-${column.fields.length}`,
                    name: "Untitled Field",
                    label: `Untitled ${result.draggableId}`,
                    inputType: result.draggableId,
                    componentProps: {},
                    fieldOptions: {}
                })[0];
                column.addField(field, dIndex);
            }
        }
        return;
    }

    handleMoveItem = (result: DropResult) => {
        const { source, destination, type } = result;
        const { form } = this.props.store.formStore;
        const sIndex = source.index;
        const dIndex = destination.index;
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

    onDragEnd = (result : DropResult) => {
        const { source, type } = result;
        console.log(`onDragEnd - ${type}`, result);
        if (source.droppableId.startsWith('New')) {
            this.handleNewItem(result);
        } else {
            this.handleMoveItem(result);
        }
    }

    state = {
        siderCollapsed: true,  drawerPlacement: 'left'
    };

    onSiderCollapse = (siderCollapsed) => {
        this.setState({ siderCollapsed });
    };

    toggleSider = () => {
        this.setState({siderCollapsed: !this.state.siderCollapsed});
    }

    contentContainer: any;
    render() {
        let { formStore } = this.props.store;
        return <Layout style={{ height: "100vh", overflow:"hidden" }}>
            <Menu mode="horizontal" theme="light" multiple={true}>
                <Menu.Item title="Form Controls" onClick={this.toggleSider} key="controls">
                    <Icon theme={this.state.siderCollapsed ? 'outlined' : 'filled'} type="control" /> Show Controls
                </Menu.Item>
            </Menu>
            <Layout.Content>
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Layout style={{ height: "100vh"}}>
                    <div style={{borderRight: '1px solid lightgray', display: this.state.siderCollapsed ? 'none' : 'block'}}>
                        <Layout.Sider trigger={null} collapsed={this.state.siderCollapsed}
                        collapsible={true} onCollapse={this.onSiderCollapse} theme={"light"}>
                            <div style={{ display: this.state.siderCollapsed ? 'none' : 'block', backgroundColor: 'white', height: '100%' }}>
                                <ComponentMenu />
                            </div>
                        </Layout.Sider>
                    </div>
                    <Content>
                        <Row gutter={0}>
                            <Col span={7} style={{overflowY: "scroll", height:"100vh"}}>
                                <ComponentTree store={formStore}/>
                            </Col>
                            <Col span={17}>
                                <div style={{overflowY: "scroll", height: "100vh"}}>
                                    <FormView store={formStore} />
                                </div>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
        </DragDropContext>
        </Layout.Content>
    </Layout>
    }
}
//box-shadow: 0 2px 8px #f0f1f2