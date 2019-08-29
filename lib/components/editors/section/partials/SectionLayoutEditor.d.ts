import { Section } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
export interface ISectionLayoutEditorViewProps extends FormComponentProps {
    section: Section;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<React.FunctionComponent<ISectionLayoutEditorViewProps & FormComponentProps<any>>, Pick<ISectionLayoutEditorViewProps & FormComponentProps<any>, "section" | "wrappedComponentRef">>;
export default _default;
