import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import * as React from "react";
export interface ComponentTreeProps {
    store: FormStore;
}
export declare class ComponentTree extends React.Component<ComponentTreeProps, any> {
    nodeMap: any;
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps);
    render(): JSX.Element;
}
