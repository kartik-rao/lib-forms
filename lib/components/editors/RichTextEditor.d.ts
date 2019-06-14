import * as React from "react";
import 'brace/mode/html';
import 'brace/mode/css';
import 'brace/theme/github';
export interface IRichTExtEditorProps {
    mode?: string;
    theme?: string;
    title: string;
    content: string;
    onSave: (content: string) => void;
}
export declare class RichTextEditor extends React.Component<IRichTExtEditorProps, any> {
    constructor(props: IRichTExtEditorProps);
    onChange: (editorContent: any) => void;
    handleOk: () => void;
    handleCancel: () => void;
    render(): JSX.Element;
}
