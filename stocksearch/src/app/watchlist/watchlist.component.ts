import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  sortedWatchlist: WatchlistItem[] = [];
  watchlist: WatchlistItem[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    console.log(`Inside watchlist ngOnInit`);
    this.watchlist = JSON.parse(localStorage.getItem('watchlist'));
    console.log(this.watchlist);
    this.updateWatchlistLatestPrices();
    for (let ticker in this.watchlist) {
      this.sortedWatchlist.push(this.watchlist[ticker]);
    }
    this.sortWatchlist();
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
        console.log(`statistics inside watchlist.component`);
        console.log(stats);
        this.watchlist[ticker]['last'] = statistics.last.toFixed(2);
        this.watchlist[ticker]['change'] = (statistics.last - statistics.prevClose).toFixed(2);
        this.watchlist[ticker]['changePercent'] = ((statistics.last - statistics.prevClose) / statistics.prevClose * 100).toFixed(2);
      });
  }

  updateWatchlistLatestPrices(): void {
    // console.log(this.watchlist);
    // this.watchlist.forEach(watchlistItem => this.updateStockStatistics(watchlistItem['ticker']));
    for (let ticker in this.watchlist) {
      console.log(`ticker: ${ticker}`);
      this.updateStockStatistics(ticker);
    }
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
  }

}
