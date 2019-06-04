import { IFieldProps } from "@kartikrao/lib-forms-core/lib/models/field.properties";
import Field from "@kartikrao/lib-forms-core/lib/models/field";
import FormStore from "@kartikrao/lib-forms-core/lib/store/FormStore";
export declare class FieldFactory {
    static createField(props: IFieldProps, store: FormStore): Field;
}
