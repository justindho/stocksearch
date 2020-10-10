import { Component, OnInit, Input } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-banner',
  templateUrl: './stock-banner.component.html',
  styleUrls: ['./stock-banner.component.css']
})
export class StockBannerComponent implements OnInit {
  // @Input() companyMeta: CompanyMeta;
  companyMeta: CompanyMeta;
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getCompanyMeta();
    this.getStockStatistics();
  }

  getCompanyMeta(): void {
    this.stockService.getCompanyMeta()
      .subscribe(meta => this.companyMeta = meta);
  }

  getStockStatistics(): void {
    this.stockService.getStockStatistics('AAPL')
      .subscribe(statistics => {
        this.stockStatistics = statistics;
        this.stockStatistics['change'] = (statistics.last - statistics.prevClose).toFixed(2);
        this.stockStatistics['changePercent'] = (this.stockStatistics['change'] / this.stockStatistics['prevClose'] * 100).toFixed(2);
        this.stockStatistics['timestamp'] = this.formatTimestamp(statistics.timestamp);
      });
  }

  formatTimestamp(timestamp: string): string {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

}
