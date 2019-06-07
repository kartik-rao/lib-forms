import * as React from "react";
import { DropResult } from "react-beautiful-dnd";
import RootStore from "../../models/RootStore";
export interface CanvasProps {
    store: RootStore;
}
export declare class Canvas extends React.Component<CanvasProps, any> {
    readonly itemMap: any;
    onDragEnd: (result: DropResult) => void;
    state: {
        collapsed: boolean;
    };
    onCollapse: (collapsed: any) => void;
    render(): JSX.Element;
}
