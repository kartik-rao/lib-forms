import IColumn from "@kartikrao/lib-forms-core/lib/models/column";
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
declare const _default: any;
export default _default;
