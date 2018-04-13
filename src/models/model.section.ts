import {Field} from "./model.field";

export interface Section {
    id?: string;
    name?: string;
    fields?: Field[]
}