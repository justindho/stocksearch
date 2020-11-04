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
  doneLoading: boolean = false;
  displayBanner: boolean = false;
  portfolio: PortfolioItem[];
  sortedPortfolio: PortfolioItem[] = [];
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  async ngOnInit(): Promise<void> {
    this.createPortfolio();
    if (!this.portfolioIsEmpty()) {
      await this.updatePortfolioLatestPrices();
    }
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.updateSortedPortfolio();

    this.doneLoading = true;
  }

  getCompanyMeta(ticker: string): void {
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => this.companyMeta = meta);
  }

  getStockStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => this.stockStatistics = stats[0]);
  }

  updateStockStatistics(tickerString: string): void {
    this.stockService.getStockStatistics(tickerString)
      .subscribe(stats => {
        for (const [_, tickerData] of Object.entries(stats)) {
          let ticker = tickerData['ticker'];
          this.portfolio[ticker]['currentPrice'] = tickerData['last'];
          this.portfolio[ticker]['change'] = this.portfolio[ticker]['currentPrice'] - this.portfolio[ticker]['avgCost'];
          this.portfolio[ticker]['marketValue'] = this.portfolio[ticker]['currentPrice'] * this.portfolio[ticker]['quantity'];
        }
      });
  }

  updatePortfolioLatestPrices(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let tickerString = '';
    for (let ticker in this.portfolio) {
      tickerString += ticker + ',';
    }
    if (tickerString.length > 0) tickerString.slice(0, -1);
    this.updateStockStatistics(tickerString);
    localStorage.setItem('portfolio', JSON.stringify(this.portfolio));
    this.updateSortedPortfolio();
    this.updatePortfolioStatusBanner();
  }

  updateSortedPortfolio(): void {
    this.sortedPortfolio = [];
    for (let stock in this.portfolio) {
      this.sortedPortfolio.push(this.portfolio[stock]);
    }
    this.sortedPortfolio.sort((stock1, stock2) => {
      if (stock1.ticker.toUpperCase() < stock2.ticker.toUpperCase()) { return -1; }
      if (stock1.ticker.toUpperCase() > stock2.ticker.toUpperCase()) { return 1; }
    });
  }

  updatePortfolioStatusBanner(): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    if (Object.keys(portfolio).length === 0) {
      this.displayBanner = true;
    } else {
      this.displayBanner = false;
    }
  }

  createPortfolio(): void {
    if (localStorage.getItem('portfolio') === null || localStorage.getItem('portfolio') === 'null') {
      localStorage.setItem('portfolio', JSON.stringify({}));
    }
  }

  portfolioIsEmpty(): boolean {
    let p = localStorage.getItem('portfolio');
    return p === '{}' || p === undefined || p === null;
  }

}
