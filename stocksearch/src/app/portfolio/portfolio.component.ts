import { Component, OnInit } from '@angular/core';

import { PortfolioItem } from '../portfolio-item';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolio: PortfolioItem[];
  sortedPortfolio: PortfolioItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.portfolio = JSON.parse(localStorage.getItem('portfolio'));
    for (let stock in this.portfolio) {
      this.sortedPortfolio.push(this.portfolio[stock]);
    }
    this.sortedPortfolio.sort((stock1, stock2) => {
      if (stock1.ticker.toUpperCase() < stock2.ticker.toUpperCase()) { return -1; }
      if (stock1.ticker.toUpperCase() > stock2.ticker.toUpperCase()) { return 1; }
    });
  }

  buy(ticker:string): void {

  }

  sell(ticker: string): void {

  }

}
