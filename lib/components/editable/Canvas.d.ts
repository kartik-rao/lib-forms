import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import * as React from "react";
import { DropResult } from "react-beautiful-dnd";
import RootStore from "../../models/RootStore";
export interface CanvasProps {
    store: RootStore;
}
export declare class Canvas extends React.Component<CanvasProps, any> {
    factory: Factory;
    constructor(props: CanvasProps);
    readonly itemMap: any;
    handleNewItem: (result: DropResult) => void;
    handleMoveItem: (result: DropResult) => void;
    onDragEnd: (result: DropResult) => void;
    state: {
        collapsed: boolean;
    };
    onCollapse: (collapsed: any) => void;
    render(): JSX.Element;
}
