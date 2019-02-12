import { IColumn, FormLayoutOptions } from "@adinfinity/ai-core-forms";
export interface ColumnProps {
    column: IColumn;
    formLayout: FormLayoutOptions;
    span: number;
    decorators: any;
    eventHooks: any;
    conditionals: any;
    canDrop: any;
    isOver: any;
    connectDropTarget: any;
}
declare const _default: import("react-dnd").DndComponentClass<any>;
export default _default;
