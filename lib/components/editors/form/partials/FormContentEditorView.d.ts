import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IFormContentEditorViewProps extends FormComponentProps, IEditorView {
}
declare class FormContentEditorView extends React.Component<IFormContentEditorViewProps, any> {
    constructor(props: IFormContentEditorViewProps);
    initialize(): void;
    handleSubmit: (e: any) => void;
    dimension: any;
    labelSpan: any;
    wrapperSpan: any;
    labelOffset: any;
    wrapperOffset: any;
    readonly fieldLayout: any;
    onChange: (key: string, value: any) => void;
    render(): JSX.Element;
}
declare const WrappedFormContentEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormContentEditorView, Pick<IFormContentEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedFormContentEditorView;
