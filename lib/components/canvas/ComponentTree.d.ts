import * as React from "react";
import { RootStore } from "../../store/RootStore";
export interface ComponentTreeProps {
    store: RootStore;
}
export declare class ComponentTree extends React.Component<ComponentTreeProps, any> {
    nodeMap: any;
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps);
    render(): JSX.Element;
}
