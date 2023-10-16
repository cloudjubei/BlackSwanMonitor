import React, { useEffect, useMemo, useState } from 'react'
import SocketIOClient from "socket.io-client"
import { TokenInfo } from '../components/TokenInfo'
import TokenIndicatorsModel from '../models/TokenIndicatorsModel'
import PriceKlineModel from '../models/PriceKlineModel'
import SignalModel from '../models/SignalModel'

const intervals = [
    '1s',
    '1m',
    '5m',
    '15m',
    '1d'
]
const pricesConfig = {
    // 'BTCUSDT': 3002,
    'BTCFDUSD': 3002
}
const indicatorsConfig = {
    // 'BTCUSDT': 3002,
    'BTCFDUSD': 3002
}
const indicatorsToShow = [
    'bollinger20High',
    'bollinger20Mid',
    'bollinger20Low',
    'rsi9',
    'rsi14',
    'rsi30',
    'ema20',
    'ema50',
    'ema200',
    'macdSignal9',
    'macd9',
    'williams14',
    'williams30'
]

const signalsConfig = {
    'aggregator': 3005
}
const signalsToShow = [
    "bollingerHighSignal", 
    "bollingerLowSignal", "bollingerHighWithRSI30Overbought", "bollingerLowWithRSI30Oversold", 
    "rsi30Overbought", "rsi30Oversold", "rsi9Overbought", "rsi9Oversold",
]

export default function Home() {
    const [prices, setPrices] = useState({});
    const [indicators, setIndicators] = useState({});
    const [signals, setSignals] = useState({});
    const [sockets, setSockets] = useState({})
    const [socketsInitialised, setSocketsInitialised] = useState(false)

    useEffect(() => {
        const host = process.env.NEXT_PUBLIC_HOST  ?? "http://localhost" 
        for(const token of Object.keys(pricesConfig)){
            prices[token] = {}
            indicators[token] = {}
            signals[token] = {}
            for(const interval of intervals){
                prices[token][interval] = new PriceKlineModel(token, interval)
                indicators[token][interval] = new TokenIndicatorsModel(token, interval, "0", 0, {})

                signals[token][interval] = {}
                for(const signal of signalsToShow){
                    signals[token][interval][signal] = new SignalModel(token, interval, 0, 0)
                }
            }
            const port = pricesConfig[token]
            if (!sockets[port]){
                sockets[port] = SocketIOClient(host + ':' + port)
                setSockets({...sockets})
            }
        }
        setPrices({...prices})
        setSignals({...signals})
        setIndicators({...indicators})

        for(const token of Object.keys(indicatorsConfig)){
            const port = indicatorsConfig[token]
            if (!sockets[port]){
                sockets[port] = SocketIOClient(host + ':' + port)
                setSockets({...sockets})
            }
        }

        for(const signal of Object.keys(signalsConfig)){
            const port = signalsConfig[signal]
            if (!sockets[port]){
                sockets[port] = SocketIOClient(host + ':' + port)
                setSockets({...sockets})
            }
        }
        // return () => {
        //     for (const s of Object.values(sockets)){
        //         (s as SocketIOClient.Socket).disconnect()
        //     }
        // }
    }, [])

    useEffect(() => {
        if (socketsInitialised) { return }

        for(const token of Object.keys(pricesConfig)){
            const port = pricesConfig[token]
            const socket = sockets[port]
            if (socket) {
                for(const interval of intervals){
                    socket.on(token + '-' + interval, (kline) => {
                        prices[token][interval] = kline
                        setPrices({...prices})
                    })
                }
            }
        }

        for(const token of Object.keys(indicatorsConfig)){
            const port = indicatorsConfig[token]
            const socket = sockets[port]
            if (socket) {
                for(const interval of intervals){
                    socket.on('indicators-' + token + '-' + interval, (indicator) => {
                        indicators[token][interval] = indicator
                        setIndicators({...indicators})
                    })
                }
            }
        }

        for(const signal of Object.keys(signalsConfig)){
            const port = signalsConfig[signal]
            const socket = sockets[port]
            if (socket) {
                for(const signalId of signalsToShow){
                    for(const token of Object.keys(pricesConfig)){
                        for(const interval of intervals){
                            socket.on(signalId + '-' + token + '-' + interval, (actionData) => {
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

    const tokenItems = Object.keys(pricesConfig).map(token => 
        <div key={'token-' + token} className='intervals_container'>
            {(intervals.map(interval =>
                prices[token] && prices[token][interval] && 
                indicators[token] && indicators[token][interval] && 
                signals[token] && signals[token][interval] && 
                <TokenInfo token={token} interval={interval} price={prices[token][interval]} indicators={indicators[token][interval]} indicatorsToShow={indicatorsToShow} signals={signals[token][interval]} signalsToShow={signalsToShow}  />
            ))}
        </div>
    )
    
    return (
        <div>
            <h1> Monitor </h1>
            {tokenItems}
        </div>
    );
}