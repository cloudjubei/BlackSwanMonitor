import React, { useEffect, useMemo, useState } from 'react';
import { ArrowBackIos, AttachMoney } from '@mui/icons-material'
import SocketIOClient from "socket.io-client";
import { PriceInfo } from '../components/PriceInfo';
import { SignalInfo } from '../components/SignalInfo';

const pricesConfig = {
    'BTCUSDT': 3002,
    'BTCFDUSD': 3002
}
const signalsConfig = {
    'manual': 3003,
    'aggregator': 3005
}
export default function Home() {
    const [prices, setPrices] = useState({});
    const [signals, setSignals] = useState({});
    const [sockets, setSockets] = useState({})
    const [socketsInitialised, setSocketsInitialised] = useState(false)

    useEffect(() => {
        for(const token of Object.keys(pricesConfig)){
            const port = pricesConfig[token]
            if (!sockets[port]){
                sockets[port] = SocketIOClient('http://127.0.0.1:' + port)
                setSockets({...sockets})
            }
        }
        for(const signal of Object.keys(signalsConfig)){
            const port = signalsConfig[signal]
            if (!sockets[port]){
                sockets[port] = SocketIOClient('http://127.0.0.1:' + port)
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
                    setPrices({...prices})
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
                            if (!signals[signal]){
                                signals[signal] = {}
                            }
                            signals[signal][token] = actionData
                            setSignals({...signals})
                        }else{
                            const { action, identifier } = actionData
                            if (!signals[identifier]){
                                signals[identifier] = {}
                            }
                            signals[identifier][token] = action
                            setSignals({...signals})
                        }
                    })
                }
            }
        }
        setSocketsInitialised(true)
    }, [sockets])

    const priceItems = useMemo(() => {
        return Object.keys(prices).map(token => 
            <PriceInfo key={'price-' + token} token={token} price={prices[token]} />
        )
    }, [prices])

    const signalItems = useMemo(() => {
        return Object.keys(pricesConfig).map(token => 
            <article key={"signals-" + token}  className="section">
                <header>
                    <ArrowBackIos className="icon"/>
                    <h1 className="title">
                        <span className="title__top">{token}</span>
                        <span className="title__bottom">Signals</span>
                    </h1>
                </header>
                <main className="section__items">
                    {Object.keys(signals).map(name => 
                        <SignalInfo key={'signal-' + name + "-" + token} name={name} action={signals[name][token]} />
                    )}
                </main>
            </article>
        )
    }, [signals])

    return (
        <div>
            <h1> Monitor </h1>
            <article key="prices" className="section">
                <header>
                    <AttachMoney className="icon"/>
                    <h1 className="title">
                        <span className="title__top">Prices</span>
                        <span className="title__bottom">Binance</span>
                    </h1>
                </header>
                <main className="section__items">
                    {priceItems}
                </main>
            </article>
            {signalItems}
        </div>
    );
}