import React from 'react';
import { render } from 'react-dom';
import {FormWrapper} from './components/FormWrapper';

export function renderForm(selector:string, initialState: any) {
    render(<FormWrapper formData={initialState}/>, document.querySelector(selector))
};