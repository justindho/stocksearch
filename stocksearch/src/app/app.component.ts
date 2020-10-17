import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchRoute: HTMLElement;
  watchlistRoute: HTMLElement;
  portfolioRoute: HTMLElement;
  route: string;
  title = 'Stocksearch';

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.searchRoute = document.getElementById('search-link');
    this.watchlistRoute = document.getElementById('watchlist-link');
    this.portfolioRoute = document.getElementById('portfolio-link');
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.route = event.url;
        if (this.route === '/') {
          this.searchRoute.classList.add('active');
          this.watchlistRoute.classList.remove('active');
          this.portfolioRoute.classList.remove('active');
        } else if (this.route === '/watchlist') {
          this.searchRoute.classList.remove('active');
          this.watchlistRoute.classList.add('active');
          this.portfolioRoute.classList.remove('active');
        } else if (this.route === '/portfolio') {
          this.searchRoute.classList.remove('active');
          this.watchlistRoute.classList.remove('active');
          this.portfolioRoute.classList.add('active');
        } else if (this.route.startsWith('/details/')) {
          this.searchRoute.classList.remove('active');
          this.watchlistRoute.classList.remove('active');
          this.portfolioRoute.classList.remove('active');
        }
      }
    });
  }
}
