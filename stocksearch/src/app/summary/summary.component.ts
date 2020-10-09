import { Component, OnInit } from '@angular/core';

import { Stock } from '../stock';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  stock: Stock = {
    name: "Amazon.com",
    symbol: "AMZN",
    high: 100,
    mid: 100,
    low: 100,
    askPrice: 100,
    open: 100,
    askSize: 100,
    prevClose: 100,
    bidPrice: 100,
    volume: 100,
    bidSize: 100,
  }

  constructor() { }

  ngOnInit(): void {
  }

}
