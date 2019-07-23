import {EditorStore} from "./EditorStore";
import { FormStore, Form, Field, IFormProps, Factory } from "@kartikrao/lib-forms-core";
import { action, configure, decorate, observable } from "mobx";

configure({enforceActions: "always"});
// DEPRECATED
class RootStore {
    formStore: FormStore;
    editorStore: EditorStore;
    @observable formData: Form;
    selectedField: Field;

    @action initialize(data: IFormProps) {
        console.warn("Warning - lib-forms/RootStore is deprecated, use EditorStore instead")
        this.formStore = new FormStore();
        let factory = new Factory(this.formStore);
        this.editorStore = new EditorStore(data);
        this.formData = factory.makeForm(data);
    }

    constructor(data: IFormProps) {
        this.initialize(data);
    }
}