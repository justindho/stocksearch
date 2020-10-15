import { Component, OnInit, Input } from '@angular/core';

import { StockStatistics } from '../stock-statistics';
import { CompanyMeta } from '../company-meta';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics: StockStatistics;

  constructor() { }

  ngOnInit(): void {
  }

}
