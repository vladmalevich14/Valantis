import {FilterFieldsType} from "types/types";
import md5 from "MD5";

export const getFields = async ({field, page}: FilterFieldsType) => {
    const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
    const res = await fetch('https://api.valantis.store:41000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Auth': md5(`Valantis_${timestamp}`)
        },
        body: JSON.stringify({
            action: 'get_fields',
            params: {field, offset: (page - 1) * 50, limit: 50}
        })
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