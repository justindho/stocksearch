import { Component, OnInit, Input } from '@angular/core';

import { NewsItem } from '../news-item';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent implements OnInit {
  @Input() newsItem: NewsItem;

  constructor() { }

  ngOnInit(): void {
  }

}
