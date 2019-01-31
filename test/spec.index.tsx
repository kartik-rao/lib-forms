// import {FormWrapper} from "../src/index";
import {FormFactory} from "../src/factory/form.factory";
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const Form =  FormFactory.createForm({
    form: {
        props: {}
    },
    fields: [
        {element: "input", props:{type: "email"}, label: {text: "Email", props:{}}},
        {element: "select", props:{options: [{text: 'Foo', props: {value: 'Foo'}}]}}
]});

export default describe("FormFactory", () => {
    it("Generates a form with N elements", (done)=>{
        const wrapper = Enzyme.mount(Form.render())
        expect(wrapper.find('input[type="email"]').length).toBeTruthy();
        expect(wrapper.find('select').length).toBeTruthy();
        expect(wrapper.find('option').length).toBe(1);
        done();
    })

});