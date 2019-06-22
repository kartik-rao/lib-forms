import { ChoiceOption } from "@kartikrao/lib-forms-core";
import { FormComponentProps } from "antd/lib/form";
import * as React from "react";
export interface IChoiceOptionEditorViewProps extends FormComponentProps {
    type: string;
    items: ChoiceOption[];
    onChange: (options: ChoiceOption[]) => void;
}
declare class ChoiceOptionEditorView extends React.Component<IChoiceOptionEditorViewProps> {
    type: string;
    items: any[];
    label: string;
    value: string;
    isEditing: boolean;
    searchInput: any;
    showAdd: boolean;
    searchText: string;
    constructor(props: IChoiceOptionEditorViewProps);
    showAddChoiceItem: (show: boolean) => void;
    initialize(props: IChoiceOptionEditorViewProps): void;
    move(fromIndex: number, toIndex: number): void;
    edit(record: ChoiceOption): void;
    addChoiceOption: (e: any) => void;
    remove(index: number): void;
    setSearchInput(node: React.ReactNode): void;
    getColumnSearchProps: (dataIndex: any) => {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, }: {
            setSelectedKeys: any;
            selectedKeys: any;
            confirm: any;
            clearFilters: any;
        }) => JSX.Element;
        filterIcon: (filtered: any) => JSX.Element;
        onFilter: (value: any, record: any) => any;
        onFilterDropdownVisibleChange: (visible: any) => void;
        render: (text: any) => JSX.Element;
    };
    readonly uniqueValuePattern: RegExp;
    handleSearch: (selectedKeys: any, confirm: any) => void;
    handleReset: (clearFilters: any) => void;
    render(): JSX.Element;
}
declare const WrappedChoiceOptionEditorView: import("antd/lib/form/interface").ConnectedComponentClass<typeof ChoiceOptionEditorView, Pick<IChoiceOptionEditorViewProps, "onChange" | "type" | "wrappedComponentRef" | "items">>;
export default WrappedChoiceOptionEditorView;
