import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
import { FormComponentProps } from "antd/lib/form";
import { Section } from "@kartikrao/lib-forms-core";
export interface ISectionLayoutEditorViewProps extends FormComponentProps, IEditorView {
    section: Section;
}
declare class SectionLayoutEditorView extends React.Component<ISectionLayoutEditorViewProps, any> {
    gutter: number;
    columnSpans: any;
    initialize(): void;
    readonly colspans: any[];
    updateSpan: (key: any, value: any) => void;
    updateGutter: (value: any) => void;
    constructor(props: ISectionLayoutEditorViewProps);
    handleSubmit: (e: any) => void;
    render(): JSX.Element;
}
declare const WrappedSectionLayoutEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof SectionLayoutEditorView, Pick<ISectionLayoutEditorViewProps, "wrappedComponentRef" | "section" | "store">>;
export default WrappedSectionLayoutEditorView;
