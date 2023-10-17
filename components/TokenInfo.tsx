import React, { useMemo } from "react"
import { AttachMoney } from '@mui/icons-material'
import { PriceInfo } from "./PriceInfo"
import { IndicatorInfo } from "./IndicatorInfo"
import { SignalInfo } from "./SignalInfo"
import PriceKlineModel from "../src/commons/models/price/PriceKlineModel.dto"
import TokenIndicatorsModel from "../src/commons/models/indicators/TokenIndicatorsModel.dto"
import SignalModel from "../src/commons/models/signal/SignalModel.dto"
import { SIGNAL_NAMES } from "../src/config"

interface Props {
  token: string
  interval: string
  price: PriceKlineModel
  indicatorsToShow: string[]
  indicators: TokenIndicatorsModel
  signalsToShow: string[]
  signals: { [index: string]: SignalModel}
}

export const TokenInfo = ({ token, interval, price, indicatorsToShow, indicators, signalsToShow, signals }: Props) =>
{
  const keyId = useMemo(() => token + "-" + interval, [token, interval])
  
  const indicatorViews = indicatorsToShow.map(name => 
    <IndicatorInfo key={'indicator-' + keyId + "-" + name} name={name} value={parseFloat(indicators.indicators[name])} />
  )

  const signalViews = signalsToShow.map(name => 
    signals[name] && <SignalInfo key={'signal-' + keyId + "-" + name} name={SIGNAL_NAMES[name]} signal={signals[name]} />
  )

  return <article key={"info-" + keyId} className="section">
    <header>
      <AttachMoney className="icon"/>
      <h1 className="title">
        <span className="title__top">{token}</span>
        <span className="title__bottom">{interval == '1s' ? 'LIVE' : interval}</span>
      </h1>
    </header>
    <main className="section__items">
      <PriceInfo key={'price-' + keyId} token={token} price={price.price} />
      <span>Signals</span>
      {signalViews}
      <span>Indicators</span>
      {indicatorViews}
    </main>
  </article>
}