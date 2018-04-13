export interface FieldStorage {
    unique: boolean;
    name: string;
    type: string;
    customerKey: string;
    description: string;
    isNullable: boolean;
    isPrimaryKey: boolean;
    isRequired: boolean;
    isSendable: boolean;
}

export interface FieldValidation {
    type: string;
    message: string;
    willValidate: string;
    dependsOn: string;
    lengthMin: Number;
    lengthMax: Number;
    pattern: string;
}

export interface FieldReflextion {
    onField: string;
    action: string;
    lastResult: string;
}

export interface Field {
    id?: string;
    name?: string;
    type?: string;
    inputType?: string;
    icon?: string;
    value?: string;
    width?: string;
    children?: Field[];
    storage?: FieldStorage;
    showLegend?: boolean;
    showLabel?: boolean;
    enabled?: boolean;
    label?: string;
    helpText?: string;
    helpPlacement?: string;
    cssClassNames?: string[]
    validateable?: boolean;
    queryParam?: string;
    saveable?: boolean;
}