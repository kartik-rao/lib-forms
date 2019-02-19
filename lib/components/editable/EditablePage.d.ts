import * as React from "react";
import RootStore from "../../models/RootStore";
export interface PageProps {
    index: number;
    eventHooks: any;
    store: RootStore;
}
declare class EditablePageComponent extends React.Component<PageProps, any> {
    state: any;
    props: PageProps;
    constructor(props: PageProps);
    render(): JSX.Element;
}
declare const _default: typeof EditablePageComponent & import("react-dnd").ContextComponent<any>;
export default _default;
