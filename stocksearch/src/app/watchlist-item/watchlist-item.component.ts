import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent {
  @Input() watchlistItem: WatchlistItem;
  @Output() removeWatchlistItemEvent = new EventEmitter<void>();

  constructor() { }

  ngAfterViewInit(): void {
    this.updateWatchlistItemColor();
  }

  updateWatchlistItemColor(): void {
    let green = '#319008';
    let red = 'red';
    let black = 'black';
    let arrowContainer = document.getElementById('arrowContainer-' + this.watchlistItem.ticker);
    let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>`;
    let upArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;

    // Set arrow container and set color
    if (parseFloat(this.watchlistItem.change) > 0) {
      arrowContainer.innerHTML = upArrow;
      this.setColor(green);
    } else if (parseFloat(this.watchlistItem.change) < 0) {
      arrowContainer.innerHTML = downArrow;
      this.setColor(red);
    } else {
      arrowContainer.innerHTML = '';
      this.setColor(black);
    }
  }

  setColor(color: string): void {
    let items = Array.from(document.getElementsByClassName('change-color-' + this.watchlistItem.ticker) as HTMLCollectionOf<HTMLElement>);
    for (let item in items) {
      items[item].style.color = color;
    }
  }

  removeFromWatchlist(ticker: string): void {
    this.hideWatchlistItem(ticker);
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    delete watchlist[ticker];
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    this.updateWatchlistStatusBanner();
  }

  hideWatchlistItem(ticker: string): void {
    let element = document.getElementById('watchlistItem-' + ticker);
    element.style.display = 'none';
  }

  updateWatchlistStatusBanner(): void {
    this.removeWatchlistItemEvent.emit();
  }

}
