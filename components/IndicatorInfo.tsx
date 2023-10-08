import React from "react"
import { CompareArrows } from '@mui/icons-material'

interface Props {
  name: string
  id?: string
  className?: string
  value: number
}

export const IndicatorInfo = ({ name, id, className, value }: Props) =>
{
  const color = "#979cb0"
  const icon = <CompareArrows style={{color}}/>

  return <article id={id} className={`indicator-info section__item ${className}`}>
    {icon}
    <span className="section__item__name" style={{color}}>{name}</span>
    <span className="section__item__value" style={{color}}>{value}</span>
  </article>
}