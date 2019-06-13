import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {
}
declare class FormContentEditorView extends React.Component<IFormContentEditorViewProps, any> {
    constructor(props: IFormContentEditorViewProps);
    form: Form;
    handleSubmit: (e: any) => void;
    onchange: (e: any) => void;
    render(): JSX.Element;
}
declare const WrappedFormContentEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormContentEditorView, Pick<IFormContentEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedFormContentEditorView;
