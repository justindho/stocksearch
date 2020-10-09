import { Component, OnInit, Input } from '@angular/core';

import { Stock } from '../stock';

@Component({
  selector: 'app-summary-statistics',
  templateUrl: './summary-statistics.component.html',
  styleUrls: ['./summary-statistics.component.css']
})
export class SummaryStatisticsComponent implements OnInit {
  @Input() stock: Stock;

  constructor() { }

  ngOnInit(): void {
  }

}
