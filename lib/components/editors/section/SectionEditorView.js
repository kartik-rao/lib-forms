var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Col, Drawer, Row, Tabs } from "antd";
import { observer } from "mobx-react";
import * as React from "react";
import SectionPropertiesEditorView from "./partials/SectionPropertiesEditorView";
import SectionLayoutEditor from "./partials/SectionLayoutEditor";
let SectionEditorView = class SectionEditorView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { store } = this.props;
        let section = store.showSectionEditor ? store.selectedSection : null;
        return section && React.createElement(Drawer, { title: `Section "${section.name}" `, onClose: () => store.setEditable(null), visible: store.showSectionEditor == true, width: 700, style: { overflow: 'hidden' } }, React.createElement(Tabs, { size: "small" },
            React.createElement(Tabs.TabPane, { tab: "Settings", key: "1" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(SectionPropertiesEditorView, { store: this.props.store })))),
            React.createElement(Tabs.TabPane, { tab: "Layout", key: "2" },
                React.createElement(Row, null,
                    React.createElement(Col, { span: 24 },
                        React.createElement(SectionLayoutEditor, { store: this.props.store, section: section }))))));
    }
};
SectionEditorView = __decorate([
    observer
], SectionEditorView);
export { SectionEditorView };
