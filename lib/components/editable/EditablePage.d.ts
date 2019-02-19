import * as React from "react";
import { IPage } from "@adinfinity/ai-core-forms";
import RootStore from "../../models/RootStore";
export interface PageProps {
    index: number;
    eventHooks: any;
    store: RootStore;
    page: IPage;
}
declare class EditablePageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
declare const _default: typeof EditablePageComponent & import("react-dnd").ContextComponent<any>;
export default _default;
