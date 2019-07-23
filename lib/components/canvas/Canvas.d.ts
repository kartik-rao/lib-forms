import { Factory } from "@kartikrao/lib-forms-core";
import * as React from "react";
import { DropResult } from "react-beautiful-dnd";
import { EditorStore } from "../../store/EditorStore";
export interface CanvasProps {
    store: EditorStore;
}
export declare class Canvas extends React.Component<CanvasProps, any> {
    factory: Factory;
    constructor(props: CanvasProps);
    readonly itemMap: any;
    handleNewItem: (result: DropResult) => void;
    handleMoveItem: (result: DropResult) => void;
    onDragEnd: (result: DropResult) => void;
    state: {
        siderCollapsed: boolean;
    };
    onSiderCollapse: (siderCollapsed: any) => void;
    toggleSider: () => void;
    render(): JSX.Element;
}
