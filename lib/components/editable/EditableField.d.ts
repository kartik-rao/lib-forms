import { IField } from "@adinfinity/ai-core-forms";
import RootStore from "../../models/RootStore";
export interface FieldProps {
    field: IField;
    eventHooks: any;
    fieldIndex: number;
    listId: any;
    removeField: any;
    moveField: any;
    isDragging: any;
    connectDragSource: any;
    connectDropTarget: any;
    store: RootStore;
}
declare const _default: any;
export default _default;
