import { IFormProps } from '@kartikrao/lib-forms-core';
import React from 'react';
import { render } from 'react-dom';
import { Canvas } from './components/editable/Canvas';
import RootStore from './models/RootStore';

export function renderForm(selector:string, initialState: IFormProps) {
    let store = new RootStore(initialState);
    render(
        <Canvas store={store}/>, document.querySelector(selector)
    );
};