import { Component, Input } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-stock-banner',
  templateUrl: './stock-banner.component.html',
  styleUrls: ['./stock-banner.component.css']
})
export class StockBannerComponent {
  @Input() companyMeta: CompanyMeta;
  @Input() stockStatistics;
  watchAddAlertTimeout: any;
  watchRemoveAlertTimeout: any;
  buyAlertTimeout: any;
  emptyStar: string = `<svg width="0.7em" height="0.7em" viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
  </svg>`;
  filledStar: string = `<svg width="0.7em" height="0.7em" viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
  </svg>`;
  downArrow: string = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
  </svg>`;
  upArrow: string = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
  </svg>`;

  constructor() { }

  ngAfterViewInit(): void {
    this.displayStockStatistics();
    this.displayStar();
  }

  ngOnChanges(): void {
    let now = new Date();
    this.stockStatistics['lastFetchTimestamp'] = this.formatTimestamp(String(now));
    this.stockStatistics['change'] = (this.stockStatistics.last - this.stockStatistics.prevClose).toFixed(2);
    this.stockStatistics['changePercent'] = ((this.stockStatistics.last - this.stockStatistics.prevClose) / this.stockStatistics.prevClose * 100).toFixed(2);
    this.stockStatistics['timestamp'] = this.formatTimestamp(this.stockStatistics.timestamp);

    if (this.marketIsOpen()) {
      this.setMarketBannerStatus();
    }
  }

  onStarClick(ticker: string): void {
    this.createWatchlist();
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    let updatedWatchlist = this.updateWatchlist(ticker, watchlist);
    this.displayWatchlistBanner(ticker, updatedWatchlist);
  }

  updateWatchlist(ticker: string, watchlist: Array<WatchlistItem>): Array<WatchlistItem> {
    let starContainer = document.getElementById('starContainer');
    let updatedWatchlist;
    if (watchlist != null && ticker in watchlist) {
      updatedWatchlist = this.removeFromWatchlist(ticker, watchlist);
      starContainer.innerHTML = this.emptyStar;
      starContainer.style.removeProperty('color');
    } else {
      updatedWatchlist = this.addToWatchlist(ticker, watchlist);
      starContainer.innerHTML = this.filledStar;
      starContainer.style.color = '#F4E00F'; // gold
    }
    return updatedWatchlist;
  }

  addToWatchlist(ticker: string, watchlist: Array<WatchlistItem>): Array<WatchlistItem> {
    let watchlistItem = {
      'ticker': ticker,
      'name': this.companyMeta.name,
      'last': this.stockStatistics.last,
      'prevClose': this.stockStatistics.prevClose,
      'change': this.stockStatistics.change,
      'changePercent': this.stockStatistics.changePercent,
    }
    watchlist[ticker] = watchlistItem;
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    return watchlist;
  }

  removeFromWatchlist(ticker: string, watchlist: Array<WatchlistItem>): Array<WatchlistItem> {
    delete watchlist[ticker];
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    return watchlist;
  }

  createWatchlist(): void {
    let watchlist = localStorage.getItem('watchlist');
    if (watchlist === null || watchlist === 'null') {
      localStorage.setItem('watchlist', JSON.stringify({}));
    }
  }

  displayWatchlistBanner(ticker: string, updatedWatchlist: Array<WatchlistItem>): void {
    let bannerAdd = document.getElementById('watchlist-add-banner');
    let bannerRemove = document.getElementById('watchlist-remove-banner');
    let addMessageContainer = document.getElementById('watchlist-add-banner-message');
    let removeMessageContainer = document.getElementById('watchlist-remove-banner-message');
    if (ticker in updatedWatchlist) {
      addMessageContainer.innerHTML = `${ticker} added to Watchlist.`;
      bannerAdd.style.display = 'block';
      bannerRemove.style.display = 'none';

      // Close the watchlist banner after 5 seconds
      clearTimeout(this.watchAddAlertTimeout);
      this.watchAddAlertTimeout = setTimeout(() => {
        bannerAdd.style.display = 'none';
      }, 5000);
    } else {
      removeMessageContainer.innerHTML = `${ticker} removed from Watchlist.`;
      bannerRemove.style.display = 'block';
      bannerAdd.style.display = 'none';

      // Close the watchlist banner after 5 seconds
      clearTimeout(this.watchRemoveAlertTimeout);
      this.watchRemoveAlertTimeout = setTimeout(() => {
        bannerRemove.style.display = 'none';
      }, 5000);
    }
  }

  displayBuyBanner(): void {
    let alertsBanner = document.getElementById('buy-banner');
    let ticker = document.getElementById('ticker');
    ticker.innerHTML = `${this.companyMeta.ticker}`;
    alertsBanner.style.display = 'block';

    // Close the buy banner after 5 seconds
    setTimeout(() => {
      alertsBanner.style.display = 'none';
    }, 5000);
  }

  displayStar(): void {
    let starContainer = document.getElementById('starContainer');
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    let ticker = this.companyMeta.ticker;
    if (watchlist === null || !(ticker in watchlist)) {
      starContainer.innerHTML = this.emptyStar;
    } else {
      starContainer.innerHTML = this.filledStar;
      starContainer.style.color = '#F4E00F'
    }
  }

  displayStockStatistics(): void {
    // Styling for when stock price goes up/down
    let arrowContainer = document.getElementById('arrowContainer');
    if (this.stockStatistics['change'] > 0.01) {
      let green = '#319008';
      arrowContainer.innerHTML = this.upArrow;
      document.getElementById('lastPrice-cell').setAttribute('style', `color:${green}`);
      document.getElementById('changeStats').setAttribute('style', `color:${green}`);
    } else if (this.stockStatistics['change'] < -0.01) {
      let red = 'red';
      arrowContainer.innerHTML = this.downArrow;
      document.getElementById('lastPrice-cell').setAttribute('style', `color:${red}`);
      document.getElementById('changeStats').setAttribute('style', `color:${red}`);
    } else {
      let black = 'black'
      document.getElementById('lastPrice-cell').setAttribute('style', `color:${black}`);
      document.getElementById('changeStats').setAttribute('style', `color:${black}`);
    }

    this.setMarketBannerStatus();
  }

  hideBuyBanner(): void {
    let buyBanner = document.getElementById('buy-banner');
    let ticker = document.getElementById('ticker');
    ticker.innerHTML = '';
    buyBanner.style.display = 'none';
  }

  marketIsOpen(): boolean {
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    return (Date.now() - +(lastTimestamp)) / 1000 < 60; // convert milliseconds to seconds
  }

  setMarketBannerStatus(): void {
    // Styling for when market is open/closed
    let marketStatus = document.getElementById('market-status');
    if (this.marketIsOpen()) { // convert milliseconds to seconds
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

  createFavorites(): void {
    let localStorage = window.localStorage;
    if (localStorage.getItem('favorites') === null) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
  }

}
