
export default class PriceKlineModel
{
    tokenPair: string
    interval: string

    timestamp_open: string = "0"
    timestamp_close: string = "0"
    price_open: string = "0"
    price_close: string = "0"
    price_low: string = "0"
    price_high: string = "0"
    volume: string = "0"
    trades_number: string = "0"
    asset_volume_quote: string = "0"
    asset_volume_taker_base: string = "0"
    asset_volume_taker_quote: string = "0"

    constructor(tokenPair: string, interval: string)
    {
        this.tokenPair = tokenPair
        this.interval = interval
    }
}