import React from 'react';
import { render } from 'react-dom';
import { FormWrapper } from './components/FormWrapper';
import EditableFormWrapper from "./components/EditableFormWrapper";
export { FormWrapper };
export function renderForm(selector, initialState) {
    render(React.createElement(FormWrapper, { formJSON: initialState }), document.querySelector(selector));
}
;
export function renderEditableForm(selector, initialState) {
    render(React.createElement(EditableFormWrapper, { formJSON: initialState }), document.querySelector(selector));
}
;
