import ConfigConnectionInputModel from "./commons/models/config/ConfigConnectionInputModel.dto"

export const INTERVALS : string[] = [
    '1s',
    '1m',
    '5m',
    '15m',
    '1h',
    '1d'
]
export const TOKENS : string[] = [
    'BTCFDUSD',
    'XRPFDUSD',
    'ETHFDUSD',
    'DOTFDUSD',
    'DOGEFDUSD',
    'SOLFDUSD',
    'LTCFDUSD'
]
export const CONFIG_PRICES : {[token:string] : ConfigConnectionInputModel } = {
    'BTCFDUSD': { "host": "http://localhost", "port": 3002 },
    'XRPFDUSD': { "host": "http://localhost", "port": 3002 },
    'ETHFDUSD': { "host": "http://localhost", "port": 3002 },
    'DOTFDUSD': { "host": "http://localhost", "port": 3002 },
    'DOGEFDUSD': { "host": "http://localhost", "port": 3002 },
    'SOLFDUSD': { "host": "http://localhost", "port": 3002 },
    'LTCFDUSD': { "host": "http://localhost", "port": 3002 },
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
    'williams30',
    "dump1", 
    "dump5",
    "pump1", 
    "pump10"
]

export const CONFIG_SIGNALS : {[signal:string] : ConfigConnectionInputModel } = {
    'aggregator': { "host": "http://localhost", "port": 3005 },
}
export const SIGNALS : string[] = [
    "bollingerHighSignal", 
    "bollingerLowSignal", "bollingerHighWithRSI30Overbought", "bollingerLowWithRSI30Oversold", 
    "rsi30Overbought", "rsi30Oversold", "rsi9Overbought", "rsi9Oversold",
    "dump1_00_01", "pump1_00_01", "dump3_00_05", "pump3_00_05", "dump5_00_10", "pump5_00_10"
]
export const SIGNAL_NAMES : { [signal:string]: string } = {
    "bollingerHighWithRSI30Overbought" : "Core Sell Signal",
    "bollingerLowWithRSI30Oversold" : "Core Buy Signal",
    "bollingerHighSignal" : "Bollinger Overbought",
    "bollingerLowSignal" : "Bollinger Oversold",
    "rsi30Overbought" : "RSI 30 Overbought",
    "rsi9Overbought" : "RSI 9 Overbought",
    "rsi30Oversold" : "RSI 30 Oversold",
    "rsi9Oversold" : "RSI 9 Oversold",
    "dump1_00_01" : "Dump 1candle <0.01%",
    "pump1_00_01" : "Pump 1candle >0.01%",
    "dump3_00_05" : "Dump 3candles <0.05%",
    "pump3_00_05" : "Pump 3candles >0.05%",
    "dump5_00_10" : "Dump 5candles <0.1%",
    "pump5_00_10" : "Pump 5candles >0.1%"
}