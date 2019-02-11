import React from 'react';
import { render } from 'react-dom';
import { FormWrapper } from './components/FormWrapper';
export { FormWrapper };
export function renderForm(selector, initialState) {
    render(React.createElement(FormWrapper, { formData: initialState }), document.querySelector(selector));
}
;
