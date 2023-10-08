import React, { useMemo } from "react"
import { AttachMoney, CompareArrows } from '@mui/icons-material'
import { PriceInfo } from "./PriceInfo"
import { IndicatorInfo } from "./IndicatorInfo"
import { SignalInfo } from "./SignalInfo"
import PriceKlineModel from "../models/PriceKlineModel"

interface Props {
  token: string
  interval: string
  id?: string
  className?: string
  price: PriceKlineModel
  indicatorsToShow: string[]
  indicators?: any
  signalsToShow: string[]
  signals?: any
}

export const TokenInfo = ({ token, interval, id, className, price, indicatorsToShow, indicators, signalsToShow, signals }: Props) =>
{
  const indicatorViews = useMemo(() => {
    return indicators && indicators[token] && indicators[token][interval] && indicatorsToShow.map(name => 
      <IndicatorInfo key={'indicator-' + token + "-" + interval + "-" + name} name={name} value={indicators[token][interval][name]} />
    )
  }, [token, interval, indicators, indicatorsToShow])

  const signalViews = useMemo(() => {
    return interval == '1s' && signals && signals[token] && signalsToShow.map(name => 
        <SignalInfo key={'signal-' + token + "-" + name} name={name} action={signals[token][name]} />
    )
  }, [token, interval, signals, signalsToShow])

  return <article key={"token-"+token+"-interval"} className="section">
    <header>
      <AttachMoney className="icon"/>
      <h1 className="title">
        <span className="title__top">{token}</span>
        <span className="title__bottom">{interval == '1s' ? 'LIVE' : interval}</span>
      </h1>
    </header>
    <main className="section__items">
      <PriceInfo key={'price-' + token} token={token} price={price.price_close} />
      <span>Indicators</span>
      {indicatorViews}
      <span>Signals</span>
      {signalViews}
    </main>
  </article>
}