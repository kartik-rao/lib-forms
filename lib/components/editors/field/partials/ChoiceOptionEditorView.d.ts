import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form/Form";
import * as React from "react";
export interface IChoiceOptionEditorViewProps {
    type: string;
    items: ChoiceOption[];
    onChange: any;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<React.FunctionComponent<IChoiceOptionEditorViewProps & FormComponentProps<any>>, Pick<FormComponentProps<any> & IChoiceOptionEditorViewProps, "type" | "wrappedComponentRef" | "items" | "onChange">>;
export default _default;
