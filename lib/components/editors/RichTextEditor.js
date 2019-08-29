import { __decorate } from "tslib";
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
