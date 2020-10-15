import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

import { NewsItem } from '../news-item';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newslist: NewsItem[];

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let ticker = this.activatedRoute.snapshot.params.ticker;
    this.getNews(ticker);
  }

  getNews(symbol: string): void {
    this.stockService.getNews(symbol)
      .subscribe(news => {
        this.newslist = news;
        this.newslist.forEach(news => news.publishedAt = this.formatTimestamp(news.publishedAt));
      });
  }

  formatTimestamp(timestamp: string): string {
    return moment(timestamp).format('MMMM D, YYYY');
  }

  constructTwitterUrl(text: string): string {
    return `https://twitter.com/intent/tweet/text=${text}`
  }

}
