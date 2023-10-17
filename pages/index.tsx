import React, { useEffect, useMemo, useState } from 'react'
import SocketIOClient from "socket.io-client"
import { TokenInfo } from '../components/TokenInfo'
import PriceKlineModel from '../src/commons/models/price/PriceKlineModel.dto'
import TokenIndicatorsModel from '../src/commons/models/indicators/TokenIndicatorsModel.dto'
import SignalModel from '../src/commons/models/signal/SignalModel.dto'
import { CONFIG_PRICES, CONFIG_SIGNALS, INDICATORS, INTERVALS, SIGNALS, TOKENS } from '../src/config'
import { ConfigConnectionInputModelUtils } from '../src/commons/models/config/ConfigConnectionInputModel.dto'

export default function Home() {
    const [prices, setPrices] = useState<{[token:string]:{[interval:string] : PriceKlineModel}}>({});
    const [tokensToShow, setTokensToShow] = useState(TOKENS);
    const [intervalsToShow, setIntervalsToShow] = useState(INTERVALS);
    const [indicators, setIndicators] = useState<{[token:string]:{[interval:string] : TokenIndicatorsModel}}>({});
    const [indicatorsToShow, setIndicatorsToShow] = useState(INDICATORS);
    const [signals, setSignals] = useState<{[token:string]:{[interval:string]:{[signal:string] : SignalModel}}}>({});
    const [signalsToShow, setSignalsToShow] = useState(SIGNALS);
    const [sockets, setSockets] = useState<{[id:string]:SocketIOClient.Socket}>({})
    const [socketsInitialised, setSocketsInitialised] = useState(false)
    const [menuShowing, setMenuShowing] = useState(false)

    useEffect(() => {
        for(const token of Object.keys(CONFIG_PRICES)){
            prices[token] = {}
            indicators[token] = {}
            signals[token] = {}
            for(const interval of INTERVALS){
                prices[token][interval] = new PriceKlineModel(token, interval)
                indicators[token][interval] = new TokenIndicatorsModel(token, interval, "0", 0, {})

                signals[token][interval] = {}
                for(const signal of SIGNALS){
                    signals[token][interval][signal] = new SignalModel(token, interval, 0, 0)
                }
            }
            const url = ConfigConnectionInputModelUtils.GetUrl(CONFIG_PRICES[token])
            if (!sockets[url]){
                sockets[url] = SocketIOClient(url)
                setSockets({...sockets})
            }
        }

        for(const signal of Object.keys(CONFIG_SIGNALS)){
            const url = ConfigConnectionInputModelUtils.GetUrl(CONFIG_SIGNALS[signal])
            if (!sockets[url]){
                sockets[url] = SocketIOClient(url)
                setSockets({...sockets})
            }
        }

        setPrices({...prices})
        setSignals({...signals})
        setIndicators({...indicators})
        // return () => {
        //     for (const s of Object.values(sockets)){
        //         (s as SocketIOClient.Socket).disconnect()
        //     }
        // }
    }, [])

    useEffect(() => {
        if (socketsInitialised) { return }

        for(const token of Object.keys(CONFIG_PRICES)){
            const url = ConfigConnectionInputModelUtils.GetUrl(CONFIG_PRICES[token])
            const socket = sockets[url]
            if (socket) {
                for(const interval of INTERVALS){
                    socket.on(token + '-' + interval, (kline: PriceKlineModel) => {
                        prices[token][interval] = kline
                        setPrices({...prices})
                    })
                    socket.on('indicators-' + token + '-' + interval, (indicatorsData: TokenIndicatorsModel) => {
                        indicators[token][interval] = indicatorsData
                        setIndicators({...indicators})
                    })
                }
            }
        }

        for(const signal of Object.keys(CONFIG_SIGNALS)){
            const url = ConfigConnectionInputModelUtils.GetUrl(CONFIG_SIGNALS[signal])
            const socket = sockets[url]
            if (socket) {
                for(const signalId of signalsToShow){
                    for(const token of Object.keys(CONFIG_PRICES)){
                        for(const interval of INTERVALS){
                            socket.on(signalId + '-' + token + '-' + interval, (actionData: SignalModel) => {
                                signals[token][interval][signalId] = actionData
                                setSignals({...signals})
                            })
                        }
                    }
                }
            }
        }
        setSocketsInitialised(true)
    }, [sockets])

    const tokenItems = tokensToShow.map(token => 
        <div key={'token-' + token} className='intervals_container'>
            {(intervalsToShow.map(interval =>
                prices[token] && prices[token][interval] && 
                indicators[token] && indicators[token][interval] && 
                signals[token] && signals[token][interval] && 
                <TokenInfo token={token} interval={interval} price={prices[token][interval]} indicators={indicators[token][interval]} indicatorsToShow={indicatorsToShow} signals={signals[token][interval]} signalsToShow={signalsToShow}  />
            ))}
        </div>
    )
    const handleTokenCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setTokensToShow([...tokensToShow, event.target.value])
        } else {
            const newItems = [...tokensToShow]
            newItems.splice(newItems.indexOf(event.target.value), 1)
            setTokensToShow(newItems)
        }
    }
    const handleIntervalCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setIntervalsToShow([...intervalsToShow, event.target.value])
        } else {
            const newItems = [...intervalsToShow]
            newItems.splice(newItems.indexOf(event.target.value), 1)
            setIntervalsToShow(newItems)
        }
    }
    const handleSignalCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setSignalsToShow([...signalsToShow, event.target.value])
        } else {
            const newItems = [...signalsToShow]
            newItems.splice(newItems.indexOf(event.target.value), 1)
            setSignalsToShow(newItems)
        }
    }
    const handleIndicatorCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setIndicatorsToShow([...indicatorsToShow, event.target.value])
        } else {
            const newItems = [...indicatorsToShow]
            newItems.splice(newItems.indexOf(event.target.value), 1)
            setIndicatorsToShow(newItems)
        }
    }
    
    return (
        <div>
            <h1> Monitor </h1>
            {tokenItems}
            <div className="menu">
                <button className="checklists-button" onClick={() => {setMenuShowing(!menuShowing)}}>{menuShowing ? "Hide Menu" : "Show Menu"}</button>
                {menuShowing && <div className="checklists">
                    <div className="checklist">
                        <div className="subtitle">Tokens</div>
                        {TOKENS.map((item, index) => (
                            <div className="checklist-item" key={index}>
                                <input value={item} type="checkbox" onChange={handleTokenCheck} checked={tokensToShow.includes(item)} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="checklist">
                        <div className="subtitle">Intervals</div>
                        {INTERVALS.map((item, index) => (
                            <div className="checklist-item" key={index}>
                                <input value={item} type="checkbox" onChange={handleIntervalCheck} checked={intervalsToShow.includes(item)} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="checklist">
                        <div className="subtitle">Signals</div>
                        {SIGNALS.map((item, index) => (
                            <div className="checklist-item" key={index}>
                                <input value={item} type="checkbox" onChange={handleSignalCheck} checked={signalsToShow.includes(item)} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="checklist">
                        <div className="subtitle">Indicators</div>
                        {INDICATORS.map((item, index) => (
                            <div className="checklist-item" key={index}>
                                <input value={item} type="checkbox" onChange={handleIndicatorCheck} checked={indicatorsToShow.includes(item)}/>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>}
            </div>
        </div>
    )
}