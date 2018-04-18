import {IField} from "./model.field";

export interface Section {
    id?: number;
    name?: string;
    fields?: IField[]
}