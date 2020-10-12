import { Injectable } from '@angular/core';
import { map, tap, delay, catchError } from 'rxjs/operators';
import { of, Subject, Observable } from 'rxjs';

import { Autocompletion } from './autocompletion';
import { StockService } from './stock.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AutocompletionLoadingService {

  // Loading stream
  private readonly loading = new Subject<boolean>();
  get loading$(): Observable<boolean> {
    return this.loading;
  }

  constructor(
    private http: HttpClient,
    private stockService: StockService) { }

  get(str: string) {
    // return this.stockService.searchTickerNameAutocompletions(str).pipe(
    return this.http.get<Autocompletion[]>(`/api/autocomplete/${str}`).pipe(
      // Set loading to true when request begins
      tap(() => this.loading.next(true)),
      // If we get to this point, we know we got the data. Set `loading` to
      // false, return only the items
      map((res) => {
        this.loading.next(false);
        return res;
      }),
      catchError((err) => {
        console.log(err);
        this.loading.next(false);
        return of([{ login: "Error from server"}])
      })
    //   // wait 300ms after each keystroke before considering the next str
    //   debounceTime(300),
    //   // ignore new str if same as previous term
    //   distinctUntilChanged(),
    //   // switch to new search observable each time the str changes
    //   switchMap((str: string) => this.stockService.searchTickerNameAutocompletions(str)),
    );
  }

  ngOnDestroy(): void {
    this.loading.unsubscribe();
  }
}
