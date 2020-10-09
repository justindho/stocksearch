import { Component, OnInit, Input } from '@angular/core';
import { CompanyMeta } from '../company-meta';

import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  // stock: StockStatistics = {
  //   name: "Amazon.com",
  //   symbol: "AMZN",
  //   high: 100,
  //   mid: 100,
  //   low: 100,
  //   askPrice: 100,
  //   open: 100,
  //   askSize: 100,
  //   prevClose: 100,
  //   bidPrice: 100,
  //   volume: 100,
  //   bidSize: 100,
  // }

  // @Input() companyMeta: CompanyMeta;

  constructor() { }

  ngOnInit(): void {
  }

}
