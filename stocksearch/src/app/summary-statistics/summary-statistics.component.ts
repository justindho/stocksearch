import { Component, OnInit, Input } from '@angular/core';

import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.css']
})
export class SummaryStatisticsComponent implements OnInit {
  @Input() stockStatistics: StockStatistics;

  ngOnInit(): void {
    this.formatSummaryStatistics();
  }

  ngOnChanges(): void {
    this.formatSummaryStatistics();
  }

  formatSummaryStatistics(): void {
    this.marketIsOpen() ? this.setMarketDependentStatisticsDisplay('block') : this.setMarketDependentStatisticsDisplay('none');
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
