import * as React from "react";
import FileExplorerTheme from 'react-sortable-tree-theme-full-node-drag';
import SortableTree from 'react-sortable-tree';
export default class ComponentTree extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (treeData) => {
            this.setState({ treeData: treeData });
        };
        this.canDrop = (dropState) => {
            let { nextParent, node } = dropState;
            return nextParent.allowChild == node.type;
        };
        this.canNodeHaveChildren = (node) => {
            return node.type !== 'field';
        };
        this.onMoveNode = (moveState) => {
            console.log("Something moved", moveState);
            let { node, nextParent } = moveState;
            if (node.type == "field") {
            }
        };
        this.props = props;
        this.state = { treeData: this.getTreeData() };
    }
    getTreeData() {
        let pages = this.props.formData.content.pages;
        let treeData = [];
        pages.forEach((p, pi) => {
            let page = { title: p.title, children: [], index: pi, type: 'page', allowChild: "section" };
            p.sections.forEach((s, si) => {
                let section = { title: s.name, children: [], index: si, type: 'section', allowChild: "column" };
                s.columns.forEach((c, ci) => {
                    let column = { title: c.name, children: [], index: ci, type: 'column', allowChild: "field" };
                    c.fields.forEach((f, fi) => {
                        let field = { title: `${f.type} - ${f.label || f.name}`, index: fi, type: 'field', allowChild: "" };
                        column.children.push(field);
                    });
                    section.children.push(column);
                });
                page.children.push(section);
            });
            treeData.push(page);
        });
        console.log("computed Tree Data=", treeData);
        return treeData;
    }
    render() {
        return React.createElement("div", { style: { height: 800 } },
            React.createElement(SortableTree, { generateNodeProps: () => ({
                    listIndex: 0,
                    lowerSiblingCounts: []
                }), treeData: this.state.treeData, theme: FileExplorerTheme, onMoveNode: this.onMoveNode, onChange: this.onChange, canDrop: this.canDrop }));
    }
}
