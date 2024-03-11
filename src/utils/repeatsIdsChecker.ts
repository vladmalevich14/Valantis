import {ItemsForPageType} from "types/types";

export const repeatsIdsChecker = (resData: any) => {
    let idMap: { [id: string]: boolean } = {};
    let uniqueArray: ItemsForPageType = {result: []};

    for (let obj of resData.result) {
        if (!idMap[obj.id]) {
            uniqueArray.result.push(obj);
            idMap[obj.id] = true;
        }
    }
    return uniqueArray
}

export const repeatsBrandsChecker = (resData: Array<string | null>) => {
    const filteredArray = resData.filter(item => item !== null);
    return filteredArray.filter((item, index: number) => filteredArray.indexOf(item) === index);
}
export const repeatsPricesChecker = (resData: Array<number>) => {
    return resData.filter((item: number, index: number) => resData.indexOf(item) === index);
}