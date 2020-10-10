import { Component, OnInit, Input } from '@angular/core';

import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.css']
})
export class SummaryStatisticsComponent implements OnInit {
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getSummaryStatistics();
  }

  getSummaryStatistics(): void {
    this.stockService.getStockStatistics('AAPL')
      .subscribe(statistics => this.stockStatistics = statistics);
      // .subscribe(statistics => console.log(statistics));
  }

}
