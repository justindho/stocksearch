import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CompanyMeta } from '../company-meta';
import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-portfolio-sell-modal',
  templateUrl: './portfolio-sell-modal.component.html',
  styleUrls: ['./portfolio-sell-modal.component.css']
})
export class PortfolioSellModalComponent implements OnInit {
  @Input() ticker: string;
  @Output() newSellEvent = new EventEmitter<string>();
  companyMeta: CompanyMeta;
  numSharesOwned: number;
  stockStatistics: StockStatistics;
  total: string = "0.00";

  constructor(
    private modalService: NgbModal,
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.numSharesOwned = portfolio[this.ticker]['quantity'];
    console.log(`numSharesOwned: ${this.numSharesOwned}`);
  }

  sell(ticker: string, numShares: string): void {
    let quantity = parseInt(numShares);
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.subtractSharesFromPortfolio(ticker, quantity, portfolio);
    this.numSharesOwned = portfolio[this.ticker]['quantity'];
  }

  subtractSharesFromPortfolio(ticker: string, numShares: number, portfolio): void {
    if (numShares == portfolio[ticker].quantity) {
      delete portfolio[ticker];
    } else {
      portfolio[ticker].quantity -= numShares;
      portfolio[ticker].totalCost = parseFloat(portfolio[ticker].totalCost) - numShares * this.stockStatistics.last;
      portfolio[ticker].avgCost = portfolio[ticker].totalCost / portfolio[ticker].quantity;
      portfolio[ticker].change = (portfolio[ticker].avgCost - this.stockStatistics.last).toFixed(2);
      portfolio[ticker].marketValue = (this.stockStatistics.last * portfolio[ticker].quantity).toFixed(2);

      // convert values back to strings for formatting purposes
      portfolio[ticker].totalCost = (portfolio[ticker].totalCost).toFixed(2);
      portfolio[ticker].avgCost = (portfolio[ticker].avgCost).toFixed(2);

    }
    console.log(JSON.stringify(portfolio));
    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  getCompanyMeta(ticker: string): void {
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => this.companyMeta = meta);
  }

  getStockStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => this.stockStatistics = stats[0]);
  }

  open(content) {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.numSharesOwned = portfolio[this.ticker]['quantity'];
    this.getCompanyMeta(this.ticker);
    this.getStockStatistics(this.ticker);
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updatePortfolioItemStats(ticker: string): void {
    this.newSellEvent.emit(ticker);
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
