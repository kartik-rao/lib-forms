var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import * as React from "react";
import AceEditor from 'react-ace';
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/github';
import { action } from "mobx";
import { observer } from "mobx-react";
import { Card, Modal } from "antd";
let RichTextEditor = class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = (editorContent) => {
            console.log(editorContent);
        };
        this.handleOk = () => {
            this.props.onSave(this.state.content);
        };
        this.handleCancel = () => {
            this.setState({ content: null, visible: false });
        };
        this.state = { content: this.props.content, visible: true };
    }
    render() {
        return React.createElement(Modal, { title: this.props.title, onOk: this.handleOk, onCancel: this.handleCancel, visible: this.state.visible },
            React.createElement(AceEditor, { mode: this.props.mode || 'html', theme: "github", onChange: this.onChange }),
            React.createElement(Card, null));
    }
};
__decorate([
    action.bound
], RichTextEditor.prototype, "onChange", void 0);
__decorate([
    action
], RichTextEditor.prototype, "handleOk", void 0);
__decorate([
    action
], RichTextEditor.prototype, "handleCancel", void 0);
RichTextEditor = __decorate([
    observer
], RichTextEditor);
export { RichTextEditor };
