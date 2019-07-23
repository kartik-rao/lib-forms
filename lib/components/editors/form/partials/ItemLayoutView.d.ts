import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
export interface IItemLayoutViewProps extends FormComponentProps {
    formLayout: string;
    itemLayoutOptions: ItemLayoutOptions;
    onSave: (item: ItemLayoutOptions) => void;
}
export declare class ItemLayoutView extends React.Component<IItemLayoutViewProps, any> {
    isAdding: boolean;
    isEditing: boolean;
    selectedDimension: ScreenWidth;
    itemLayout: ItemLayoutOptions;
    setDimension: (dimension: ScreenWidth) => void;
    setLayoutProperty: (key: string, value: any) => void;
    initialize({ itemLayoutOptions }: {
        itemLayoutOptions: any;
    }): void;
    constructor(props: IItemLayoutViewProps);
    readonly asRows: any[];
    readonly availableDimensions: ScreenWidth[];
    setIsAdding: () => void;
    reset: () => void;
    setIsEditing: (record: any) => void;
    confirmRemove: (record: any) => void;
    remove: (record: any) => void;
    save: () => void;
    render(): JSX.Element;
}
declare const WrappedIItemLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof ItemLayoutView, Pick<IItemLayoutViewProps, "wrappedComponentRef" | "itemLayoutOptions" | "formLayout" | "onSave">>;
export default WrappedIItemLayoutViewProps;
