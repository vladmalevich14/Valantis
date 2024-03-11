import { FC } from 'react'
import {usePagination} from "components/pagination/usePagination";
import {NextButton, PrevButton} from "components/pagination/navigation-buttons";
import {MainPaginationButtons} from "components/pagination/main-pagination-buttons";
import s from './pagination.module.css'

export type PaginationProps = {
  count: number
  page: number
  onChange: (page: number) => void
  siblings?: number
}

export const Pagination: FC<PaginationProps> = ({
  onChange,
  count,
  page,
  siblings
}) => {
  const {
    paginationRange,
    isLastPage,
    isFirstPage,
    handlePreviousPageClicked,
    handleNextPageClicked,
    handleMainPageClicked,
  } = usePagination({
    page,
    count,
    onChange,
    siblings,
  })

  return (
    <div className={s.root}>
      <div className={s.container}>
        <PrevButton onClick={handlePreviousPageClicked} disabled={isFirstPage} />
        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />
        <NextButton onClick={handleNextPageClicked} disabled={isLastPage} />
      </div>
    </div>
  )
}
