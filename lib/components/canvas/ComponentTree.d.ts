import * as React from "react";
import { EditorStore } from "../../store/EditorStore";
export interface ComponentTreeProps {
    store: EditorStore;
}
export declare class ComponentTree extends React.Component<ComponentTreeProps, any> {
    nodeMap: any;
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps);
    render(): JSX.Element;
}
