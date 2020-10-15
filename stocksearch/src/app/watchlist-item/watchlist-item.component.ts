import { Component, Input } from '@angular/core';
import { WatchlistItem } from '../watchlist-item';

@Component({
  selector: 'app-watchlist-item',
  templateUrl: './watchlist-item.component.html',
  styleUrls: ['./watchlist-item.component.css']
})
export class WatchlistItemComponent {
  @Input() watchlistItem: WatchlistItem;

  constructor() { }

  ngAfterViewInit(): void {
    this.updateWatchlistItemColor();
  }

  updateWatchlistItemColor(): void {
    let green = '#319008';
    let red = 'red';
    let black = 'black';
    let arrowContainer = document.getElementById('arrowContainer');
    let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                      </svg>`;
    let upArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                    </svg>`;

    // Set arrow container and set color
    if (parseFloat(this.watchlistItem.change) > 0) {
      console.log(`Setting upArrow`);
      arrowContainer.innerHTML = upArrow;
      this.setColor(green);
    } else if (parseFloat(this.watchlistItem.change) < 0) {
      console.log(`Setting downArrow`);
      arrowContainer.innerHTML = downArrow;
      this.setColor(red);
    } else {
      console.log(`Setting no arrow`);
      arrowContainer.innerHTML = '';
      this.setColor(black);
    }
  }

  setColor(color: string): void {
    let items = Array.from(document.getElementsByClassName('change-color') as HTMLCollectionOf<HTMLElement>);
    for (let item in items) {
      items[item].style.color = color;
    }
  }

  removeFromWatchlist(ticker: string): void {
    let watchlist = JSON.parse(localStorage.getItem('watchlist'));
    delete watchlist[ticker];
    this.hideWatchlistItem();
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }

  hideWatchlistItem(): void {
    let element = document.getElementById('card');
    element.style.display = 'none';
  }

}
