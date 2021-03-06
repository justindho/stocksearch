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
  total: number = 0;

  constructor(
    private modalService: NgbModal,
    private stockService: StockService,
  ) { }

  ngOnInit(): void {
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.numSharesOwned = portfolio[this.ticker]['quantity'];
  }

  sell(ticker: string, numShares: string): void {
    let quantity = parseInt(numShares);
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.subtractSharesFromPortfolio(ticker, quantity, portfolio);

    // Notify parent component if portfolio becomes empty
    portfolio = JSON.parse(localStorage.getItem('portfolio'));
    if (Object.keys(portfolio).length == 0) {
      // notify parent component
      this.updatePortfolioItemStats('Empty portfolio');
    }
  }

  subtractSharesFromPortfolio(ticker: string, numShares: number, portfolio): void {
    if (numShares == portfolio[ticker].quantity) {
      delete portfolio[ticker];
      
    } else {
      portfolio[ticker].quantity -= numShares;
      portfolio[ticker].totalCost = portfolio[ticker].totalCost - numShares * portfolio[ticker].avgCost;
      portfolio[ticker].avgCost = portfolio[ticker].totalCost / portfolio[ticker].quantity;
      portfolio[ticker].change = this.stockStatistics.last - portfolio[ticker].avgCost;
      portfolio[ticker].marketValue = this.stockStatistics.last * portfolio[ticker].quantity;

      this.numSharesOwned = portfolio[this.ticker]['quantity'];
    }
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
    this.total = this.stockStatistics.last * quantity;
  }

}
