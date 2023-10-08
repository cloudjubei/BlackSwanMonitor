import React, { useMemo } from "react"
import { AttachMoney, CompareArrows } from '@mui/icons-material'
import { PriceInfo } from "./PriceInfo"
import { IndicatorInfo } from "./IndicatorInfo"
import { SignalInfo } from "./SignalInfo"

interface Props {
  token: string
  id?: string
  className?: string
  price: any
  indicatorsToShow: string[],
  indicators?: any
  signals?: any
}

export const TokenInfo = ({ token, id, className, price, indicatorsToShow, indicators, signals }: Props) =>
{
  const indicatorViews = useMemo(() => {
    return indicators && indicatorsToShow.map(name => 
      <IndicatorInfo key={'indicator-' + token + "-" + name} name={name} value={indicators[name]} />
    )
  }, [indicators, indicatorsToShow])

  const signalViews = useMemo(() => {
    return signals && Object.keys(signals[token]).map(name => 
        <SignalInfo key={'signal-' + token + "-" + name} name={name} action={signals[name]} />
    )
  }, [signals])

  return <article key={"token-"+token} className="section">
    <header>
        <AttachMoney className="icon"/>
        <h1 className="title">
            <span className="title__top">{token}</span>
            <span className="title__bottom">Binance</span>
        </h1>
    </header>
    <main className="section__items">
        <PriceInfo key={'price-' + token} token={token} price={price} />
        {indicatorViews}
        {signalViews}
    </main>
  </article>
}