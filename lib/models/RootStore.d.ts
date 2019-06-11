import { IFormProps } from "@kartikrao/lib-forms-core";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Form from "@kartikrao/lib-forms-core/lib/models/form";
import EditorStore from "@kartikrao/lib-forms-core/lib/store/EditorStore";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
declare class RootStore {
    formStore: FormStore;
    editorStore: EditorStore;
    formData: Form;
    selectedField: Field;
    initialize(data: IFormProps): void;
    constructor(data: IFormProps);
}
export default RootStore;
