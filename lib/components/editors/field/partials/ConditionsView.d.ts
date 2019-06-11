import * as React from "react";
import { IPredicate } from "@kartikrao/lib-forms-core/lib/models/condition.predicate";
import { IComponentEditorView } from "../../IComponentEditorView";
export declare class ConditionsView extends React.Component<IComponentEditorView, any> {
    field: string;
    expression: string;
    value: string;
    operator: string;
    isAdding: boolean;
    constructor(props: IComponentEditorView);
    initialize(props: IComponentEditorView): void;
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
