import styled from 'styled-components';
export const ItemList = styled.div `
    min-height: 50px;
`;
export const Container = styled.div `
    cursor: 'grab'
`;
export const getBadgeStyle = (type) => {
    switch (type) {
        case "Form": return "cyan";
        case "Page": return "magenta";
        case "Section": return "geekblue";
        case "Column": return "gold";
        case "Field": return "green";
        default: return "red";
    }
};
export const getItemStyle = (isDragging, draggableStyle) => (Object.assign({ userSelect: 'none', marginLeft: '12px', marginTop: '8px' }, draggableStyle));
