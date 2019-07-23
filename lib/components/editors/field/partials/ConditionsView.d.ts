import * as React from "react";
import { IPredicate } from "@kartikrao/lib-forms-core";
import { IEditorView } from "../../common/IComponentEditorView";
import { FormComponentProps } from "antd/lib/form";
export interface IConditionsEditorViewProps extends FormComponentProps, IEditorView {
}
declare class ConditionsEditorView extends React.Component<IConditionsEditorViewProps, any> {
    isAdding: boolean;
    isEditing: boolean;
    uuid: string;
    field: string;
    condition: string;
    value: string;
    operator: string;
    constructor(props: IConditionsEditorViewProps);
    initialize(props: IConditionsEditorViewProps): void;
    setPredicateAttribute: (attr: "condition" | "value" | "field" | "operator", value: any) => void;
    addPredicate(p: IPredicate): void;
    removePredicate(uuid: string): void;
    editPredicate(uuid: string): void;
    reset(): void;
    handleSubmit: (e: any) => void;
    setIsAdding(value: boolean): void;
    setIsEditing(value: boolean): void;
    render(): JSX.Element;
}
declare const WrappedConditionsEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof ConditionsEditorView, Pick<IConditionsEditorViewProps, "store" | "wrappedComponentRef">>;
export default WrappedConditionsEditorView;
