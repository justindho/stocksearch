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

  updateStockStatistics(ticker: string): void {
    this.stockService.getStockStatistics(ticker)
      .subscribe(stats => {
        let statistics = stats[0];
        this.watchlist[ticker]['last'] = statistics.last.toFixed(2);
        this.watchlist[ticker]['change'] = (statistics.last - statistics.prevClose).toFixed(2);
        this.watchlist[ticker]['changePercent'] = ((statistics.last - statistics.prevClose) / statistics.prevClose * 100).toFixed(2);
      });
  }

  updateWatchlistLatestPrices(): void {
    for (let ticker in this.watchlist) {
      this.updateStockStatistics(ticker);
    }
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

  sleep(ms): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
