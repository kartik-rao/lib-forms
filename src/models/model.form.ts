import {Page} from "./model.page";

export interface FormTenant {
    eid: number;
    mid: number;
    context: string;
    stack: string;
}

export interface FormTransition {
    action: string;
    textContent: string;
    htmlContent: string;
    redirectTo: string;
}

export interface FormTransitions {
    submitted: FormTransition
    inactive: FormTransition
    ended: FormTransition
}

export interface FormStatus {
    timezone: string;
    paused: boolean;
    active: boolean;
    created: Date;
    edited: Date;
    starts: Date;
    ends: Date;
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
    pages?: Page[];
    paginate?: boolean;
    validationDisablesPaging?: boolean;
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
}

export interface Form {
    id?: string;
    exid?: string;
    desc?: string;
    name?: string;
    tenant?: FormTenant;
    status?: FormStatus;
    content?: FormContent;
    values?: any
}