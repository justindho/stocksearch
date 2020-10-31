import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsItem } from '../news-item';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {
  @Input() newsItem: NewsItem;

  constructor(private modalService: NgbModal) { }

  constructTwitterUrl(): string {
    return `https://twitter.com/intent/tweet?text=${this.newsItem.title}%20${this.newsItem.url}`
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'news-item-modal-title'});
  }

}
