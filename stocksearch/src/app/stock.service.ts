import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanyMeta } from './company-meta';
import { StockStatistics } from './stock-statistics';

export const MOCK_COMPANY_META: CompanyMeta = {
  ticker: 'AMZN',
  name: 'Amazon.com',
  description: 'Amazon is an e-commerce company and has AWS',
  startDate: 'Some time in 1995',
  exchangeCode: 'NASDAQ',
}

export const MOCK_STOCK_STATISTICS: StockStatistics = {
  prevClose: 100,
  mid: 100,
  lastSaleTimestamp: 'sometime',
  open: 100,
  askPrice: 100,
  low: 100,
  ticker: 'AAPL',
  timestamp: 'sometime',
  lastSize: 100,
  tngoLast: 100,
  last: 100,
  high: 100,
  askSize: 100,
  quoteTimestamp: 'sometime',
  bidPrice: 100,
  bidSize: 100,
  volume: 100,
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient,
  ) { }

  /** GET stock statistics from the server */
  getStockStatistics(symbol: string): Observable<StockStatistics> {
    return of(MOCK_STOCK_STATISTICS);
    // return this.http.get<StockStatistics>(`/api/latestprice/${symbol}`);
  }

  /** GET company meta data from the server */
  getCompanyMeta(): Observable<CompanyMeta> {
    return of(MOCK_COMPANY_META);
  }
}
