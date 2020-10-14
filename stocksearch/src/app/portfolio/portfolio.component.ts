import { Component, OnInit } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { PortfolioItem } from '../portfolio-item';
import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  companyMeta: CompanyMeta;
  portfolio: PortfolioItem[];
  sortedPortfolio: PortfolioItem[] = [];
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.updatePortfolioLatestPrices();
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
    for (let stock in this.portfolio) {
      this.sortedPortfolio.push(this.portfolio[stock]);
    }
    this.sortedPortfolio.sort((stock1, stock2) => {
      if (stock1.ticker.toUpperCase() < stock2.ticker.toUpperCase()) { return -1; }
      if (stock1.ticker.toUpperCase() > stock2.ticker.toUpperCase()) { return 1; }
    });
  }

  getCompanyMeta(ticker: string): void {
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => this.companyMeta = meta);
  }

  getStockStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => this.stockStatistics = stats[0]);
  }

  updateStockStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => {
        this.stockStatistics = stats[0];
        this.portfolio[ticker]['currentPrice'] = this.stockStatistics.last;
      });
  }

  updatePortfolioLatestPrices(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
    for (let ticker in this.portfolio) {
      this.updateStockStatistics(ticker);
    }
    localStorage.setItem('portfolio', JSON.stringify(this.portfolio));
  }

}
