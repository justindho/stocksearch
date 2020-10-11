import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { News } from '../news';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newslist: News[];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.stockService.getNews()
      .subscribe(news => this.newslist = news);
    this.newslist.forEach(news => news.publishedAt = this.formatTimestamp(news.publishedAt));
  }

  formatTimestamp(timestamp: string): string {
    return moment(timestamp).format('MMMM D, YYYY');
  }

  constructTwitterUrl(text: string): string {
    return `https://twitter.com/intent/tweet/text=${text}`
  }

}
