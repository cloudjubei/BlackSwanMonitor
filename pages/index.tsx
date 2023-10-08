import React, { useEffect, useMemo, useState } from 'react';
import { ArrowBackIos, AttachMoney } from '@mui/icons-material'
import SocketIOClient from "socket.io-client";
import { PriceInfo } from '../components/PriceInfo';
import { SignalInfo } from '../components/SignalInfo';
import { IndicatorInfo } from '../components/IndicatorInfo';
import { TokenInfo } from '../components/TokenInfo';

const pricesConfig = {
    'BTCUSDT': 3002,
    'BTCFDUSD': 3002
}
const indicatorsConfig = {
    'BTCUSDT': 3002,
    'BTCFDUSD': 3002
}
const signalsConfig = {
    'manual': 3003,
    'aggregator': 3005
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

export default function Home() {
    const [prices, setPrices] = useState({});
    const [indicators, setIndicators] = useState({});
    const [signals, setSignals] = useState({});
    const [sockets, setSockets] = useState({})
    const [socketsInitialised, setSocketsInitialised] = useState(false)

    useEffect(() => {
        const host = process.env.NEXT_PUBLIC_HOST  ?? "http://localhost" 
        for(const token of Object.keys(pricesConfig)){
            prices[token] = 0
            indicators[token] = {}
            signals[token] = {}
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
                socket.on(token, (price) => {
                    prices[token] = price
                    setPrices({...prices})
                })
            }
        }

        for(const token of Object.keys(indicatorsConfig)){
            const port = indicatorsConfig[token]
            const socket = sockets[port]
            if (socket) {
                socket.on('indicators-' + token, (indicator) => {
                    indicators[token] = indicator
                    setIndicators({...indicators})
                })
            }
        }

        for(const signal of Object.keys(signalsConfig)){
            const port = signalsConfig[signal]
            const socket = sockets[port]
            if (socket) {
                for(const token of Object.keys(pricesConfig)){
                    socket.on(token, (actionData) => {
                        if (typeof actionData === 'number' || actionData instanceof Number){
                            signals[token][signal] = actionData
                            setSignals({...signals})
                        }else{
                            const { action, identifier } = actionData
                            signals[token][identifier] = action
                            setSignals({...signals})
                        }
                    })
                }
            }
        }
        setSocketsInitialised(true)
    }, [sockets])

    const tokenItems = useMemo(() => {
        return Object.keys(pricesConfig).map(token => 
            <TokenInfo token={token} price={prices[token]} indicatorsToShow={indicatorsToShow} indicators={indicators[token]} signals={signals[token]}  />
        )
    }, [prices, indicators, signals])
    
    return (
        <div>
            <h1> Monitor </h1>
            {tokenItems}
        </div>
    );
}