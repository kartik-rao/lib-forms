import styled from 'styled-components';

export const ItemList = styled.div`
    min-height: 50px;
`;

export const Container = styled.div`
    cursor: 'grab'
`;

export const getBadgeStyle = (type: string) => {
    switch (type) {
        case "Page": return "magenta";
        case "Section" : return "geekblue";
        case "Column" : return "gold";
        case "Field" : return "green"
    }
}

export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    marginLeft : '12px',
    marginTop : '8px',
    ...draggableStyle
})