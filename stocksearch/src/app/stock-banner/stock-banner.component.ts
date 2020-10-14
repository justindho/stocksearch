import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-stock-banner',
  templateUrl: './stock-banner.component.html',
  styleUrls: ['./stock-banner.component.css']
})
export class StockBannerComponent implements OnInit {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics: StockStatistics;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.displayStockStatistics();
  }

  displayBuyBanner(): void {
    let buyBanner = document.getElementById('buy-banner');
    let ticker = document.getElementById('ticker');
    ticker.innerHTML = `${this.companyMeta.ticker}`;
    buyBanner.style.display = 'block';
  }

  displayStockStatistics(): void {
    this.stockStatistics['change'] = parseFloat((this.stockStatistics.last - this.stockStatistics.prevClose).toFixed(2));
    this.stockStatistics['changePercent'] = parseFloat((this.stockStatistics['change'] / this.stockStatistics['prevClose'] * 100).toFixed(2));
    let now = new Date();
    this.stockStatistics['lastFetchTimestamp'] = this.formatTimestamp(now.toDateString());
    this.stockStatistics['timestamp'] = this.formatTimestamp(this.stockStatistics.timestamp);

    // Styling for when stock price goes up/down
    let arrowContainer = document.getElementById('arrowContainer');
    let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>`;
    let upArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;
    if (this.stockStatistics['change'] > 0) {
      let green = "#319008";
      arrowContainer.innerHTML = downArrow;
      document.getElementById('lastPrice-cell').setAttribute('style', `color:${green}`);
      document.getElementById('changeStats').setAttribute('style', `color:${green}`);
    } else if (this.stockStatistics['change'] < 0) {
      let red = "red";
      arrowContainer.innerHTML = upArrow;
      document.getElementById('lastPrice-cell').setAttribute('style', `color:${red}`);
      document.getElementById('changeStats').setAttribute('style', `color:${red}`);
    }

    this.setMarketBannerStatus();
  }

  hideBuyBanner(): void {
    let buyBanner = document.getElementById('buy-banner');
    let ticker = document.getElementById('ticker');
    ticker.innerHTML = '';
    buyBanner.style.display = 'none';
  }

  setMarketBannerStatus(): void {
    // Styling for when market is open/closed
    let marketStatus = document.getElementById('market-status');
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    console.log(`lastTimestamp: ${lastTimestamp}`);
    console.log(Date.now()-+(lastTimestamp));
    if ((Date.now() - +(lastTimestamp))/1000 < 60) { // convert milliseconds to seconds
      marketStatus.innerHTML = `Market is Open`;
      marketStatus.setAttribute('style', 'background-color:#DAF0E0; color:#78A48B');
    } else {
      marketStatus.innerHTML = `Market Closed on ${this.stockStatistics['timestamp']}`;
      marketStatus.setAttribute('style', 'background-color:#F4D4DB; color:#85634E');
    }
  }

  formatTimestamp(timestamp: string): string {
    let date = new Date(timestamp);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let hour = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let second = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

}
