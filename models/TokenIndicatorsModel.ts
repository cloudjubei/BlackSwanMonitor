
export default class TokenIndicatorsModel
{
    tokenPair: string
    interval: string
    price: string
    timestamp: number
    indicators: { [id:string] : string }

    constructor(tokenPair: string, interval: string, price: string, timestamp: number, indicators: {[id:string] : string}){
        this.tokenPair = tokenPair
        this.interval = interval
        this.price = price
        this.timestamp = timestamp
        this.indicators = indicators
    }
}