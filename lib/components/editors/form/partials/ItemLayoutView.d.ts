import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IFormItemLayoutOptions } from "@kartikrao/lib-forms-core";
export interface IItemLayoutViewProps extends FormComponentProps {
    formLayout: string;
    itemLayoutOptions: IFormItemLayoutOptions;
    onSave: (item: IFormItemLayoutOptions) => void;
}
export declare class ItemLayoutView extends React.Component<IItemLayoutViewProps, any> {
    isAdding: boolean;
    isEditing: boolean;
    dimension: string;
    labelSpan: number;
    wrapperSpan: number;
    labelOffset: number;
    wrapperOffset: number;
    readonly fieldLayout: {
        labelCol: {};
        wrapperCol: {};
    };
    onChange: (key: string, value: any) => void;
    constructor(props: IItemLayoutViewProps);
    readonly currentDimensions: any[];
    readonly availableDimensions: string[];
    setIsAdding: () => void;
    reset: () => void;
    setIsEditing: (record: any) => void;
    confirmRemove: (record: any) => void;
    remove: (record: any) => void;
    save: () => void;
    render(): JSX.Element;
}
declare const WrappedIItemLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof ItemLayoutView, Pick<IItemLayoutViewProps, "formLayout" | "itemLayoutOptions" | "onSave" | "wrappedComponentRef">>;
export default WrappedIItemLayoutViewProps;
