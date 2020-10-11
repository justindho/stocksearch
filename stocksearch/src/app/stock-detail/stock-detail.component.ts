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
  chartsDiv;
  newsDiv;
  summaryDiv;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getCompanyMeta();
    // this.chartsDiv = document.getElementById('chartsDiv');
    this.newsDiv = document.getElementById('newsDiv');
    this.summaryDiv = document.getElementById('summaryDiv');
    // this.chartsDiv.style.display = 'none';
    this.newsDiv.style.display = 'none';
    this.summaryDiv.style.display = 'block';
  }

  getCompanyMeta(): void {
    this.stockService.getCompanyMeta()
      .subscribe(meta => this.companyMeta = meta);
  }

  onChartsButtonClick() {
    // this.chartsDiv.style.display = 'block';
    this.newsDiv.style.display = 'none';
    this.summaryDiv.style.display = 'none';
  }

  onNewsButtonClick() {
    // this.chartsDiv.style.display = 'none';
    this.newsDiv.style.display = 'block';
    this.summaryDiv.style.display = 'none';
  }

  onSummaryButtonClick() {
    // this.chartsDiv.style.display = 'none';
    this.newsDiv.style.display = 'none';
    this.summaryDiv.style.display = 'block';
  }

}
