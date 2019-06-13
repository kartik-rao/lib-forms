import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
export declare class ValidationView extends React.Component<IEditorView, any> {
    readonly dateFormat: string;
    ruleType: string;
    properties: any;
    isEditing: boolean;
    isAdding: boolean;
    constructor(props: IEditorView);
    initialize(props: IEditorView): void;
    setRuleType(type: any): void;
    setRuleProperty(name: string, value: any): void;
    cancel(): void;
    readonly isRuleValid: boolean;
    applyRule: () => void;
    onEdit: (rule: string) => void;
    setIsAdding(isAdding: boolean): void;
    render(): JSX.Element;
}
