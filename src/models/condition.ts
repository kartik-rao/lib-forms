export type PredicateCondition = "eq" | "neq" | "gt" | "lt" | "gteq" | "lteq" | "hasval" | "nothasval";
export type PredicateOperator = "or" | "and";

export class Predicate {
    field: string;
    condition: PredicateCondition;
    value: any;
    operator: PredicateOperator = "or";

    constructor(field: string, condition: PredicateCondition, value?: any, operator?: any) {
        this.field = field;
        this.condition = condition;
        this.value = value;
        this.operator = operator;
    }
}

export class Condition {
    fieldId: string;
    predicates: Predicate[] = [];
    ancestors: string[] = [];

    constructor(fieldId: string, predicates: Predicate[] = []) {
        this.fieldId = fieldId;
        this.predicates = predicates;
        let self = this;
        this.predicates.forEach((p, i) => {
            self.ancestors.push(p.field);
        });
    }

    reduce(lhs:any, rhs:any, op: PredicateOperator) : boolean {
        if (op == 'and') {
            return lhs && rhs;
        } else {
            return lhs || rhs;
        }
    }

    value(form: any) : boolean {
        var state: boolean;
        const {fieldId} = this;
        if (!this.predicates || this.predicates.length == 0){
            return true;
        }
        this.predicates.forEach((p, i) => {
            let currentValue = form.getFieldValue(p.field);
            console.log(`Evaluating condition ${i} for [${fieldId}='${currentValue}'] on [${p.field} ${p.condition} ${p.value}]`)
            var result: any = null;
            switch(p.condition) {
                case "eq":
                    result = currentValue == p.value;
                    break;
                case "neq":
                    result = currentValue != p.value;
                    break;
                case "gt":
                    result = currentValue > p.value;
                    break;
                case "lt":
                    result = currentValue < p.value;
                    break;
                case "gteq":
                    result = currentValue >= p.value;
                    break;
                case "lteq":
                    result = currentValue <= p.value;
                    break;
                case "hasval":
                    result = typeof(currentValue) != 'undefined' && currentValue != null && currentValue !== "";
                    break;
                case "nothasval":
                    result = typeof(currentValue) == 'undefined' || currentValue == null || currentValue == "";
                    break;
                default:
                    result = false;
            }
            state = (i == 0) ? result : this.reduce(state, result, p.operator);
        });
        return state;
    }
}