import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Autocompletion } from '../autocompletion';
import { StockService } from '../stock.service';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {
  loading: boolean = false;
  ticker = new FormControl('');
  autocompletions$: Observable<Autocompletion[]>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService) {}

  async search(str: string): Promise<void> {
    this.loading = true;
    // Sleep for 200ms to prove that loading screen actually shows
    await this.sleep(200);
    this.searchTerms.next(str);
    this.loading = false;
  }

  ngOnInit(): void {
    this.autocompletions$ = this.searchTerms.pipe(
      // wait 100ms after each keystroke before considering the next str
      // debounceTime(100),
      // ignore new str if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the str changes
      switchMap((str: string) => this.stockService.searchTickerNameAutocompletions(str)),
    );
  }

  sleep(ms): Promise<any> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}