import { ChoiceOption } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import * as React from "react";
export interface IChoiceOptionEditorProps {
    type: string;
    items: ChoiceOption[];
    onChange: (options: ChoiceOption[]) => void;
}
export declare class ChoiceOptionEditorView extends React.Component<IChoiceOptionEditorProps> {
    type: string;
    items: any[];
    label: string;
    value: string;
    isEditing: boolean;
    searchText: string;
    searchInput: any;
    constructor(props: IChoiceOptionEditorProps);
    initialize(props: IChoiceOptionEditorProps): void;
    move(fromIndex: number, toIndex: number): void;
    edit(record: ChoiceOption): void;
    add(): void;
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
    handleSearch: (selectedKeys: any, confirm: any) => void;
    handleReset: (clearFilters: any) => void;
    render(): JSX.Element;
}
