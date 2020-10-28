import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanyMeta } from './company-meta';
import { DailyChartData } from './daily-chart-data';
import { HistoricalData } from './historical-data';
import { NewsItem } from './news-item';
import { StockStatistics } from './stock-statistics';
import { Autocompletion } from './autocompletion';


@Injectable({
  providedIn: 'root'
})
export class StockService {
  backendHost: string = `https://stocksearch-nodejs-backend.wl.r.appspot.com`;

  constructor(
    private http: HttpClient,
  ) { }

  /** GET company meta data from the server */
  getCompanyMeta(ticker: string): Observable<CompanyMeta> {
    return this.http.get<CompanyMeta>(`${this.backendHost}/api/companydescription/${ticker}`);
  }

  /** GET daily chart data */
  getDailyChartData(ticker: string): Observable<DailyChartData[]> {
    return this.http.get<DailyChartData[]>(`${this.backendHost}/api/dailychartdata/${ticker}`);
  }

  /** GET historical chart data */
  getHistoricalData(ticker: string): Observable<HistoricalData[]> {
    return this.http.get<HistoricalData[]>(`${this.backendHost}/api/historicaldata/${ticker}`);
  }

  /** GET company news from the server */
  getNews(ticker: string): Observable<NewsItem[]> {
    return this.http.get<NewsItem[]>(`${this.backendHost}/api/news/${ticker}`);
  }

  /** GET stock statistics from the server */
  getStockStatistics(ticker: string): Observable<StockStatistics> {
    return this.http.get<StockStatistics>(`${this.backendHost}/api/latestprice/${ticker}`);
  }


  /** GET ticker autocompletions */
  searchTickerNameAutocompletions(str: string): Observable<Autocompletion[]> {
    if (!str.trim()) {
      return of([]);
    }
    return this.http.get<Autocompletion[]>(`${this.backendHost}/api/autocomplete/${str}`);
  }

}
