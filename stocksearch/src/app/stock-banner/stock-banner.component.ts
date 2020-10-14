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
    this.displayStar();
  }

  displayBuyBanner(): void {
    let buyBanner = document.getElementById('buy-banner');
    let ticker = document.getElementById('ticker');
    ticker.innerHTML = `${this.companyMeta.ticker}`;
    buyBanner.style.display = 'block';
  }

  displayStar(): void {
    let starContainer = document.getElementById('starContainer');
    let emptyStar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                      </svg>`;
    let filledStar = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                      </svg>`;
    
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    console.log()
    let ticker = this.companyMeta.ticker;
    if (watchlist === null || !(ticker in watchlist)) {
      starContainer.innerHTML = emptyStar;
    } else {
      starContainer.innerHTML = filledStar;
    }
  }

  displayStockStatistics(): void {
    this.stockStatistics['change'] = parseFloat((this.stockStatistics.last - this.stockStatistics.prevClose).toFixed(2));
    this.stockStatistics['changePercent'] = parseFloat((this.stockStatistics['change'] / this.stockStatistics['prevClose'] * 100).toFixed(2));
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
    let now = new Date();
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    if ((now.getTime() - lastTimestamp.getTime()) < 60*1000) { // convert seconds to milliseconds
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
