import React from 'react';
import { render } from 'react-dom';
import App from './components/App'

export function renderApp(selector:string, initialState: any) {
    render(<App formData={initialState}/>, document.querySelector(selector))
};