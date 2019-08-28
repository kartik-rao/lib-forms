import { FormStoreType } from "@kartikrao/lib-forms-core";
import { useLocalStore } from "mobx-react";
import * as React from "react";
import { createEditorStore, EditorStoreType } from "./EditorStore";
export const editorStoreContext = React.createContext<EditorStoreType | null>(null);

export const EditorStoreProvider: React.FC<{formStore: FormStoreType}> = (props) => {
    const editorStore = useLocalStore(createEditorStore);
    editorStore.setFormStore(props.formStore);
    return (
      <editorStoreContext.Provider value={editorStore}>
        {props.children}
      </editorStoreContext.Provider>
    )
}