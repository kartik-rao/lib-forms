import { IFormProps } from "@kartikrao/lib-forms-core";
import Form from "@kartikrao/lib-forms-core/lib/models/form";
import RootStore from "../models/RootStore";
export declare class FormFactory {
    static createForm(data: IFormProps, store: RootStore): Form;
}
