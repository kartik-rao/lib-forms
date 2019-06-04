import { IFormContent, IFormProps, IFormStatus, IFormTenant, valueOrDefault } from "@kartikrao/lib-forms-core";
import { Factory } from "@kartikrao/lib-forms-core/lib/models/factory";
import Form from "@kartikrao/lib-forms-core/lib/models/form";
import RootStore from "../models/RootStore";

export class FormFactory {
    static createForm(data: IFormProps, store: RootStore) : Form {
        let _form = <IFormProps>{};
        _form.id = data.id;
        _form.exid = data.exid;
        _form.desc = data.desc;
        _form.name = data.name;

        let flOptions = data.formLayoutOptions || {}
        _form.formLayoutOptions = {
            wrapperSpan: valueOrDefault(flOptions.wrapperSpan, 20),
            wrapperOffset: valueOrDefault(flOptions.wrapperOffset, 2),
            showPageBorders : valueOrDefault(flOptions.showPageBorders, true),
            showSectionBorders : valueOrDefault(flOptions.showSectionBorders, true),
            showPageTitles : valueOrDefault(flOptions.showPageTitles, true),
            showSectionTitles:valueOrDefault(flOptions.showSectionTitles, true),
            showSteps:valueOrDefault(flOptions.showSteps, true),
            validationDisablesPaging: valueOrDefault(flOptions.validationDisablesPaging, true),
        };

        let tenant = <IFormTenant>{};
        if(data.tenant) {
            tenant.context = data.tenant.context;
            tenant.stack = data.tenant.stack;
            tenant.eid = data.tenant.eid;
            tenant.mid = data.tenant.mid;
        }
        _form.tenant = data.tenant;

        let status = <IFormStatus>{};
        if (data.status) {
            status.timezone = data.status.timezone;
            status.paused = data.status.paused;
            status.active = data.status.active;
            status.created = data.status.created;
            status.edited = data.status.edited;
            status.starts = data.status.starts;
            status.ends = data.status.ends;
        }

        _form.status = status;
        let content = <IFormContent>{};
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
        content.css = data.content.css;
        content.header = data.content.header;
        content.footer = data.content.footer;
        content.trackingPixels = data.content.trackingPixels;

        content.pages = data.content.pages || [];
        _form.content = content;

        const factory = new Factory(store.formStore);
        return factory.makeForm(_form);
    }
}