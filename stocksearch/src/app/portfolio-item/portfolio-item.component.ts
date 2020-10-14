import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from '../portfolio-item';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {
  @Input() portfolioItem: PortfolioItem;

  constructor() { }

  ngOnInit(): void {
  }

  updatePortfolioItemStats(params: object): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    let ticker = params['ticker'];
    let price = parseFloat(params['price']);
    let additionalShares = parseInt(params['additionalShares']);
    this.portfolioItem = portfolio[ticker];
    this.portfolioItem.quantity += additionalShares;
    this.portfolioItem.totalCost = parseFloat(portfolio[ticker]['totalCost']) + additionalShares * price;
    this.portfolioItem.avgCost = this.portfolioItem.totalCost / this.portfolioItem.quantity;
    this.portfolioItem.change = this.portfolioItem.avgCost - this.portfolioItem.currentPrice;
    this.portfolioItem.marketValue = this.portfolioItem.currentPrice * this.portfolioItem.quantity;
  }

}
