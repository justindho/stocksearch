import { Component, Input } from '@angular/core';
import { PortfolioItem } from '../portfolio-item';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent {
  @Input() portfolioItem: PortfolioItem;

  constructor() { }

  updatePortfolioItemStats(ticker: string): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.portfolioItem = portfolio[ticker];
    this.portfolioItem.quantity = portfolio[ticker]['quantity'];
    this.portfolioItem.totalCost = portfolio[ticker]['totalCost']
    this.portfolioItem.avgCost = portfolio[ticker]['avgCost'];
    this.portfolioItem.change = portfolio[ticker]['change'];
    this.portfolioItem.marketValue = portfolio[ticker]['marketValue'];
  }

}
