import * as React from "react";
import { IComponentEditorView } from "../../IComponentEditorView";
import { ChoiceOption } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import { FormComponentProps } from "antd/lib/form";
export interface IFieldPropertiesViewProps extends FormComponentProps, IComponentEditorView {
}
declare class FieldPropertiesView extends React.Component<IFieldPropertiesViewProps, any> {
    constructor(props: IFieldPropertiesViewProps);
    handleSubmit: (e: any) => void;
    updateOptions(options: ChoiceOption[]): void;
    render(): JSX.Element;
}
declare const WrappedFieldPropertiesView: import("antd/lib/form/interface").ConnectedComponentClass<typeof FieldPropertiesView, Pick<IFieldPropertiesViewProps, "wrappedComponentRef" | "store">>;
export default WrappedFieldPropertiesView;
