import { Column, Factory, FormStoreProvider, FormView, Page, Section } from "@kartikrao/lib-forms-core";
import "@kartikrao/lib-forms-core/lib/forms.core.m.css";
import { Badge, Card, Col, Empty, Layout } from 'antd';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { editorStoreContext } from "../../store/EditorStoreProvider";
import { ComponentMenu } from "./ComponentMenu";
import { ComponentTree } from "./ComponentTree";

export interface CanvasProps {
    onSave?: (formData: any) => void;
}

const { Content } = Layout;

const genRandom = () => {
    return `${Math.ceil(Math.random() * 1e6)}`;
}

const FieldEditorView = React.lazy(() => import(/* webpackChunkName: "editors-field" */ "../editors/field/FieldEditorView").then((module) => {return {default: module.FieldEditorView}}));
const FormEditorView = React.lazy(() => import(/* webpackChunkName: "editors-form" */ "../editors/form/FormEditorView").then((module) => {return {default: module.FormEditorView}}));
const PageEditorView = React.lazy(() => import(/* webpackChunkName: "editors-page" */ "../editors/page/PageEditorView"));
const SectionEditorView = React.lazy(() => import(/* webpackChunkName: "editors-section" */ "../editors/section/SectionEditorView").then((module) => {return {default: module.SectionEditorView}}));

export const Canvas : React.FC<CanvasProps> = (props: CanvasProps) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    const localStore = useLocalStore(() => ({
        siderCollapsed: false,
        get hasContent() {
            return store.formStore.form.content && store.formStore.form.content.pages && store.formStore.form.content.pages.length > 0;
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
        handleNewItem : function (result: DropResult) {
            const { destination, type } = result;
            const { form } = store.formStore;
            if(destination == null) {
                return;
            }
            store.isDirty = true;
            const dIndex = destination.index;
            let id = genRandom();
            if (type == "Page") {
                let nextPageNum = form.content.pages.length;
                let page = Factory.makePages(store.formStore, {
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
                    let section = Factory.makeSections(store.formStore, {
                        id: `${id}`,
                        name: `Section_${id}`,
                        columns: []
                    })[0];
                    page.addSection(section, dIndex);
                }
                if (type == "Column") {
                    let section = this.itemMap[dParentId] as Section;
                    let column = Factory.makeColumns(store.formStore, {
                        id: `${id}`,
                        name: `Column_${id}`,
                        fields: []
                    })[0];
                    let numCols = section.columns.length;
                    let evenWidth = Math.abs(24/(numCols + 1));
                    section.addColumn(column, dIndex);
                    section.columns.forEach((c) => {
                        c.span = evenWidth;
                    })
                }
                if (type == "Field") {
                    let column = this.itemMap[dParentId] as Column;
                    let field = Factory.makeFields(store.formStore, {
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
        handleMoveItem : function (result: DropResult) {
            const { source, destination, type } = result;
            const { form } = store.formStore;
            const sIndex = source.index;
            const dIndex = destination.index;
            store.isDirty = true;
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
        onDragEnd : function(result : DropResult) {
            const { source, type } = result;
            if (source.droppableId.startsWith('New')) {
                this.handleNewItem(result);
            } else {
                this.handleMoveItem(result);
            }
        },
        onSave : function () {
            if(props.onSave) {
                props.onSave(store.asJSONForm);
                store.isDirty = false;
            }
        }
    }));
    return useObserver(() => {
        return <Layout className="fl-full-height-nopad">
            <Layout.Content>
            <DragDropContext onDragEnd={localStore.onDragEnd}>
                <Layout className="fl-full-height-nopad">
                    <Layout.Sider trigger={null} collapsed={!store.showPalette} style={{zIndex: 11, background: '#FFFF'}}
                    collapsible={true} theme={"light"} collapsedWidth={0}>
                        <div className="fl-full-height fl-grey-box fl-shadow-sides">
                            <ComponentMenu />
                        </div>
                    </Layout.Sider>
                    <Content style={{overflow: "hidden", padding: '0'}}>
                        <Col span={8} className="fl-full-height">
                            <div className="fl-full-height fl-grey-box fl-shadow-sides">
                                <ComponentTree />
                            </div>
                        </Col>
                        <Col span={16} className="fl-full-height">
                            <Layout className="fl-full-height">
                                <Layout.Content>
                                <Card bordered={false} title={<span><Badge status={store.isDirty ? "error" : "success"}/>Preview</span>} style={{width: "100%", padding: '1px', borderBottom : '1px'}} bodyStyle={{padding: 0}}></Card>
                                    <div className="fl-shadow-sides fl-full-height" style={{backgroundColor: "white", overflow: "auto", paddingBottom: '65px'}}>
                                        <FormStoreProvider formStore={store.formStore}>
                                            {localStore.hasContent ? <FormView className="fl-full-height"/> :
                                                <Empty description={<span>Add a page to this form.</span>} style={{marginTop: "20%"}}/>
                                            }
                                        </FormStoreProvider>
                                    </div>
                                </Layout.Content>
                            </Layout>
                        </Col>
                        <React.Suspense fallback="Loading...">
                            <FieldEditorView />
                            <FormEditorView />
                            <PageEditorView />
                            <SectionEditorView />
                        </React.Suspense>
                    </Content>
                </Layout>
        </DragDropContext>
        </Layout.Content>
    </Layout>
    });
}