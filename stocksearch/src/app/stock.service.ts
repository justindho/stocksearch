import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanyMeta } from './company-meta';
import { News } from './news';
import { StockStatistics } from './stock-statistics';


@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient,
  ) { }

  /** GET company meta data from the server */
  getCompanyMeta(symbol: string): Observable<CompanyMeta> {
    return this.http.get<CompanyMeta>(`/api/companydescription/${symbol}`);
  }

  /** GET company news from the server */
  getNews(symbol: string): Observable<News[]> {
    return this.http.get<News[]>(`/api/news/${symbol}`);
  }

  /** GET stock statistics from the server */
  getStockStatistics(symbol: string): Observable<StockStatistics> {
    return this.http.get<StockStatistics>(`/api/latestprice/${symbol}`);
  }

}
