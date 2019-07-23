import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { EditorStore } from "../../../../store/EditorStore";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {
    store: EditorStore;
}
declare class FormContentEditorView extends React.Component<IFormContentEditorViewProps, any> {
    constructor(props: IFormContentEditorViewProps);
    selectedFormLayout: any;
    handleSubmit: (e: any) => void;
    onChange: (key: string, value: any) => void;
    render(): JSX.Element;
}
declare const WrappedFormContentEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormContentEditorView, Pick<IFormContentEditorViewProps, "wrappedComponentRef" | "store">>;
export default WrappedFormContentEditorView;
