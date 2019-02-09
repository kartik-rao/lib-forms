import { Container } from "unstated";
export declare class FormStateContainer extends Container<any> {
    props: any;
    _form: any;
    constructor(props: any);
    next(): void;
    prev(): void;
    onChange(id: string): void;
    handleConfirmBlur: (e: any) => void;
    handleSubmit(e: Event): void;
}
