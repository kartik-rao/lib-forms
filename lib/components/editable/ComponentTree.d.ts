import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import * as React from "react";
import { DropResult } from "react-beautiful-dnd";
export interface ComponentTreeProps {
    store: FormStore;
}
export declare class ComponentTree extends React.Component<ComponentTreeProps, any> {
    nodeMap: any;
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps);
    readonly itemMap: any;
    onDragEnd: (result: DropResult) => void;
    render(): JSX.Element;
}
