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

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log(`Changes detected inside summary-statistics-component!`)
  //   for (const inputName in changes) {
  //     console.log(`new value of ${inputName}: ${changes[inputName][0].high}`)
  //   }
  // }

  formatSummaryStatistics(): void {
    // Style decimals
    this.stockStatistics.high.toFixed(2);
    this.stockStatistics.low.toFixed(2);
    this.stockStatistics.open.toFixed(2);
    this.stockStatistics.prevClose.toFixed(2);
    if (this.stockStatistics.mid === null) parseFloat(this.stockStatistics.mid).toFixed(2);
    if (this.stockStatistics.bidPrice === null) parseFloat(this.stockStatistics.bidPrice).toFixed(2);
    if (this.stockStatistics.askPrice === null) parseFloat(this.stockStatistics.askPrice).toFixed(2);

    // Check for null values
    if (this.stockStatistics.mid === null) this.stockStatistics.mid = '-';
    if (this.stockStatistics.bidPrice === null) this.stockStatistics.bidPrice = '-';
    if (this.stockStatistics.bidSize === null) this.stockStatistics.bidSize = '-';
    if (this.stockStatistics.askPrice === null) this.stockStatistics.askPrice = '-';
    if (this.stockStatistics.askSize === null) this.stockStatistics.askSize = '-';
  }

}
