import React from "react"
import { ArrowUpward, ArrowDownward, CompareArrows } from '@mui/icons-material'

interface Props {
  name: string
  id?: string
  className?: string
  action: number
}

export const SignalInfo = ({ name, id, className, action }: Props) =>
{
  const color = (action > 0) ? "#35d8ac" : (action < 0) ? "#dd15ac" : "#979cb0"
  const icon = (action > 0) ? <ArrowUpward style={{color}}/> : (action < 0 ) ? <ArrowDownward style={{color}}/> : <CompareArrows style={{color}}/>
  const actionName = (action > 0) ? " BUY" : (action < 0) ? "SELL" : "NONE"
  return <article id={id} className={`signal-info section__item ${className}`}>
    {icon}
    <span className="section__item__name" style={{color}}>{name}</span>
    <span className="section__item__value" style={{color}}>{action}<span>{actionName}</span></span>
  </article>
}