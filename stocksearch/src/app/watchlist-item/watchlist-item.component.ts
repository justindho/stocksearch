import { Component, OnInit, Input } from '@angular/core';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent implements OnInit {
  @Input() watchlistItem: WatchlistItem;

  constructor() { }

  ngOnInit(): void {
  }

  // updatePortfolioItemStats(ticker: string): void {
  //   let watchlist = JSON.parse(localStorage.getItem('watchlist'));
  //   console.log(watchlist);
  //   if (ticker in watchlist) {
  //     this.watchlistItem = watchlist[ticker];
  //     this.watchlistItem.change = watchlist[ticker]['change'];
  //     this.watchlistItem.change = watchlist[ticker]['change'];
  //     this.watchlistItem.changePercent = watchlist[ticker]['changePercent'];
  //   }

  //   this.updatePortfolioItemColor();
  // }

}
