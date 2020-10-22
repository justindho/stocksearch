import { Component, Input, Output, EventEmitter } from '@angular/core';
import { reduceEachTrailingCommentRange } from 'typescript';
import { PortfolioItem } from '../portfolio-item';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent {
  @Input() portfolioItem;
  @Output() purchaseEvent = new EventEmitter<void>();
  @Output() sellEvent = new EventEmitter<void>();

  constructor() { }

  ngAfterViewChecked(): void {
    this.updatePortfolioItemColor();
  }

  updatePortfolioItemStats(ticker: string): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    if (ticker in portfolio) {
      this.portfolioItem = portfolio[ticker];
      this.portfolioItem.quantity = portfolio[ticker]['quantity'];
      this.portfolioItem.totalCost = portfolio[ticker]['totalCost']
      this.portfolioItem.avgCost = portfolio[ticker]['avgCost'];
      this.portfolioItem.change = portfolio[ticker]['change'];
      this.portfolioItem.marketValue = portfolio[ticker]['marketValue'];
      this.updatePortfolioItemColor();
    } else {
      // Remove ticker from view
      this.removeFromPortfolio(ticker);
    }
    this.updatePortfolio();
  }

  updatePortfolioItemColor(): void {
    let green = "#319008";
    let red = "red";
    let black = 'black';
    let arrowContainer = document.getElementById('arrowContainer-' + this.portfolioItem.ticker);
    let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>`;
    let upArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;

    // Set arrow container and set color
    if (parseFloat(this.portfolioItem.change) > 0) {
      arrowContainer.innerHTML = upArrow;
      this.setColor(green);
    } else if (parseFloat(this.portfolioItem.change) < 0) {
      arrowContainer.innerHTML = downArrow;
      this.setColor(red);
    } else {
      arrowContainer.innerHTML = '';
      this.setColor(black);
    }
  }

  setColor(color: string): void {
    let items = Array.from(document.getElementsByClassName('change-color-' + this.portfolioItem.ticker) as HTMLCollectionOf<HTMLElement>);
    for (let item in items) {
      items[item].style.color = color;
    }
  }

  removeFromPortfolio(ticker: string): void {
    this.hidePortfolioItem(ticker);
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    delete portfolio[ticker];
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  hidePortfolioItem(ticker: string): void {
    let element = document.getElementById('portfolioItem-' + ticker);
    if (element != null) {
      element.style.display = 'none';
      this.updatePortfolioStatusBanner();
    }
  }

  updatePortfolio(): void {
    this.purchaseEvent.emit();
  }

  updatePortfolioStatusBanner(): void {
    this.sellEvent.emit();
  }

}
