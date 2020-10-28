import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css']
})
export class BuyModalComponent {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics: StockStatistics;
  @Output() newBuyEvent = new EventEmitter<string>();
  quantity: number;
  total: number = 0;

  constructor(private modalService: NgbModal) { }

  buy(ticker: string, numShares: string): void {
    let quantity = parseInt(numShares);
    this.createPortfolio();
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));

    if (ticker in portfolio) {
      this.addSharesToPortfolio(ticker, quantity, portfolio);
    } else {
      this.addStockToPortfolio(ticker, quantity, portfolio);
    }
  }

  addSharesToPortfolio(ticker: string, numShares: number, portfolio): void {
    portfolio[ticker].quantity += numShares;
    portfolio[ticker].totalCost = portfolio[ticker].totalCost + numShares * this.stockStatistics.last;
    portfolio[ticker].avgCost = portfolio[ticker].totalCost / portfolio[ticker].quantity;
    portfolio[ticker].change = this.stockStatistics.last - portfolio[ticker].avgCost;
    portfolio[ticker].marketValue = this.stockStatistics.last * portfolio[ticker].quantity;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  addStockToPortfolio(ticker: string, numShares: number, portfolio): void {
    // The stock is not already in our portfolio
    portfolio[ticker] = {
      'ticker': ticker,
      'name': this.companyMeta.name,
      'quantity': numShares,
      'avgCost': this.stockStatistics.last,
      'totalCost': numShares * this.stockStatistics.last,
      'change': 0, // avgCost - current price
      'currentPrice': this.stockStatistics.last,
      'marketValue': this.stockStatistics.last * numShares,
    };
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  createPortfolio(): void {
    if (localStorage.getItem('portfolio') === null || localStorage.getItem('portfolio') === 'null') {
      localStorage.setItem('portfolio', JSON.stringify({}));
    }
  }

  displayBuyBanner(value: string): void {
    this.newBuyEvent.emit(value);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updateTotal(quantity: number): void {
    this.total = this.stockStatistics.last * quantity;
  }

}
