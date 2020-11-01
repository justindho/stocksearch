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

  constructFacebookUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=` + encodeURIComponent(`${this.newsItem.url}`);
  }

  constructTwitterUrl(): string {
    return `https://twitter.com/intent/tweet?text=` + encodeURIComponent(`${this.newsItem.title} ${this.newsItem.url}`);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'news-item-modal-title'});
  }

}
