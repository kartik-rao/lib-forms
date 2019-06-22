import * as React from "react";
export interface ISectionLayoutPreviewProps {
    gutter: number;
    colspans: number[];
}
export declare class SectionLayoutPreview extends React.Component<ISectionLayoutPreviewProps, any> {
    constructor(props: ISectionLayoutPreviewProps);
    render(): JSX.Element;
}
