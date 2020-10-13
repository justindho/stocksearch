import { Component, OnInit } from '@angular/core';

import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';
import { WatchlistItem } from '../watchlist-items';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  // stockStatistics: StockStatistics;
  stocks: WatchlistItem[];

  constructor(private stockService: StockService) {
    this.stocks = JSON.parse(localStorage.getItem('favorites'));
    // this.stocks.forEach(x => this.displayStockStatistics(x));
    this.stocks.forEach(x => this.computeChangeStats(x));
  }

  ngOnInit(): void {
    // this.stocks.forEach(x => this.formatStockStats(x));
    this.formatStockStats();

    // this.stockService.getStockStatistics('AMZN')
    //   .subscribe(stats => this.stockStatistics = stats);
  }

  computeChangeStats(stock: WatchlistItem): void {
    stock['change'] = parseFloat((stock.last - stock.prevClose).toFixed(2));
    stock['changePercent'] = parseFloat((stock['change'] / stock['prevClose'] * 100).toFixed(2));
  }

  formatStockStats(): void {

    let cards = document.getElementsByClassName('card');
    console.log(cards);
    for (let i = 0; i < cards.length; i++) {
      let change = parseFloat(cards[i].getElementsByClassName('change')[0].innerHTML);
      if (change > 0) {
        (<HTMLElement>cards[i].getElementsByClassName('changeStats')[0]).style.color = 'green';
      } else if (change < 0) {

      } else {

      }

      // let changePercent = cards[i].getElementsByClassName('changePercent')[0];
    }




    // Styling for when stock price goes up/down
    // let arrowContainer = document.getElementById(`${stock.ticker}-arrow-container`);
    // console.log(`ticker: ${stock.ticker}`);
    // console.log(`arrowContainer: ${arrowContainer}`);
    // let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
    //                   </svg>`;
    // let upArrow = `<svg" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                   <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
    //                 </svg>`;
    // if (stock['change'] > 0) {
    //   let green = "#319008";
    //   arrowContainer.innerHTML = downArrow;
    //   document.getElementById(`${stock.ticker}-lastPrice`).setAttribute('style', `color:${green}`);
    //   document.getElementById('changeStats').setAttribute('style', `color:${green}`);
    // } else if (stock['change'] < 0) {
    //   let red = "red";
    //   arrowContainer.innerHTML = upArrow;
    //   document.getElementById(`${stock.ticker}-lastPrice`).setAttribute('style', `color:${red}`);
    //   document.getElementById(`${stock.ticker}-changeStats`).setAttribute('style', `color:${red}`);
    // }
  }

  onCloseClick(): void {

  }

}
