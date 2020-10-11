import { Component, OnInit } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-detail',
  templateUrl: './stock-detail.component.html',
  styleUrls: ['./stock-detail.component.css']
})
export class StockDetailComponent implements OnInit {

  companyMeta: CompanyMeta;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getCompanyMeta('AMZN');
  }

  getCompanyMeta(symbol: string): void {
    this.stockService.getCompanyMeta(symbol)
      .subscribe(meta => this.companyMeta = meta);
  }

}
