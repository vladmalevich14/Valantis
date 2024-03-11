import {ChangeEvent, useEffect, useState} from "react";
import {getFields} from "utils/getFields";
import {FiltersOffsetType, GetFiltersPropsType} from "types/types";
import {repeatsBrandsChecker, repeatsPricesChecker} from "utils/repeatsIdsChecker";
import {FilterRow} from "components/filters/FilterRow/FilterRow";
import styles from './filters.module.css'
import {getFilters} from "utils/getFilters";

export const Filters = ({page, setIdsForPage}: FiltersOffsetType) => {
    const [brands, setBrands] = useState<string[]>()
    const [prices, setPrices] = useState<number[]>()
    const [inputValue, setInputValue] = useState<string>('')
    const [filters, setFilters] = useState<number | string>(0 || '')
    const [errorsFromFields, setErrorsFromFields] = useState<any>()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const filtersButtonClick = async () => {
        const body: GetFiltersPropsType = {}
        if (inputValue) body.product = inputValue
        if (filters) {
            if (typeof filters === "number") {
                body.price = filters
            } else {
                if (filters === 'Valantis') {
                    body.brand = ''
                } else {
                    body.brand = filters
                }
            }
        }

        const res = await getFilters(body)
        setIdsForPage(res)
    }

    useEffect(() => {
        getFields({field: 'brand', page}).then((res) => setBrands(res.result)).catch((e) => setErrorsFromFields(e))
        getFields({field: 'price', page}).then((res) => setPrices(res.result)).catch((e) => setErrorsFromFields(e))
    }, [page, errorsFromFields])

    return (
        <div className={styles.filtersMainContainer}>
            <div className={styles.filtersWrapper}>
                <h3 className={styles.filterHeader}>Цена</h3>
                <div className={styles.filtersContainer}>
                    {prices && repeatsPricesChecker(prices).map((el, i) => {
                        return <FilterRow key={i} title={el.toString()} index={i} setValueFilter={setFilters}
                                          valueFilter={filters} filterType={'prices'}/>
                    })}
                </div>
            </div>
            <div className={styles.filtersWrapper}>
                <h3 className={styles.filterHeader}>Бренд</h3>
                <div className={styles.filtersContainer}>
                    {brands && repeatsBrandsChecker(brands).map((el, i) => {
                        return <FilterRow key={i} title={el} index={i} valueFilter={filters}
                                          setValueFilter={setFilters} filterType={'brands'}/>
                    })}
                </div>
            </div>
            <div className={styles.filtersWrapper}>
                <h3 className={styles.filterHeader}>Название</h3>
                <input
                    className={styles.filtersInput}
                    placeholder="Поиск по названию"
                    onChange={(e) => handleChange(e)}
                    value={inputValue}
                />
            </div>
            <button className={styles.filtersButton} onClick={filtersButtonClick} disabled={!filters && !inputValue}>Применить</button>
        </div>
    );
};