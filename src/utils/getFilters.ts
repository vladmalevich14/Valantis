import md5 from "MD5";
import {GetFiltersPropsType} from "types/types";

export const getFilters = async ({product, price, brand}: GetFiltersPropsType) => {
    const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    const bodyRequest = product || price || brand ? JSON.stringify({
        action: 'filter',
        params: {product, price, brand}
    }) : JSON.stringify({action: 'filter'})

    const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth': md5(`Valantis_${timestamp}`)
        },
        body: bodyRequest
    })
        .then(async (res) => {
            try {
                return await res.json();
            } catch (e) {
                console.error(e)
            }
        })

    return res
}