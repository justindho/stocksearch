import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { CompanyMeta } from './company-meta';
import { News } from './news';
import { StockStatistics } from './stock-statistics';


export const MOCK_NEWS: News[] = [
  {
    url: "https://www.businessinsider.com/amazon-alexa-echo-dot-redesign-2020-9",
    title: "Amazon just unveiled the biggest redesign to the Echo since its launch in 2014 (AMZN)",
    description: "Summary List Placement Amazon just unveiled a redesigned Echo and Echo Dot, the biggest change to the device's look and feel since its debut in 2014.  The ecommerce giant on Thursday hosted its annual product event, where it typically shows of the next gener…",
    source: {
      id: "business-insider",
      name: "Business Insider"
    },
    urlToImage: "https://i.insider.com/5f6cd40e0f4d550011032234?width=1200&format=jpeg",
    publishedAt: "2020-09-24T17:49:43Z"
    },
    {
    url: "https://www.businessinsider.com/house-antitrust-report-aws-open-source-products-2020-10",
    title: "The Congressional tech antitrust report raises concerns that Amazon's practice of making 'knock-off' versions of open source software could stifle innovation (AMZN)",
    description: "Summary List Placement Amazon Web Services has a certain reputation for its practice of taking free, open source software — software often created or maintained by smaller companies — and repackaging it to sell on its cloud. The practice is perfectly legal u…",
    source: {
      id: "business-insider",
      name: "Business Insider"
    },
    urlToImage: "https://i.insider.com/5deaa0b7fd9db21eeb482b3c?width=1200&format=jpeg",
    publishedAt: "2020-10-07T19:17:27Z"
    },
    {
    url: "https://www.businessinsider.com/amazon-buying-aurora-self-driving-acquisition-consolidation-autonomous-uber-atg-2020-9",
    title: "Amazon buying Aurora could be the next big move in the self-driving-car industry's wave of consolidation, an expert says (AMZN, UBER)",
    description: "Summary List Placement The autonomous-vehicle industry has undergone a wave of consolidation in recent years that spurred a partnership between Hyundai and Aptiv, an investment from Volkswagen into Argo AI, and Amazon's agreement to purchase Zoox, among othe…",
    source: {
      id: "business-insider",
      name: "Business Insider"
    },
    urlToImage: "https://i.insider.com/5f61047157b7da001ee11c7a?width=1200&format=jpeg",
    publishedAt: "2020-09-17T12:58:51Z"
    },
    {
    url: "https://www.businessinsider.com/ring-announces-always-home-cam-tiny-drone-fly-around-house-2020-9",
    title: "Ring's new tiny drone can autonomously fly around your home and send alerts if it detects intruders, fire, or emergencies while you're away (AMZN)",
    description: "Summary List Placement Delivery isn't the only area Amazon has been exploring when it comes to autonomously flying cameras. Ring, the security-camera company owned by Amazon, just announced a new indoor security camera that can fly around the house to keep a…",
    source: {
      id: "business-insider",
      name: "Business Insider"
    },
    urlToImage: "https://i.insider.com/5f6c995cc4049200115cb550?width=1200&format=jpeg",
    publishedAt: "2020-09-24T17:31:00Z"
    },
    {
    url: "https://www.cnn.com/2020/09/23/business/covid-test-drone-delivery-walmart/index.html",
    title: "Walmart is using drones to deliver Covid-19 tests",
    description: "If you need to get a Covid-19 test, but don't want to go near people, Walmart's got you covered. At least if you live near its North Las Vegas store.",
    source: {
      id: "cnn",
      name: "CNN"
    },
    urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/200923093607-03-walmart-drones-covid-19-tests-home-delivery-vegas---screenshot-super-tease.jpg",
    publishedAt: "2020-09-23T16:48:55Z"
    },
    {
    url: "https://www.foxbusiness.com/technology/amazon-launch-event-what-to-expect",
    title: "Amazon launch event: What to expect - Fox Business",
    description: "<ol><li>Amazon launch event: What to expect  Fox Business </li><li>Amazon's big Alexa, Echo, Fire TV and Ring event: What we expect  CNET </li><li>Alexa, what's new? Amazon's device reveal starts Thursday at 10 a.m. PT  USA TODAY </li><li>Amazon’s Echo con…",
    source: {
      id: null,
      name: "Fox Business"
    },
    urlToImage: "https://a57.foxnews.com/static.foxbusiness.com/foxbusiness.com/content/uploads/2020/03/0/0/amazon-3.jpg?ve=1&tl=1",
    publishedAt: "2020-09-24T13:54:24Z"
  },
]

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private http: HttpClient,
  ) { }

  /** GET company meta data from the server */
  getCompanyMeta(symbol: string): Observable<CompanyMeta> {
    return this.http.get<CompanyMeta>(`/api/companydescription/${symbol}`);
  }

  /** GET company news from the server */
  getNews(): Observable<News[]> {
    return of(MOCK_NEWS);
  }

  /** GET stock statistics from the server */
  getStockStatistics(symbol: string): Observable<StockStatistics> {
    return this.http.get<StockStatistics>(`/api/latestprice/${symbol}`);
  }

}
