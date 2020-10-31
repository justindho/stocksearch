import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  doneLoading: boolean = false;
  displayBanner: boolean = false;
  sortedWatchlist: WatchlistItem[] = [];
  watchlist: WatchlistItem[];

  constructor(private stockService: StockService) { }

  async ngOnInit(): Promise<void> {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    this.updateWatchlistLatestPrices();
    for (let ticker in this.watchlist) {
      this.sortedWatchlist.push(this.watchlist[ticker]);
    }
    this.sortWatchlist();

    // Sleep for 200ms to prove that loading screen actually shows
    await this.sleep(200);
    this.doneLoading = true;
  }

  sortWatchlist(): void {
    this.sortedWatchlist.sort((stock1, stock2) => {
      if (stock1.ticker.toUpperCase() < stock2.ticker.toUpperCase()) { return -1; }
      if (stock1.ticker.toUpperCase() > stock2.ticker.toUpperCase()) { return 1; }
    });
  }

  updateStockStatistics(tickerString: string): void {
    this.stockService.getStockStatistics(tickerString)
      .subscribe(stats => {
        for (const [_, tickerData] of Object.entries(stats)) {
          let ticker = tickerData['ticker'];
          this.watchlist[ticker]['last'] = tickerData.last;
          this.watchlist[ticker]['change'] = tickerData.last - tickerData.prevClose;
          this.watchlist[ticker]['changePercent'] = (tickerData.last - tickerData.prevClose) / tickerData.prevClose * 100;
        }
      });
  }

  async updateWatchlistLatestPrices(): Promise<void> {
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    let tickerString = '';
    for (let ticker in this.watchlist) {
      tickerString += ticker + ',';
    }
    if (tickerString.length > 0) tickerString.slice(0, -1);
    await this.updateStockStatistics(tickerString);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  sleep(ms): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateWatchlistBanner(): void {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    if (Object.keys(watchlist).length === 0) {
      this.displayBanner = true;
    } else {
      this.displayBanner = false;
    }
  }

}
