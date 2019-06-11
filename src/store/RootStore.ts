import { IFormProps } from "@kartikrao/lib-forms-core";
import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import Form from "@kartikrao/lib-forms-core/lib/models/form";
import EditorStore from "./EditorStore";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { action, configure, decorate, observable } from "mobx";

configure({enforceActions: "always"});

class RootStore {
    formStore: FormStore;
    editorStore: EditorStore;
    formData: Form;
    selectedField: Field;

    @action initialize(data: IFormProps) {
        this.formStore = new FormStore();
        let factory = new Factory(this.formStore);
        this.editorStore = new EditorStore({formStore: this.formStore, factory: factory, field: null});
        this.formData = factory.makeForm(data);
    }

    constructor(data: IFormProps) {
        this.initialize(data);
    }
}

decorate(RootStore, {
    formData: observable
});

export default RootStore;