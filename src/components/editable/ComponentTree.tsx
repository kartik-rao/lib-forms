import * as React from "react";

import { observer } from "mobx-react";
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import SortableTree from 'react-sortable-tree';
import { computed, action } from "mobx";
import { IFormProps } from "@adinfinity/ai-core-forms";

export interface ComponentTreeProps {
    formData: IFormProps
}

export default class ComponentTree extends React.Component<ComponentTreeProps, any> {
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps) {
        super(props);
        this.props = props;
        this.state = {treeData : this.getTreeData()}
    }

    onChange = (treeData: any[]) => {
        this.setState({treeData: treeData});
    }

    getTreeData() : any[] {
        let pages = this.props.formData.content.pages;
        let treeData = [];
        pages.forEach((p, pi) => {
            let page = {title: p.title, children: [], index: pi, type: 'page', allowChild: "section"}
            p.sections.forEach((s, si) => {
                let section = {title: s.name, children: [], index: si, type: 'section', allowChild: "column"};
                s.columns.forEach((c, ci) => {
                    let column = {title: c.name, children: [], index: ci, type: 'column', allowChild: "field"};
                    c.fields.forEach((f, fi) => {
                        let field = {title: `${f.type} - ${f.label||f.name}`, index: fi, type: 'field', allowChild: ""};
                        column.children.push(field);
                    });
                    section.children.push(column);
                })
                page.children.push(section);
            });
            treeData.push(page);
        });
        console.log("computed Tree Data=", treeData);
        return treeData;
    }

    render() {
        return <div style={{height:800}}><SortableTree generateNodeProps = {() => ({
            listIndex: 0,
            lowerSiblingCounts: []
          })} treeData={this.state.treeData} theme={FileExplorerTheme} onChange={this.onChange}></SortableTree></div>
    }
}