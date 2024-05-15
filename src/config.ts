import ConfigConnectionInputModel from "./commons/models/config/ConfigConnectionInputModel.dto"

export const INTERVALS : string[] = [
    '1s',
    '1m',
    '5m',
    '15m'
]
export const TOKENS : string[] = [
    'BTCFDUSD',
    'BTCUSDT',
    'BTCTUSD',
    'BTCUSDC',
    'ETHUSDT',
    'ETHUSDC',
    'XRPUSDT'
]
export const CONFIG_PRICES : {[token:string] : ConfigConnectionInputModel } = {
    'BTCFDUSD': { "host": "http://localhost", "port": 3002 },
    'BTCUSDT': { "host": "http://localhost", "port": 3002 },
    'BTCTUSD': { "host": "http://localhost", "port": 3002 },
    'BTCUSDC': { "host": "http://localhost", "port": 3002 },
    'ETHUSDT': { "host": "http://localhost", "port": 3002 },
    'ETHUSDC': { "host": "http://localhost", "port": 3002 },
    'XRPUSDT': { "host": "http://localhost", "port": 3002 }
}
export const INDICATORS : string[] = [
    "atr5", "atr8", "atr13", "atr30",
    "rsi9", "rsi11", "rsi14", "rsi20", "rsi30", 
    "williams14", "williams30", 
    "wlti",
    "ema12", "ema20", "ema26", "ema30", 
    "sar001_01", "sar002_02", "sar005_03",
    "macdLine", "macdSignal9", "macd9", 
    "bollinger20Mid", "bollinger20SD", "bollinger20High", "bollinger20Low",
    "kallman5", "kallman14", "kallman20", "kallman30",
    "lwti8", "lwti13", "lwti30",
    "donchianChannels14", "donchianChannels20", "donchianChannels96",
    "dump1", "dump3", "dump5", "dump10",
    "pump1", "pump3", "pump5", "pump10",
    "lwStrategyUp", "lwStrategyDown"
]

export const CONFIG_SIGNALS : {[signal:string] : ConfigConnectionInputModel } = {
    'aggregator': { "host": "http://localhost", "port": 3005 },
}
export const SIGNALS : string[] = [
    "bollingerHighSignal", 
    "bollingerLowSignal", "bollingerHighWithRSI30Overbought", "bollingerLowWithRSI30Oversold", 
    "rsi30Overbought", "rsi30Oversold", "rsi9Overbought", "rsi9Oversold",
    "dump1_00_01", "pump1_00_01", "dump3_00_02", "pump3_00_02", "dump5_00_05", "pump5_00_05", "dump10_00_10", "pump10_00_10", 
    "lwStrategyUpSignal", "lwStrategyDownSignal", 
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
    "dump3_00_02" : "Dump 3candles <0.02%",
    "pump3_00_02" : "Pump 3candles >0.02%",
    "dump5_00_05" : "Dump 5candles <0.05%",
    "pump5_00_05" : "Pump 5candles >0.05%",
    "dump10_00_10" : "Dump 5candles <0.1%",
    "pump10_00_10" : "Pump 5candles >0.1%",
    "lwStrategyUpSignal": "Larry Williams Buy Strategy Indicator",
    "lwStrategyDownSignal": "Larry Williams Sell Strategy Indicator"
}