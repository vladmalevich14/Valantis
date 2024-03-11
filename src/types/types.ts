import {Dispatch, SetStateAction} from "react";

export type ItemType = {
    brand: null | string
    id: string
    price: number
    product: string
}

export type IdsForPageType = {
    result: string[]
}

export type ItemsForPageType = {
    result: ItemType[]
}

export type ItemPropsType = {
    item: ItemType
}

export type FilterRowType = {
    title: string | null
    index: number
    setValueFilter: Dispatch<SetStateAction<number | string>>
    valueFilter: number | string
    filterType: 'brands' | 'prices'
}

export type FilterFieldsType = {
    field: string
    page: number
}

export type FiltersOffsetType = {
    page: number
    setIdsForPage: Dispatch<SetStateAction<IdsForPageType>>
}

export type GetFiltersPropsType = {
    product?: string
    price?: number
    brand?: string
}

