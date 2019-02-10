// import {FormWrapper} from "../src/index";
import {FieldType} from "@adinfinity/ai-core-forms";
import {FieldComponent} from "../src/components/Field";

import * as React from "react";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const fieldProps = {
    id: "f6", name: "f6", type: "input", inputType: "text", label: "Text Label F6",
    placeholder: 'Placeholder Text F6',
    fieldOptions: {
        id: "f6",
        rules: [
            { type: FieldType.string, required: true, message: 'Required validation message' },
            { min: 2, message: "MinLength=2 validation message"},
        ]
    },
    location : {}
}


const eventHooks = (id) => { return (e) => {console.log(e);}};
const decorators = {getFieldDecorator: (id, options) => {return (e) => {return e;}}};
const conditionals = {"f6" : {result: true}}

export default describe("FieldComponent", () => {
    it("Generates a decorated field element", (done)=>{
        const wrapper = Enzyme.mount(
            <FieldComponent field={fieldProps} formLayout={{}} eventHooks={eventHooks} decorators={decorators} conditionals={conditionals}/>
        )
        expect(wrapper.find('input[type="text"]').length).toBeTruthy();
        done();
    })

});