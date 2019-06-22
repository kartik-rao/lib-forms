import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
import * as React from "react";
export interface IITemLayoutPreview {
    itemLayoutOptions: ItemLayoutOptions;
    dimension: ScreenWidth;
    formLayout: string;
}
export declare class ItemLayoutPreview extends React.Component<IITemLayoutPreview, any> {
    readonly shouldRender: import("@kartikrao/lib-forms-core").ColSpanOffset;
    constructor(props: IITemLayoutPreview);
    render(): JSX.Element;
}
