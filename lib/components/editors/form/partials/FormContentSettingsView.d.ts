import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import RootStore from "../../../../store/RootStore";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {
    store: RootStore;
}
declare class FormContentEditorView extends React.Component<IFormContentEditorViewProps, any> {
    constructor(props: IFormContentEditorViewProps);
    selectedFormLayout: any;
    handleSubmit: (e: any) => void;
    onChange: (key: string, value: any) => void;
    render(): JSX.Element;
}
declare const WrappedFormContentEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormContentEditorView, Pick<IFormContentEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedFormContentEditorView;