import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { FormWrapper } from './components/FormWrapper';
import RootStore from './models/RootStore';

export { FormWrapper };

export function renderForm(selector:string, initialState: IFormProps) {
    let store = new RootStore(initialState);
    render(<FormWrapper store={store} />, document.querySelector(selector))
};