import { Button, Drawer, Icon, message, Popconfirm, Popover, Switch, notification } from 'antd';
import { useLocalStore, useObserver } from "mobx-react";
import * as React from "react";
import { editorStoreContext } from "../../../store/EditorStoreProvider";

export interface CanvasMenuProps {
    onSave: any;
    onClose: any;
}

export const CanvasMenu : React.FC<CanvasMenuProps> = (props: CanvasMenuProps) => {
    const store = React.useContext(editorStoreContext);
    if(!store) throw new Error("Store is null");

    const changeLogContent = useObserver(() => {
        return store.changelog.map((line, i) => {
            return <p key={i}>{line}</p>
        })
    });

    const localStore = useLocalStore(() => ({
        toggleValidation: function() {
            store.formStore.validationDisabled = !store.formStore.validationDisabled;
        },
        toggleConditions: function() {
            store.formStore.conditionsDisabled = !store.formStore.conditionsDisabled;
        },
        onSave : function () {
            if(props.onSave) {
                props.onSave(store.asJSONForm);
            }
        },
        onClose : function() {
            if(props.onClose) {
                props.onClose();
            }
        },
        onUndo: function () {
            let change = store.popUndoState();
            notification.info({message: `Undo - ${change}`});
        }
    }));

    return useObserver(() => {
        return <Drawer height={60} width={`calc(100% - 500px)`} placement="top" mask={false} maskClosable
        onClose={() => store.toggleShowCanvasMenu()} visible={store.showCanvasMenu} bodyStyle={{padding: "12px"}}>
        <div style={{textAlign: "center"}}>
            <span className="fl-right-margin-ten">Show Palette<Switch onChange={() => store.showPalette = !store.showPalette} defaultChecked={store.showPalette} style={{marginLeft: '5px'}} checkedChildren="YES" unCheckedChildren="NO"/></span>
            <span className="fl-right-margin-ten">Show Layout<Switch onChange={() => store.showLayout = !store.showLayout} defaultChecked={store.showLayout} style={{marginLeft: '5px'}} checkedChildren="YES" unCheckedChildren="NO"/></span>
            <span className="fl-right-margin-ten">Validations<Switch onChange={localStore.toggleValidation} defaultChecked={!store.formStore.validationDisabled} style={{marginLeft: '5px'}} checkedChildren="ON" unCheckedChildren="OFF"/></span>
            <span className="fl-right-margin-ten">Conditions<Switch onChange={localStore.toggleConditions} defaultChecked={!store.formStore.conditionsDisabled} style={{marginLeft: '5px'}} checkedChildren="ON" unCheckedChildren="OFF"/></span>
            <Popover content={changeLogContent} title="Changelog" trigger="click" style={{marginLeft:"10px"}}>
                <Button size="small" className="fl-right-margin-ten" disabled={!store.isDirty}><Icon type="ellipsis"/>Show Changes</Button>
            </Popover>
            <Button key="undo" type="default" disabled={!store.isDirty} size="small" title="Undo" className="fl-right-margin-ten" onClick={localStore.onUndo}><Icon type="undo"/>Undo</Button>
            <Button key="save" type="primary" disabled={!store.isDirty} size="small" title="Save" className="fl-right-margin-ten" onClick={localStore.onSave}><Icon type="save"/>Save</Button>
            <Popconfirm key="close" placement="topLeft" title={store.isDirty ? 'Discard unsaved changes and exit ?' : 'Exit Canvas ?'} onConfirm={localStore.onClose} okText="Yes" cancelText="No">
                <Button type="danger" size="small" title="Close" className="fl-right-margin-ten"><Icon type="close"/>Exit</Button>
            </Popconfirm>
        </div>
    </Drawer>
    })
}