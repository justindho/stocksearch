export interface WatchlistItem {
    ticker: string;
    name: string;
    last: number;
    prevClose: number;
    change: number;
    changePercent: number;
}