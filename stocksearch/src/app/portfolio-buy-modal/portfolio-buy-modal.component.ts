import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';
import { StockService } from '../stock.service';


@Component({
  selector: 'app-portfolio-buy-modal',
  templateUrl: './portfolio-buy-modal.component.html',
  styleUrls: ['./portfolio-buy-modal.component.css']
})
export class PortfolioBuyModalComponent {
  companyMeta: CompanyMeta;
  stockStatistics: StockStatistics;
  @Output() newBuyEvent = new EventEmitter<string>();
  quantity: number;
  @Input() ticker: string;
  total: string = "0.00";

  constructor(
    private modalService: NgbModal,
    private stockService: StockService,  
  ) { }

  buy(ticker: string, numShares: string): void {
    let quantity = parseInt(numShares);
    let portfolio = JSON.parse(localStorage.getItem('portfolio'));
    this.addSharesToPortfolio(ticker, quantity, portfolio);
  }

  addSharesToPortfolio(ticker: string, numShares: number, portfolio): void {
    portfolio[ticker].quantity += numShares;
    portfolio[ticker].totalCost = parseFloat(portfolio[ticker].totalCost) + numShares * this.stockStatistics.last;
    portfolio[ticker].avgCost = portfolio[ticker].totalCost / portfolio[ticker].quantity;
    portfolio[ticker].change = (this.stockStatistics.last - portfolio[ticker].avgCost).toFixed(2);
    portfolio[ticker].marketValue = (this.stockStatistics.last * portfolio[ticker].quantity).toFixed(2);

    // convert values back to strings for formatting purposes
    portfolio[ticker].totalCost = (portfolio[ticker].totalCost).toFixed(2);
    portfolio[ticker].avgCost = (portfolio[ticker].avgCost).toFixed(2);

    localStorage.setItem('portfolio', JSON.stringify(portfolio));
  }

  createPortfolio(): void {
    if (localStorage.getItem('portfolio') === null || localStorage.getItem('portfolio') === 'null') {
      localStorage.setItem('portfolio', JSON.stringify({}));
    }
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
    this.getCompanyMeta(this.ticker);
    this.getStockStatistics(this.ticker);
    this.modalService.open(content, {ariaLabelledBy:'buy-modal-title'});
  }

  updatePortfolioItemStats(ticker: string): void {
    this.newBuyEvent.emit(ticker);
  }

  updateTotal(quantity: number): void {
    this.total = (this.stockStatistics.last * quantity).toFixed(2);
  }

}
