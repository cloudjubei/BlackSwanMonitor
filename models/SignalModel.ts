
export default class SignalModel
{
    tokenPair: string
    interval: string
    timestamp: number
    action: number
    certainty: number = 1.0 // percentage

    constructor(tokenPair: string, interval: string, timestamp: number, action: number, certainty: number = 1.0)
    {
        this.tokenPair = tokenPair
        this.interval = interval
        this.timestamp = timestamp
        this.action = action
        this.certainty = certainty
    }
}