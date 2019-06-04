import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { FormWrapper } from './components/FormWrapper';

export { FormWrapper };

export function renderForm(selector:string, initialState: IFormProps) {
    render(<FormWrapper formJSON={initialState}/>, document.querySelector(selector))
};