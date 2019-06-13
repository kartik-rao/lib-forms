import * as React from "react";
export interface IITemLayoutPreview {
    labelOffset: number;
    labelSpan: number;
    wrapperSpan: number;
    wrapperOffset: number;
    dimension: string;
    formLayout: string;
}
export declare class ItemLayoutPreview extends React.Component<IITemLayoutPreview, any> {
    labelOffset: any;
    labelSpan: any;
    wrapperSpan: any;
    wrapperOffset: any;
    dimension: any;
    formLayout: any;
    readonly shouldRender: boolean;
    constructor(props: IITemLayoutPreview);
    initialize(props: IITemLayoutPreview): void;
    render(): JSX.Element;
}
