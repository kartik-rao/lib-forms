/// <reference types="react" />
import { ItemLayoutOptions } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
export interface IItemLayoutViewProps extends FormComponentProps {
    formLayout: string;
    itemLayoutOptions: ItemLayoutOptions;
    onSave: (item: ItemLayoutOptions) => void;
}
declare const _default: import("antd/lib/form/interface").ConnectedComponentClass<(props: IItemLayoutViewProps & FormComponentProps<any>) => JSX.Element, Pick<IItemLayoutViewProps & FormComponentProps<any>, "wrappedComponentRef" | "itemLayoutOptions" | "formLayout" | "onSave">>;
export default _default;
