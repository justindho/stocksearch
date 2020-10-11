import { Component, OnInit, Input } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-summary-description',
  templateUrl: './summary-description.component.html',
  styleUrls: ['./summary-description.component.css']
})
export class SummaryDescriptionComponent implements OnInit {
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
