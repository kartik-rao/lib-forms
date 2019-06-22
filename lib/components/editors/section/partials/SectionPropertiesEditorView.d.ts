import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
import { FormComponentProps } from "antd/lib/form";
export interface ISectionPropertiesEditorViewProps extends FormComponentProps, IEditorView {
}
declare class SectionPropertiesEditorView extends React.Component<ISectionPropertiesEditorViewProps, any> {
    gutter: number;
    constructor(props: ISectionPropertiesEditorViewProps);
    handleSubmit: (e: any) => void;
    render(): JSX.Element;
}
declare const WrappedSectionPropertiesEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof SectionPropertiesEditorView, Pick<ISectionPropertiesEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedSectionPropertiesEditorView;
