export declare const DraggableItemList: import("styled-components").StyledComponent<"div", any, any, never>;
export declare const DraggableItem: import("styled-components").StyledComponent<"div", any, any, never>;
export declare const getBadgeStyle: (type: string) => "cyan" | "gold" | "green" | "magenta" | "red" | "geekblue";
export declare const getItemStyle: (isDragging: boolean, draggableStyle: any) => any;
export declare const getItemListStyle: (isDraggingOver: boolean, type: string) => {
    userSelect: string;
    padding: string;
    marginTop: string;
    border: string;
};
