import * as React from "react";
import { IPage, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface PageProps {
    page: IPage;
    formLayout: FormLayoutOptions;
    index: number;
    decorators: any;
    eventHooks: any;
    conditionals: any;
}
export declare class PageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
