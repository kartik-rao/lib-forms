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
declare class EditablePageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
declare const _default: typeof EditablePageComponent & import("react-dnd").ContextComponent<any>;
export default _default;
