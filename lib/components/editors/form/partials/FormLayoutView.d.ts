import { ItemLayoutOptions } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { RootStore } from "../../../../store/RootStore";
export interface IFormLayoutViewProps extends FormComponentProps {
    store: RootStore;
}
export declare class FormLayoutView extends React.Component<IFormLayoutViewProps, any> {
    selectedFormLayout: string;
    constructor(props: IFormLayoutViewProps);
    initialize(props: IFormLayoutViewProps): void;
    setProperty(key: string, e: any): void;
    handleSubmit: (e: any) => void;
    readonly hasFormLayoutChanged: boolean;
    saveLayout: (layout: ItemLayoutOptions) => void;
    render(): JSX.Element;
}
declare const WrappedIFormLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormLayoutView, Pick<IFormLayoutViewProps, "store" | "wrappedComponentRef">>;
export default WrappedIFormLayoutViewProps;
