import React from 'react';
import { render } from 'react-dom';

import {FormWrapper} from './components/FormWrapper';
import EditableFormWrapper from "./components/EditableFormWrapper";

export {FormWrapper};

export function renderForm(selector:string, initialState: any) {
    render(<FormWrapper formData={initialState}/>, document.querySelector(selector))
};

export function renderEditableForm(selector:string, initialState: any) {
    render(<EditableFormWrapper formData={initialState}/>, document.querySelector(selector))
};