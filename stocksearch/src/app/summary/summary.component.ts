import { Component, Input, Output, EventEmitter } from '@angular/core';

import { StockStatistics } from '../stock-statistics';
import { CompanyMeta } from '../company-meta';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics: StockStatistics;
  @Output() newChartLoadEvent = new EventEmitter<void>();

  constructor() { }

  notifyChartLoadEvent(): void {
    this.newChartLoadEvent.emit();
  }

}
