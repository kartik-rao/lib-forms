import { IColumn, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface ColumnProps {
    column: IColumn;
    formLayout: FormLayoutOptions;
    span: number;
    values: any;
    eventHooks: any;
    conditionals: any;
    canDrop: any;
    isOver: any;
    errors: any;
    connectDropTarget: any;
    touched: any;
}
declare const _default: import("react-dnd").DndComponentClass<any>;
export default _default;
