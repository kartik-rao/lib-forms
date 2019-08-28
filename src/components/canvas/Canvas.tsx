import { Column, Factory, FormView, Page, Section, FormStoreProvider } from "@kartikrao/lib-forms-core";
import { Col, Icon, Layout, Menu } from 'antd';
import { useLocalStore } from "mobx-react";
import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { FieldEditorView } from "../editors/field/FieldEditorView";
import { FormEditorView } from "../editors/form/FormEditorView";
import PageEditorView from "../editors/page/PageEditorView";
import { SectionEditorView } from "../editors/section/SectionEditorView";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";
const { Content } = Layout;

const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
}

export const Canvas : React.FC<any> = () => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");
    const factory = new Factory(store.formStore);
    const localStore = useLocalStore(() => ({
        siderCollapsed: false,
        onSiderCollapse : (siderCollapsed) => {
            this.siderCollapsed = siderCollapsed;
        },
        toggleSider : () => {
            this.siderCollapsed = !this.state.siderCollapsed;
        },
        get itemMap(): any {
            let itemMap = {};
            store.formStore.form.content.pages.forEach((p) => {
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
        },
        handleNewItem : (result: DropResult) => {
            const { destination, type } = result;
            const { form } = store.formStore;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = this.factory.makePages({
                    id   : `${nextPageNum}`,
                    title: `Page ${nextPageNum}`,
                    name : `Page ${nextPageNum}`,
                    sections: []
                })[0];
                form.addPage(page, dIndex);
            } else {
                let [dParentId] = destination.droppableId.split('|');
                if (type == "Section") {
                    let page = this.itemMap[dParentId] as Page;
                    let section = factory.makeSections({
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId] as Section;
                    let column = factory.makeColumns({
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    section.addColumn(column, dIndex)
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId] as Column;
                    let field = factory.makeFields({
                        id: `${id}`,
                        name: `Field_${id}`,
                        label: `Untitled ${result.draggableId}`,
                        inputType: result.draggableId,
                        componentProps: {},
                        fieldOptions: {}
                    })[0];
                    column.addField(field, dIndex);
                }
            }
            return;
        },
        handleMoveItem : (result: DropResult) => {
            const { source, destination, type } = result;
            const { form } = store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            if (type == "Page") {
                form.swapPages(source.index, destination.index);
            } else {
                let [sParentId] = source.droppableId.split('|');
                let [dParentId] = destination.droppableId.split('|');
                let sameParent = sParentId == dParentId;
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
        },
        onDragEnd : (result : DropResult) => {
            const { source, type } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            } else {
                this.handleMoveItem(result);
            }
        }
    }));

    return <Layout className="fl-full-height-nopad">
            <Menu mode="horizontal" theme="light" multiple={true} className="fl-shadow-sides">
                <Menu.Item title="Form Controls" onClick={localStore.toggleSider} key="controls">
                    <Icon theme={localStore.siderCollapsed ? 'outlined' : 'filled'} type="control" />
                </Menu.Item>
            </Menu>
            <Layout.Content>
            <DragDropContext onDragEnd={localStore.onDragEnd}>
                <Layout className="fl-full-height-nopad">
                    <Layout.Sider trigger={null} collapsed={localStore.siderCollapsed} style={{zIndex: 11}}
                    collapsible={true} onCollapse={localStore.onSiderCollapse} theme={"light"} collapsedWidth={0}>
                        <div className="fl-full-height fl-grey-box fl-shadow-sides">
                            <ComponentMenu />
                        </div>
                    </Layout.Sider>
                    <Content style={{overflow: "hidden", padding: '0'}}>
                        <Col span={8} style={{height: '100%'}}>
                            <div className="fl-full-height fl-grey-box fl-shadow-sides">
                                <ComponentTree store={this.props.store}/>
                            </div>
                        </Col>
                        <Col span={16} style={{height: '100%'}}>
                            <div className="fl-grey-box fl-shadow-sides fl-full-height">
                                <FormStoreProvider formStore={store.formStore}>
                                    <FormView />
                                </FormStoreProvider>
                            </div>
                        </Col>
                        <FieldEditorView store={this.props.store}/>
                        <FormEditorView store={this.props.store}/>
                        <PageEditorView store={this.props.store}/>
                        <SectionEditorView store={this.props.store}/>
                    </Content>
                </Layout>
        </DragDropContext>
        </Layout.Content>
    </Layout>

}