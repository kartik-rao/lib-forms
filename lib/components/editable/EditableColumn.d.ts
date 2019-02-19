import { IColumn } from "@adinfinity/ai-core-forms";
import RootStore from "../../models/RootStore";
export interface ColumnProps {
    column: IColumn;
    span: number;
    eventHooks: any;
    canDrop: any;
    isOver: any;
    connectDropTarget: any;
    store: RootStore;
    pageIndex: number;
    sectionIndex: number;
    columnIndex: number;
}
declare const _default: import("react-dnd").DndComponentClass<any>;
export default _default;
