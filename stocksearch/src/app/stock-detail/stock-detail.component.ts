import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CompanyMeta } from '../company-meta';
import { HistoricalData } from '../historical-data';
import { StockStatistics } from '../stock-statistics';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {
  doneLoading: boolean = false;
  interval: any;
  ohlc: number[][];
  volume: number[][];

  companyMeta: CompanyMeta;
  stockStatistics: StockStatistics;
  tickerIsValid: boolean;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let ticker = this.activatedRoute.snapshot.params.ticker;
    this.getCompanyMeta(ticker);
  }

  getCompanyMeta(ticker: string): any {
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => {
        this.companyMeta = meta;
        if ('error' in this.companyMeta) {
          this.tickerIsValid = false;
          let errorBanner = document.getElementById('error-banner');
          errorBanner.innerHTML = 'No results found. Please enter valid Ticker';
          this.doneLoading = true;
          errorBanner.style.display = 'block';
        } else {
          this.tickerIsValid = true;
          this.getSummaryStatistics(ticker);
          this.getHistoricalData(ticker);

          // Refresh stock stats and daily chart data every 15 seconds
          this.interval = setInterval(() => {
            if (this.marketIsOpen()) {
              this.getSummaryStatistics(ticker);
            }
          }, 15000);
        }
      });
  }

  getHistoricalData(ticker: string): void {
    this.stockService.getHistoricalData(ticker)
      .subscribe(data => {
        this.ohlc = this.formatOHLCData(data);
        this.volume = this.formatVolumeData(data);
      });
  }

  getSummaryStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => this.stockStatistics = stats[0]);
  }

  formatOHLCData(data: HistoricalData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.open, x.high, x.low, x.close];
    });
  }

  formatVolumeData(data: HistoricalData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.volume];
    })
  }

  marketIsOpen(): boolean {
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    return (Date.now() - +(lastTimestamp)) / 1000 < 60; // convert milliseconds to seconds
  }

  displayPage(): void {
    this.doneLoading = true;
    document.getElementById('display-after-load').style.display= 'block';
  }

}
