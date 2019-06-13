import { ChoiceOption } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
import { IEditorView } from "../../common/IComponentEditorView";
export interface IPropertiesViewProps extends FormComponentProps, IEditorView {
}
declare class PropertiesView extends React.Component<IPropertiesViewProps, any> {
    constructor(props: IPropertiesViewProps);
    handleSubmit: (e: any) => void;
    updateOptions(options: ChoiceOption[]): void;
    render(): JSX.Element;
}
declare const WrappedPropertiesView: import("antd/lib/form/interface").ConnectedComponentClass<typeof PropertiesView, Pick<IPropertiesViewProps, "store" | "wrappedComponentRef">>;
export default WrappedPropertiesView;