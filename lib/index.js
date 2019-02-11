import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
export function renderApp(selector, initialState) {
    render(React.createElement(App, { formData: initialState }), document.querySelector(selector));
}
;
