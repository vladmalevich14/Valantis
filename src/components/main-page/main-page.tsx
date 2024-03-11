import {useEffect, useState} from 'react';
// @ts-ignore
import md5 from 'MD5';
import styles from './main-page.module.css'
import {CatalogItem} from "components/catalog-item/catalog-item";
import {Pagination} from "components/pagination/pagination";
import {repeatsIdsChecker} from "utils/repeatsIdsChecker";
import {IdsForPageType, ItemsForPageType} from "types/types";
import {Filters} from "components/filters/filters";

export const MainPage = () => {
    const [idsForPage, setIdsForPage] = useState<IdsForPageType>({result: []})
    const pagesCount = idsForPage.result.length && idsForPage.result.length / 50
    console.log('pagesCount', pagesCount)
    const [itemsForPage, setItemsForPage] = useState<ItemsForPageType>({result: []})
    const [loader, setLoader] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [errorFromIds, setErrorFromIds] = useState<any>()
    const [errorFromItems, setErrorFromItems] = useState<any>()

    const getIds = async () => {
        const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
        await fetch('https://api.valantis.store:41000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`Valantis_${timestamp}`)
            },
            body: JSON.stringify({action: 'get_ids', params: {offset: (page - 1) * 50}})
        })
            .then(async (res) => {
                try {
                    const resData = await res.json();
                    setIdsForPage(resData)
                } catch (e) {
                    console.error(e)
                    setErrorFromIds(e)
                }
            })
            .catch((e) => {
                console.error(e)
            })
    }

    const getItems = async () => {
        setLoader(true)
        const timestamp = new Date().toISOString().slice(0, 10).split('-').join('');
        await fetch('https://api.valantis.store:41000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Auth': md5(`Valantis_${timestamp}`)
            },
            body: JSON.stringify({
                action: 'get_items',
                params: {ids: idsForPage.result.slice((page - 1) * 50, page * 50)}
            })
        })
            .then(async (res) => {
                try {
                    const resData = await res.json();
                    const result = repeatsIdsChecker(resData)
                    setItemsForPage(result)
                } catch (e) {
                    console.error(e)
                    setErrorFromItems(e)
                }
            })
            .finally(() => {
                setLoader(false)
            })
    }


    useEffect(() => {
        getIds()
    }, [errorFromIds])

    useEffect(() => {
        if (idsForPage.result.length > 0) getItems()
    }, [idsForPage, page, errorFromItems])


    return (
        <div className={styles.catalog}>
            <h1 className={styles.headerCatalog}>Каталог ювелирных украшений</h1>
            {loader ? <div className={styles.loader}></div>
                : <div className={styles.contentContainer}>
                    <Filters page={page} setIdsForPage={setIdsForPage}/>
                    <div className={styles.itemsAndPaginationContainer}>
                        <div className={styles.itemsContainer}>
                            {itemsForPage.result.length > 0 &&
                                itemsForPage.result.map((el) => {
                                    return <CatalogItem key={`${el.id}${Math.random()}`} item={el}/>
                                })}
                        </div>
                        <Pagination count={Math.ceil(pagesCount)} page={page} onChange={setPage}/>
                    </div>
                </div>
            }
        </div>
    );
};