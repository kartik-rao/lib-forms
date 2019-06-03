import * as React from "react";
import { IFormProps } from "@adinfinity/ai-core-forms";
export interface ComponentTreeProps {
    formData: IFormProps;
}
export default class ComponentTree extends React.Component<ComponentTreeProps, any> {
    props: ComponentTreeProps;
    constructor(props: ComponentTreeProps);
    onChange: (treeData: any[]) => void;
    getTreeData(): any[];
    render(): JSX.Element;
}
