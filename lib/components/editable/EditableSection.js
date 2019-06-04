var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { Card, Row } from "antd";
import EditableColumnComponent from "./EditableColumn";
import { DnDHelper } from "./DnDHelper";
import { observer } from "mobx-react";
let EditableSectionComponent = class EditableSectionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    onDragEnd(result) {
        // dropped outside the list
        console.log("section.onDragEnd");
        if (!result.destination) {
            return;
        }
        let { store, pageIndex, sectionIndex } = this.props;
        let section = store.formData.content.pages[pageIndex].sections[sectionIndex];
        const items = DnDHelper.reorder(section.columns, result.source.columnIndex, result.destination.columnIndex);
        section.columns = items;
    }
    render() {
        let { store, eventHooks, pageIndex, sectionIndex } = this.props;
        let section = store.formData.content.pages[pageIndex].sections[sectionIndex];
        let { showSectionTitles, showSectionBorders } = store.formData.formLayoutOptions;
        const numColumns = section.columns.length;
        return React.createElement(Card, { bordered: showSectionBorders, title: showSectionTitles ? section.name : "" },
            React.createElement(Row, { gutter: 8 }, section.columns.map((column, cn) => {
                return React.createElement(EditableColumnComponent, { listId: column.id, store: store, key: cn, column: column, pageIndex: pageIndex, sectionIndex: sectionIndex, columnIndex: cn, span: 24 / numColumns, eventHooks: eventHooks });
            })));
    }
};
EditableSectionComponent = __decorate([
    observer
], EditableSectionComponent);
export { EditableSectionComponent };
