const grid = 8;

export class DnDHelper {
    static reorder = (list : any[], startIndex:number, endIndex:number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    static getTypes () {
        return {
            'Column' : 'Column',
            'Section' : 'Section',
            'Field'   : 'Field'
        }
    }
}