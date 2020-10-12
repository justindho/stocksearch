import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Autocompletion } from '../autocompletion';
import { StockService } from '../stock.service';
import { of, iif, Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { AutocompletionLoadingService } from '../autocompletion-loading.service';

/** ATTEMPT TO GET SPINNING LOADER TO WORK AND DISAPPEAR WHEN LOADING IS DONE */
// @Component({
//   selector: 'app-stock-search',
//   templateUrl: './stock-search.component.html',
//   styleUrls: ['./stock-search.component.css']
// })
// export class StockSearchComponent implements OnInit {
//   searchForm = new FormGroup({
//     query: new FormControl('')
//   })

//   constructor(
//     private autocompletionLoadingService: AutocompletionLoadingService,
//     // private stockService: StockService
//   ) {}

//   ngOnInit(): void {}

//   // Get loading stream from service
//   loading$: Observable<boolean> = this.autocompletionLoadingService.loading$;

//   // Deconstruct form to just take the query
//   // Search on changes
//   searchResults$ = this.searchForm.valueChanges.pipe(
//     switchMap(({query}) => this.autocompletionLoadingService.get(query))
//   );
// }
/** ATTEMPT TO GET SPINNING LOADER TO WORK AND DISAPPEAR WHEN LOADING IS DONE */

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {
  ticker = new FormControl('');
  autocompletions$: Observable<Autocompletion[]>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService) {}

  search(str: string): void {
    this.searchTerms.next(str);
  }

  ngOnInit(): void {
    this.autocompletions$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the next str
      debounceTime(300),
      // ignore new str if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the str changes
      switchMap((str: string) => this.stockService.searchTickerNameAutocompletions(str)),
    );
  }

}