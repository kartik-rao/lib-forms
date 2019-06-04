var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import { EditableSectionComponent } from "./EditableSection";
import { Card } from "antd";
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { observer } from "mobx-react";
let EditablePageComponent = class EditablePageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        let { store, page, index, eventHooks } = this.props;
        return React.createElement("div", { className: "page-content" },
            React.createElement(Card, { title: store.formData.formLayoutOptions.showPageTitles ? page.title : "" },
                React.createElement("div", { className: "page", key: index.toString() }, page.sections.map((section, sn) => {
                    return React.createElement(EditableSectionComponent, { sectionIndex: sn, pageIndex: index, key: sn, store: this.props.store, eventHooks: eventHooks });
                }))));
    }
};
EditablePageComponent = __decorate([
    observer
], EditablePageComponent);
export default DragDropContext(HTML5Backend)(EditablePageComponent);
