import * as React from "react";
import { IPage } from "@kartikrao/lib-forms-core/lib/models/page";
import RootStore from "../models/RootStore";
export interface PageProps {
    index: number;
    eventHooks: any;
    store: RootStore;
    page: IPage;
}
export declare class PageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
