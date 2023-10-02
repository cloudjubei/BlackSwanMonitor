import React from "react"
import { CurrencyBitcoin } from '@mui/icons-material'

interface Props {
  id?: string
  className?: string
  token: string
  price: string
}

export const PriceInfo = ({ id, className, token, price }: Props) =>
{
  return <article id={id} className={`price-info section__item ${className}`}>
          <CurrencyBitcoin className="section__item__icon"/>
          <span className="section__item__name">{token}</span>
          <span className="section__item__value"><span>$</span>{price}</span>
  </article>
}