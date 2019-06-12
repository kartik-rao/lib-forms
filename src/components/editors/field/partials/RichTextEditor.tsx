import * as React from "react";
import AceEditor from 'react-ace';

import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/github';

import {action} from "mobx";
import { observer } from "mobx-react";
import { Card, Modal } from "antd";

export interface IRichTExtEditorProps {
    mode?: string;
    theme? : string;
    title: string;
    content: string;
    onSave: (content: string) => void;
}

@observer
export class RichTextEditor extends React.Component<IRichTExtEditorProps, any>{

    constructor(props: IRichTExtEditorProps) {
        super(props);
        this.state = {content: this.props.content, visible: true}
    }

    @action.bound onChange = (editorContent: any) => {
        console.log(editorContent);
    };

    @action handleOk = () => {
        this.props.onSave(this.state.content);
    }

    @action handleCancel = () => {
        this.setState({content: null, visible: false})
    }

    render() {
        return <Modal title={this.props.title} onOk={this.handleOk} onCancel={this.handleCancel} visible={this.state.visible}>
            <AceEditor mode={this.props.mode || 'html'} theme="github" onChange={this.onChange}/><Card/>
        </Modal>
    }
}