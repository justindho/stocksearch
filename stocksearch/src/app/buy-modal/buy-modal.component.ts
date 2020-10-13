import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  total: string = "0.00";

  constructor(private modalService: NgbModal) { }

  buy(): void {
    let numShares = parseInt((<HTMLInputElement>document.getElementById('quantity')).value);
    console.log(`numShares = ${numShares}`);
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
    portfolio[this.companyMeta.ticker].totalCost += numShares * this.stockStatistics.last;
    portfolio[this.companyMeta.ticker].avgCost = portfolio[this.companyMeta.ticker].totalCost / portfolio[this.companyMeta.ticker].quantity;
    portfolio[this.companyMeta.ticker].change = portfolio[this.companyMeta.ticker].avgCost - this.stockStatistics.last;
    portfolio[this.companyMeta.ticker].marketValue = this.stockStatistics.last * portfolio[this.companyMeta.ticker].quantity;
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  addStockToPortfolio(numShares: number, portfolio): void {
    // The stock is not already in our portfolio
    portfolio[this.companyMeta.ticker] = {
      'ticker': this.companyMeta.ticker,
      'name': this.companyMeta.name,
      'quantity': numShares,
      'avgCost': this.stockStatistics.last,
      'totalCost': numShares * this.stockStatistics.last,
      'change': 0, // avgCost - current price
      'currentPrice': this.stockStatistics.last,
      'marketValue': this.stockStatistics.last * numShares,
    };
    console.log(JSON.stringify(portfolio));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  createPortfolio(): void {
    if (localStorage.getItem('portfolio') === null) {
      localStorage.setItem('portfolio', JSON.stringify({}));
    }
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
