import { Component, OnInit, Input } from '@angular/core';
import { PortfolioItem } from '../portfolio-item';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.css']
})
export class PortfolioItemComponent implements OnInit {
  @Input() portfolioItem: PortfolioItem;

  constructor() { }

  ngOnInit(): void {
  }

}
