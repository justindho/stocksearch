import { Component, OnInit } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { SummaryComponent } from '../summary/summary.component';
import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  stockStatistics: StockStatistics;
  companyMeta: CompanyMeta;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    // this.getSummaryStatistics();
  }

  // getSummaryStatistics(): void {
  //   this.stockService.getStockStatistics()
  //     .subscribe(statistics => this.stockStatistics = statistics);
  // }

}
