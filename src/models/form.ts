import {FormComponentProps} from "antd/lib/form";
import {IPage} from "./page";
import {IField} from "./field";

export interface FormTenant {
    eid: number;
    mid: number;
    context: string;
    stack: string;
}

export interface FormTransition {
    action?: string;
    textContent?: string;
    htmlContent?: string;
    redirectTo?: string;
}

export interface FormTransitions {
    submitted?: FormTransition
    inactive?: FormTransition
    ended?: FormTransition
}

export interface FormStatus {
    timezone?: string;
    paused?: boolean;
    active?: boolean;
    created?: Date;
    edited?: Date;
    starts?: Date;
    ends?: Date;
}

export interface FormContent {
    title?: string;
    subtitle?: string;
    labels?: string;
    offset?: string;
    width?: string;
    sidebar?: any;
    scripts?: string[];
    styles?: string[];
    datasets?: any[];
    pages?: IPage[];
    allFields: IField[];
    paginate?: boolean;
    validationDisablesPaging?: boolean;
    dependencyMap?: any;
    css?: {
        inline: string[];
        external: string[];
    }
    header? : {
        rows: any[];
    }
    footer? : {
        rows: any[];
    }
    trackingPixels?: any[];
    fieldLocation: any;
}

export interface FormLayoutOptions {
    showSteps?: boolean,
    showPageTitles?: boolean,
    showSectionTitles?: boolean,
    showSectionBorders? : boolean,
    showPageBorders?: boolean,
    validationDisablesPaging?: boolean,
    wrapperSpan?: number,
    wrapperOffset?: number
}

export interface IFormProps extends FormComponentProps {
    id: string;
    exid?: string;
    desc?: string;
    name?: string;
    tenant?: FormTenant;
    status?: FormStatus;
    content?: FormContent;
    values?: any;
    layout?: any;
    formLayoutOptions?: FormLayoutOptions;
}