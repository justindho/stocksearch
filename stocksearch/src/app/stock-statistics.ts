export interface StockStatistics {
    name: string;
    symbol: string;
    high: number;
    low: number;
    open: number;
    prevClose: number;
    volume: number;
    mid: number;
    askPrice: number;
    askSize: number;
    bidPrice: number;
    bidSize: number;
}