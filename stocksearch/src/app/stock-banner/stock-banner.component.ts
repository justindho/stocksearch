import { Component, OnInit, Input } from '@angular/core';

import { CompanyMeta } from '../company-meta';
import { StockStatistics } from '../stock-statistics';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock-banner',
  templateUrl: './stock-banner.component.html',
  styleUrls: ['./stock-banner.component.css']
})
export class StockBannerComponent implements OnInit {
  // @Input() companyMeta: CompanyMeta;
  companyMeta: CompanyMeta;
  stockStatistics: StockStatistics;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getCompanyMeta();
    this.getStockStatistics();
  }

  getCompanyMeta(): void {
    this.stockService.getCompanyMeta()
      .subscribe(meta => this.companyMeta = meta);
  }

  getStockStatistics(): void {
    this.stockService.getStockStatistics('AAPL')
      .subscribe(statistics => {
        this.stockStatistics = statistics;
        this.stockStatistics['change'] = parseFloat((statistics.last - statistics.prevClose).toFixed(2));
        this.stockStatistics['changePercent'] = parseFloat((this.stockStatistics['change'] / this.stockStatistics['prevClose'] * 100).toFixed(2));
        this.stockStatistics['timestamp'] = this.formatTimestamp(statistics.timestamp);

        // Styling for when stock price goes up/down
        let arrowContainer = document.getElementById('arrow-container');
        let downArrow = `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-up-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"/>
                          </svg>`;
        let upArrow = `<svg" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-caret-down-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
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

        // Styling for when market is open/closed
        let marketStatus = document.getElementById('market-status');
        let now = new Date();
        let lastTimestamp = new Date(this.stockStatistics.timestamp);
        if ((now.getTime() - lastTimestamp.getTime()) / 1000 > 60*1000) { // convert seconds to milliseconds
          marketStatus.innerHTML = `Market is Open`;
          marketStatus.setAttribute('style', 'background-color:#DAF0E0; color:#78A48B');
        } else {
          marketStatus.innerHTML = `Market Closed on ${this.stockStatistics['timestamp']}`;
          marketStatus.setAttribute('style', 'background-color:#F4D4DB; color:#85634E');
        }
      });
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
