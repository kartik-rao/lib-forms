import { ChoiceOption } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { IEditorView } from "../common/IComponentEditorView";
export declare class FieldEditorView extends React.Component<IEditorView, any> {
    constructor(props: any);
    updateOptions(options: ChoiceOption[]): void;
    onOk(): void;
    onCancel(): void;
    render(): JSX.Element;
}
