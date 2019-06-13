import { FormComponentProps } from "antd/lib/form";
import Form from "antd/lib/form/Form";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IFormPropertiesEditorViewProps extends FormComponentProps, IEditorView {
}
declare class FormPropertiesEditorView extends React.Component<IFormPropertiesEditorViewProps, any> {
    constructor(props: IFormPropertiesEditorViewProps);
    form: Form;
    handleSubmit: (e: any) => void;
    render(): JSX.Element;
}
declare const WrappedFormContentEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormPropertiesEditorView, Pick<IFormPropertiesEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedFormContentEditorView;
