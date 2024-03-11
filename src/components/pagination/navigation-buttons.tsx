import { FC } from 'react'
import ArrowLeft from "assets/svg/arrow-left";
import ArrowRight from "assets/svg/arrow-right";
import s from './pagination.module.css'

export type NavigationButtonProps = {
  onClick: () => void
  disabled?: boolean
}

export const PrevButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={`${s.item} ${s.itemLeft}`} onClick={onClick} disabled={disabled}>
      <ArrowLeft fill={disabled ? 'gray' : 'black'} />
    </button>
  )
}

export const NextButton: FC<NavigationButtonProps> = ({ onClick, disabled }) => {
  return (
    <button className={`${s.item} ${s.itemRight}`} onClick={onClick} disabled={disabled}>
      <ArrowRight fill={disabled ? 'gray' : 'black'} />
    </button>
  )
}
