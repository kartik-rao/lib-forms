import { __awaiter } from "tslib";
import { createFormStore, Factory } from '@kartikrao/lib-forms-core';
import { Layout, notification } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { EditorStoreProvider } from './store/EditorStoreProvider';
import { Canvas } from "./components/canvas/Canvas";
import { enableLogging } from 'mobx-logger';
enableLogging({ action: false, compute: false });
import TestForm from "@kartikrao/lib-forms-core/lib/test-form";
import "./forms.editors.m.css";
export default function renderForm(selector, initialState) {
    return __awaiter(this, void 0, void 0, function* () {
        const formStore = createFormStore();
        formStore.setForm(Factory.makeForm(formStore, initialState));
        let onSave = (data) => {
            notification.info({ message: "Saved!!" });
            console.log(data);
        };
        render(React.createElement(Layout, { style: { height: '100vh', overflow: 'hidden' } },
            React.createElement(React.Suspense, { fallback: "Loading..." },
                React.createElement(EditorStoreProvider, { formStore: formStore },
                    React.createElement(Canvas, { onSave: onSave })))), document.querySelector(selector));
    });
}
;
renderForm("#root", TestForm);
