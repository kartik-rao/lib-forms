import { Page } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { EditorStore } from "../../../store/EditorStore";
export interface IPageItemProps {
    page: Page;
    key: string;
    index: number;
    store: EditorStore;
}
export declare class PageItem extends React.Component<IPageItemProps, any> {
    constructor(props: IPageItemProps);
    render(): JSX.Element;
}
