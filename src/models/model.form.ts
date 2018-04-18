import {FormComponentProps} from "antd/lib/form";
import {Page} from "./model.page";
import {Section} from "./model.section";
import {IField, FieldFactory, Condition, Predicate} from "./model.field";

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
    pages?: Page[];
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
    formItemLayout?: any;
}


export class FormFactory {
    static createForm(data: any) : any {
        let form = <IFormProps>{};
        form.id = data.id;
        form.exid = data.exid;
        form.desc = data.desc;
        form.name = data.name;

        let tenant = <FormTenant>{};
        if(data.tenant) {
            tenant.context = data.tenant.content;
            tenant.stack = data.tenant.content;
            tenant.eid = data.tenant.content;
            tenant.mid = data.tenant.content;
        }
        form.tenant = data.tenant;

        let status = <FormStatus>{};
        if (data.status) {
            status.timezone = data.status.timezone;
            status.paused = data.status.paused;
            status.active = data.status.active;
            status.created = data.status.created;
            status.edited = data.status.edited;
            status.starts = data.status.starts;
            status.ends = data.status.ends;
        }

        form.status = status;
        let content = <FormContent>{};
        content.title = data.content.title;
        content.subtitle = data.content.subtitle;
        content.labels = data.content.labels;
        content.offset = data.content.offset;
        content.width = data.content.width;
        content.sidebar = data.content.sidebar;
        content.scripts = data.content.scripts;
        content.styles = data.content.styles;
        content.datasets = data.content.datasets;

        content.paginate = data.content.paginate;
        content.validationDisablesPaging = data.content.validationDisablesPaging;
        content.css = data.content.css;
        content.header = data.content.header;
        content.footer = data.content.footer;
        content.trackingPixels = data.content.trackingPixels;

        let fieldState = {};
        content.pages = [];
        content.allFields = [];
        content.dependencyMap = {}
        let conditionAncestors = {};
        data.content.pages.forEach((p: any) => {
            let page = {
                name : p.name,
                icon : p.icon,
                sections: [],
                type : p.type,
                title : p.title,
                subtitle : p.subtitle,
                wizard : p.wizard
            };
            p.sections.forEach((s: any) => {
                let section = { id: s.id, name: s.name, fields: [] };
                s.fields.forEach((f: any) => {
                    let field = FieldFactory.createField(f);
                    conditionAncestors[field.id] = field.condition.ancestors;
                    section.fields.push(field);
                    content.allFields.push(field);
                });
                page.sections.push(section);
            });
            content.pages.push(page);
        });

        Object.keys(conditionAncestors).forEach((f) => {
            let ancestors = conditionAncestors[f];
            ancestors.forEach((a) => {
                content.dependencyMap[a] = content.dependencyMap[a] ? content.dependencyMap[a] : [];
                content.dependencyMap[a].push(f);
            });
        });
        console.log(content.dependencyMap);
        form.content = content;
        return form;
    }
}