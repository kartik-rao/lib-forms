import { useLocalStore } from "mobx-react";
import * as React from "react";
import { createEditorStore } from "./EditorStore";
export const editorStoreContext = React.createContext(null);
export const EditorStoreProvider = (props) => {
    const editorStore = useLocalStore(createEditorStore);
    editorStore.setFormStore(props.formStore);
    return (React.createElement(editorStoreContext.Provider, { value: editorStore }, props.children));
};
