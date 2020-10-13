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
  total: string = "0.00";

  constructor(private modalService: NgbModal) { }

  buy(): void {
    let numShares = parseInt((<HTMLInputElement>document.getElementById('quantity')).value);
    this.createPortfolio();
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));

    if (this.companyMeta.ticker in portfolio) {
      this.addSharesToPortfolio(numShares, portfolio);
    } else {
      this.addStockToPortfolio(numShares, portfolio);
    }
  }

  addSharesToPortfolio(numShares: number, portfolio): void {
    portfolio[this.companyMeta.ticker].quantity += numShares;
    portfolio[this.companyMeta.ticker].totalCost = (parseFloat(portfolio[this.companyMeta.ticker].totalCost) + numShares * this.stockStatistics.last).toFixed(2);
    portfolio[this.companyMeta.ticker].avgCost = (portfolio[this.companyMeta.ticker].totalCost / portfolio[this.companyMeta.ticker].quantity).toFixed(2);
    portfolio[this.companyMeta.ticker].change = (portfolio[this.companyMeta.ticker].avgCost - this.stockStatistics.last).toFixed(2);
    portfolio[this.companyMeta.ticker].marketValue = (this.stockStatistics.last * portfolio[this.companyMeta.ticker].quantity).toFixed(2);
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  addStockToPortfolio(numShares: number, portfolio): void {
    // The stock is not already in our portfolio
    portfolio[this.companyMeta.ticker] = {
      'ticker': this.companyMeta.ticker,
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
