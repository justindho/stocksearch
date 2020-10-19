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
  total: string = "0.00";

  constructor(private modalService: NgbModal) { }

  buy(ticker: string, numShares: string): void {
    let quantity = parseInt(numShares);
    console.log(`typeof(numShares): ${typeof(quantity)}`);
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
    portfolio[ticker].totalCost = (parseFloat(portfolio[ticker].totalCost) + numShares * this.stockStatistics.last).toFixed(2);
    portfolio[ticker].avgCost = (portfolio[ticker].totalCost / portfolio[ticker].quantity).toFixed(2);
    portfolio[ticker].change = (this.stockStatistics.last - portfolio[ticker].avgCost).toFixed(2);
    portfolio[ticker].marketValue = (this.stockStatistics.last * portfolio[ticker].quantity).toFixed(2);
    console.log(JSON.stringify(portfolio));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  addStockToPortfolio(ticker: string, numShares: number, portfolio): void {
    // The stock is not already in our portfolio
    portfolio[ticker] = {
      'ticker': ticker,
      'name': this.companyMeta.name,
      'quantity': numShares,
      'avgCost': (this.stockStatistics.last).toFixed(2),
      'totalCost': (numShares * this.stockStatistics.last).toFixed(2),
      'change': "0.00", // avgCost - current price
      'currentPrice': this.stockStatistics.last,
      'marketValue': (this.stockStatistics.last * numShares).toFixed(2),
    };
    console.log(JSON.stringify(portfolio));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  createPortfolio(): void {
    if (localStorage.getItem('portfolio') === null) {
      localStorage.setItem('portfolio', JSON.stringify({}));
    }
  }

  displayBuyBanner(value: string): void {
    this.newBuyEvent.emit(value);
  }


  displayTotal(price: number, quantity: number): string {
    return (price * quantity).toFixed(2);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
