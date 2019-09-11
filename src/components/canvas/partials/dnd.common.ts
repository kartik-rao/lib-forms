import styled from 'styled-components';

export const DraggableItemList = styled.div<any>`
    min-height: 50px;
    flex: 0 0 100px;
`;

export const DraggableItem = styled.div<any>`
    cursor: 'grab';
`;

export const getBadgeStyle = (type: string) => {
    switch (type) {
        case "Form": return "cyan";
        case "Page": return "magenta";
        case "Section" : return "geekblue";
        case "Column" : return "gold";
        case "Field" : return "green"
        default : return "red";
    }
}

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: "0.5rem",
    ...draggableStyle
});

export const getItemListStyle = (isDraggingOver: boolean, type: string) => ({
    userSelect: 'none',
    padding : "0.5rem 0.5rem 0",
    marginTop: "4px",
    border: isDraggingOver ? "1px dashed lightgray" : "none",
})