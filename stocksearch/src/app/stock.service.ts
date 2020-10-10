import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanyMeta } from './company-meta';
import { StockStatistics } from './stock-statistics';

export const MOCK_COMPANY_META: CompanyMeta = {
  ticker: 'AMZN',
  name: 'Amazon.com Inc',
  description: 'Amazon is guided by four principles: customer obsession rather than competitor focus, passion for invention, commitment to operational excellence, and long-term thinking. Customer reviews, 1-Click shopping, personalized recommendations, Prime, Fulfillment by Amazon, AWS, Kindle Direct Publishing, Kindle, Fire tablets, Fire TV, Amazon Echo, and Alexa are some of the products and services pioneered by Amazon.',
  startDate: '1997-05-15',
  exchangeCode: 'NASDAQ',
}

export const MOCK_STOCK_STATISTICS: StockStatistics = {
  prevClose: 3190.55,
  mid: null,
  lastSaleTimestamp: '2020-10-09T20:00:00+00:00',
  open: 3210,
  askPrice: 100,
  low: 3197.83,
  ticker: 'AMZN',
  timestamp: '2020-10-09T20:00:00+00:00',
  lastSize: null,
  tngoLast: 3286.65,
  last: 3286.65,
  high: 3288.99,
  askSize: 100,
  quoteTimestamp: '2020-10-09T20:00:00+00:00',
  bidPrice: 100,
  bidSize: 100,
  volume: 4907871,
  change: 0,
  changePercent: 0,
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
