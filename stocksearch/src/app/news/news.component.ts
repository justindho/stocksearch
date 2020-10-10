import { Component, OnInit } from '@angular/core';

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
  }

}
