import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockSearchComponent } from './stock-search/stock-search.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';


const routes = [
  { path: '', component: StockSearchComponent },
  { path: 'search', redirectTo: '', pathMatch: 'full' },
  { path: 'details/:ticker', component: StockDetailComponent },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
