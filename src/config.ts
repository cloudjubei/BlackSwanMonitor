import ConfigConnectionInputModel from "./commons/models/config/ConfigConnectionInputModel.dto"

export const INTERVALS : string[] = [
    '1s',
    '1m',
    '5m',
    '15m',
    '1d'
]
export const TOKENS : string[] = [
    'BTCUSDT',
    'BTCFDUSD'
]
export const CONFIG_PRICES : {[token:string] : ConfigConnectionInputModel } = {
    'BTCUSDT': { "host": "http://localhost", "port": 3002 },
    'BTCFDUSD': { "host": "http://localhost", "port": 3002 }
}
export const INDICATORS : string[] = [
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

export const CONFIG_SIGNALS : {[signal:string] : ConfigConnectionInputModel } = {
    'aggregator': { "host": "http://localhost", "port": 3005 },
}
export const SIGNALS : string[] = [
    "bollingerHighSignal", 
    "bollingerLowSignal", "bollingerHighWithRSI30Overbought", "bollingerLowWithRSI30Oversold", 
    "rsi30Overbought", "rsi30Oversold", "rsi9Overbought", "rsi9Oversold",
]