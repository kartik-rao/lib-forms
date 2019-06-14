var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import EditorStore from "./EditorStore";
import { FormStore } from "@kartikrao/lib-forms-core/lib/store/FormStore";
import { action, configure, observable } from "mobx";
configure({ enforceActions: "always" });
class RootStore {
    constructor(data) {
        this.initialize(data);
    }
    initialize(data) {
        this.formStore = new FormStore();
        let factory = new Factory(this.formStore);
        this.editorStore = new EditorStore({ formStore: this.formStore, factory: factory, item: null });
        this.formData = factory.makeForm(data);
    }
}
__decorate([
    observable
], RootStore.prototype, "formData", void 0);
__decorate([
    action
], RootStore.prototype, "initialize", null);
