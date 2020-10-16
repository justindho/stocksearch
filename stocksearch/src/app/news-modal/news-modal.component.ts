import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { NewsItem } from '../news-item';

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.component.html',
  styleUrls: ['./news-modal.component.css']
})
export class NewsModalComponent {
  @Input() newsItem: NewsItem;

  constructor(private modalService: NgbModal) { }

  constructTwitterUrl(): string {
    return `https://twitter.com/intent/tweet?text=${this.newsItem.title}%20${this.newsItem.url}`
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy:'news-item-modal-title'});
  }

}
