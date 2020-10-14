import { Component, Input, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';
import { ActivatedRoute } from '@angular/router';

import { DailyChartData } from '../daily-chart-data';
import { StockService } from '../stock.service';
import { StockStatistics } from '../stock-statistics';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  dailyChartData: number[][];
  dailyStockChart: StockChart;
  stockStatistics: StockStatistics;
  ticker: string;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ticker = this.activatedRoute.snapshot.params.ticker.toUpperCase();
    this.stockService.getDailyChartData(this.ticker)
      .subscribe(data => {
        this.dailyChartData = this.formatDailyChartData(data);
        this.stockService.getStockStatistics(this.ticker)
          .subscribe(stats => {
            this.stockStatistics = stats;
            this.createChart();
          });
      });
  }

  createChart(): void {
    let change = this.stockStatistics[0].last - this.stockStatistics[0].prevClose;
    let lineColor = change > 0 ? 'green' :
      change != 0 ? 'red' :
      'black';
    this.dailyStockChart = new StockChart({

      plotOptions: {
        series: {
          color: lineColor
        }
      },

      rangeSelector: {
        enabled: false,
      },

      series: [{
        tooltip: {
          valueDecimals: 2
        },
        name: this.ticker,
        type: 'line',
        data: this.dailyChartData,
      }],

      title: {
        text: this.ticker,
      },

      tooltip: {
        xDateFormat: '%A, %b %d, %H:%M',
      },

      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M',
        }
      }
    });
  }

  formatDailyChartData(data: DailyChartData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.close];
    });
  }

}
