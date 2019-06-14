import { IItemLayoutOptions, FormLayoutOptions, IFormLayoutOptions } from "@kartikrao/lib-forms-core/lib/models/layout";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import RootStore from "../../../../store/RootStore";
declare type ScreenWidth = "xs" | "sm" | "md" | "lg" | "xl";
export interface IFormLayoutViewProps extends FormComponentProps {
    store: RootStore;
}
export declare class FormLayoutView extends React.Component<IFormLayoutViewProps, any> {
    constructor(props: IFormLayoutViewProps);
    initialize(props: IFormLayoutViewProps): void;
    setProperty(key: string, e: any): void;
    readonly selectedItemLayout: {
        formLayout: string;
        dimension: ScreenWidth;
        labelOffset: number;
        labelSpan: number;
        wrapperOffset: number;
        wrapperSpan: number;
    };
    readonly dimensions: string[];
    handleSubmit: (e: any) => void;
    selectedFormLayout: string;
    itemLayoutOptions: IItemLayoutOptions;
    formLayoutOptions: IFormLayoutOptions;
    selectedDimension: ScreenWidth;
    readonly hasFormLayoutChanged: boolean;
    saveLayout: (layout: FormLayoutOptions) => void;
    render(): JSX.Element;
}
declare const WrappedIFormLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof FormLayoutView, Pick<IFormLayoutViewProps, "store" | "wrappedComponentRef">>;
export default WrappedIFormLayoutViewProps;
