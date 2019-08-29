/// <reference types="react" />
import { ItemLayoutOptions, ScreenWidth } from "@kartikrao/lib-forms-core";
export interface IITemLayoutPreview {
    itemLayoutOptions: ItemLayoutOptions;
    dimension: ScreenWidth;
    formLayout: string;
}
export declare const ItemLayoutPreview: (props: IITemLayoutPreview) => JSX.Element;
