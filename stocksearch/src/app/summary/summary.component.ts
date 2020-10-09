import { Component, OnInit, Input } from '@angular/core';
import { CompanyMeta } from '../company-meta';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  companyMeta: CompanyMeta;

  constructor() { }

  ngOnInit(): void {
  }

}
