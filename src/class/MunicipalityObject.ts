export interface MunicipalityObject {
    name: string;
    count: number;
    _id: number;
    selected: boolean;
}

export function compare(a: MunicipalityObject, b: MunicipalityObject) {
    if (a.count < b.count) {
        return 1;
    }
    if (a.count > b.count) {
        return -1;
    }
    return a.name.localeCompare(b.name);
}
