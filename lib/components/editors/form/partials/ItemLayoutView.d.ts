import * as React from "react";
import RootStore from "../../../../store/RootStore";
import { FormComponentProps } from "antd/lib/form";
export interface IItemLayoutViewProps extends FormComponentProps {
    store: RootStore;
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
    initialize(props: IItemLayoutViewProps): void;
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
declare const WrappedIItemLayoutViewProps: import("antd/lib/form/interface").ConnectedComponentClass<typeof ItemLayoutView, Pick<IItemLayoutViewProps, "store" | "wrappedComponentRef">>;
export default WrappedIItemLayoutViewProps;
