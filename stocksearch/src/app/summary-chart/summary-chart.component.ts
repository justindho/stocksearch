import { Component, Input, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { numberFormat } from 'highcharts';

import { CompanyMeta } from '../company-meta';
import { DailyChartData } from '../daily-chart-data';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  companyMeta: CompanyMeta;
  dailyChartData: number[][];
  dailyStockChart: StockChart;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getDailyChartData('AMZN')
      .subscribe(data => {
        this.dailyChartData = this.formatDailyChartData(data);
        this.dailyChartPopulation();
      });
    this.stockService.getCompanyMeta('AMZN')
      .subscribe(meta => this.companyMeta = meta);
  }

  dailyChartPopulation() {
    this.dailyStockChart = new StockChart({

      rangeSelector: {
        enabled: false,
      },
  
      title: {
        text: `${this.companyMeta.ticker}`,
      },

      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: 'AAPL',
        type: 'line',
        data: this.dailyChartData,
      }],

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M',
        }
      }
    });
  }

  formatDailyChartData(data: DailyChartData[]): number[][] {
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf(), x.close];
    });
  }

}
