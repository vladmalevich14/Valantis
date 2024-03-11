import React from 'react';
import styles from './FilterRow.module.css';
import {useState} from 'react';
import {FilterRowType} from "types/types";

export const FilterRow = ({title, index, setValueFilter, valueFilter, filterType}: FilterRowType) => {
    const [active, setActive] = useState<boolean>(false);
    const disabledPricesCondition = valueFilter && valueFilter !== Number(title)
    const disabledBrandsCondition = valueFilter && valueFilter !== title
    const disabledGeneralConditions = filterType === 'prices' ? !!disabledPricesCondition : !!disabledBrandsCondition

    const onClickHandler = () => {
        setActive(!active)
        if (filterType === 'prices') {
            if (active) {
                setValueFilter(0)
            } else {
                setValueFilter(Number(title))
            }
        } else {
            if (active) {
                setValueFilter('')
            } else {
                if(title !== null) setValueFilter(title)
            }
        }
    }

    return (
        <label key={index} className={`${styles.filterRow} ${disabledGeneralConditions && styles.filterRowDisabled}`}>
            <p className={styles.filterRowTitle}>{title}</p>
            <input type="checkbox" className={styles.filterRowCheckBox} onChange={onClickHandler}
                   disabled={disabledGeneralConditions}
                   checked={active}/>
        </label>
    );
};
