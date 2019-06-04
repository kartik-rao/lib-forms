import Field from "@kartikrao/lib-forms-core/lib/models/field";
export class FieldFactory {
    static createField(props, store) {
        let field = new Field(props, store);
        // let field = <IFieldProps>{};
        // field.id = props.id;
        // field.name = props.name;
        // field.type = props.type;
        // field.inputType = props.inputType;
        // field.icon  = props.icon;
        // field.width = props.width;
        // field.children = props.children;
        // field.storage = props.storage;
        // field.showLabel = valueOrDefault(props.showLabel, true);
        // field.showLegend = valueOrDefault(props.showLegend, true);
        // field.fieldOptions = Object.assign({id: props.id}, {...props.fieldOptions});
        // field.condition = new Condition(props.id, props.condition);
        // field.label = props.label;
        // field.helpText = props.helpText;
        // field.helpPlacement = props.helpPlacement;
        // field.placeholder = props.placeholder;
        // field.queryParam = props.queryParam;
        // field.saveable = props.saveable;
        // field.value = props.value;
        return field;
    }
}
