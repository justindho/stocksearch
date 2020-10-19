import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.css']
})
export class SummaryStatisticsComponent implements OnInit {
  @Input() stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.formatSummaryStatistics();
  }

  ngOnChanges(): void {
    this.formatSummaryStatistics();
  }

  formatSummaryStatistics(): void {
    // Style decimals
    this.stockStatistics.high.toFixed(2);
    this.stockStatistics.low.toFixed(2);
    this.stockStatistics.open.toFixed(2);
    this.stockStatistics.prevClose.toFixed(2);
    if (this.stockStatistics.mid === null) parseFloat(this.stockStatistics.mid).toFixed(2);
    if (this.stockStatistics.bidPrice === null) parseFloat(this.stockStatistics.bidPrice).toFixed(2);
    if (this.stockStatistics.askPrice === null) parseFloat(this.stockStatistics.askPrice).toFixed(2);

    console.log(`Is market open?: ${this.marketIsOpen()}`);

    this.marketIsOpen() ? this.setMarketDependentStatisticsDisplay('block') : this.setMarketDependentStatisticsDisplay('none');

    // Check for null values
    if (this.stockStatistics.mid === null) this.stockStatistics.mid = '-';
    if (this.stockStatistics.bidPrice === null) this.stockStatistics.bidPrice = '-';
    if (this.stockStatistics.bidSize === null) this.stockStatistics.bidSize = '-';
    if (this.stockStatistics.askPrice === null) this.stockStatistics.askPrice = '-';
    if (this.stockStatistics.askSize === null) this.stockStatistics.askSize = '-';
  }

  setMarketDependentStatisticsDisplay(display: string): void {
    let elements = document.getElementsByClassName('market-dependent');
    let elementsArray = Array.prototype.slice.call(elements);
    elementsArray.forEach(x => x.style.display = display);
  }

  marketIsOpen(): boolean {
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    return (Date.now() - +(lastTimestamp)) / 1000 < 60; // convert milliseconds to seconds
  }

}
