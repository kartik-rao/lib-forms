import * as React from "react";
export declare class ComponentMenu extends React.Component<any, any> {
    droppableIndex: number;
    menuTheme: "light";
    menuMode: "vertical-left";
    submenuMode: "inline";
    submenuCollapsed: false;
    asDroppableGroup: ({ dropId, dropType, key, title, icon, groups }: {
        dropId: any;
        dropType: any;
        key: any;
        title: any;
        icon: any;
        groups: any;
    }) => JSX.Element;
    asDroppable: (dropId: any, dropType: any, title: any, dragType: any, dragId: any, icon: any) => JSX.Element;
    asDraggableCard: (dropId: any, dropType: any, title: any, dragType: any, dragId: any, icon: any) => JSX.Element;
    render(): JSX.Element;
}
