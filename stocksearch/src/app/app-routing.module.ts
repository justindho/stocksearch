import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { StockDetailComponent } from './stock-detail/stock-detail.component';
import { WatchlistComponent } from './watchlist/watchlist.component';


const routes = [
  { path: '', component: StockSearchComponent },
  { path: 'search', redirectTo: '', pathMatch: 'full' },
  { path: 'details/:ticker', component: StockDetailComponent },
  { path: 'watchlist', component: WatchlistComponent},
  { path: 'portfolio', component: PortfolioComponent },
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
