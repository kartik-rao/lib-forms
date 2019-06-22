import EditorStore from "./EditorStore";
import { FormStore, Form, Field, IFormProps } from "@kartikrao/lib-forms-core";
export declare class RootStore {
    formStore: FormStore;
    editorStore: EditorStore;
    formData: Form;
    selectedField: Field;
    initialize(data: IFormProps): void;
    constructor(data: IFormProps);
}
