import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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
  name: "Amazon.com",
  symbol: "AMZN",
  high: 100,
  mid: 100,
  low: 100,
  askPrice: 100,
  open: 100,
  askSize: 100,
  prevClose: 100,
  bidPrice: 100,
  volume: 100,
  bidSize: 100,
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor() { }

  /** GET stock statistics from the server */
  getStockStatistics(): Observable<StockStatistics> {
    return of(MOCK_STOCK_STATISTICS);
  }

  /** GET company meta data from the server */
  getCompanyMeta(): Observable<CompanyMeta> {
    return of(MOCK_COMPANY_META);
  }
}
