import { Component, OnInit } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  companyMeta: CompanyMeta;
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    let ticker = 'AMZN';
    this.getCompanyMeta(ticker);
    this.getSummaryStatistics(ticker);
  }

  getCompanyMeta(ticker: string): void {
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => this.companyMeta = meta);
  }

  getSummaryStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => this.stockStatistics = stats[0]);
  }

}
