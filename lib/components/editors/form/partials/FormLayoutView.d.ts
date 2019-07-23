import { ItemLayoutOptions } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { EditorStore } from "../../../../store/EditorStore";
export interface IFormLayoutViewProps extends FormComponentProps {
    store: EditorStore;
}
export declare class FormLayoutView extends React.Component<IFormLayoutViewProps, any> {
    selectedFormLayout: string;
    selectedLabelAlign: "left" | "right";
    constructor(props: IFormLayoutViewProps);
    initialize(props: IFormLayoutViewProps): void;
    setProperty(key: string, e: any): void;
    handleSubmit: (e: any) => void;
    readonly hasFormLayoutChanged: boolean;
    saveItemLayout: (layout: ItemLayoutOptions) => void;
    render(): JSX.Element;
}
declare const WrappedIFormLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormLayoutView, Pick<IFormLayoutViewProps, "wrappedComponentRef" | "store">>;
export default WrappedIFormLayoutViewProps;
