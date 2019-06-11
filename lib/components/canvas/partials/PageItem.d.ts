import Page from "@kartikrao/lib-forms-core/lib/models/page";
import * as React from "react";
import RootStore from "../../../store/RootStore";
export interface IPageItemProps {
    page: Page;
    key: string;
    index: number;
    store: RootStore;
}
export declare class PageItem extends React.Component<IPageItemProps, any> {
    constructor(props: IPageItemProps);
    render(): JSX.Element;
}
