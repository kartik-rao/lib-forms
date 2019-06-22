import * as React from "react";
import { IPredicate } from "@kartikrao/lib-forms-core";
import { IEditorView } from "../../common/IComponentEditorView";
export declare class ConditionsView extends React.Component<IEditorView, any> {
    field: string;
    expression: string;
    value: string;
    operator: string;
    isAdding: boolean;
    constructor(props: IEditorView);
    initialize(props: IEditorView): void;
    setField: (e: any) => void;
    setExpression: (e: any) => void;
    setValue: (e: any) => void;
    setOperator: (e: any) => void;
    addPredicate(p: IPredicate): void;
    removePredicate(uuid: string): void;
    cancel(): void;
    handleSubmit: (e: any) => void;
    setIsAdding(value: boolean): void;
    render(): JSX.Element;
}
