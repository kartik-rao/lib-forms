import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
import { FormComponentProps } from "antd/lib/form";
export interface IPageEditorViewProps extends FormComponentProps, IEditorView {
}
declare class PageEditorView extends React.Component<IPageEditorViewProps, any> {
    handleSubmit: (e: any) => void;
    readonly hasErrors: boolean;
    render(): JSX.Element;
}
declare const WrappedPageEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof PageEditorView, Pick<IPageEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedPageEditorView;
