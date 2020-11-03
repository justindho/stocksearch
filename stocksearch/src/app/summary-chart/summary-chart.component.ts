import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Highcharts from 'highcharts/highstock';

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
  interval: any;
  @Input() stockStatistics: StockStatistics;
  @Input() ticker: string;
  @Output() newChartLoadEvent = new EventEmitter<void>();

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.stockService.getDailyChartData(this.ticker)
      .subscribe(data => {
        this.dailyChartData = this.formatDailyChartData(data);
        this.createChart();
        this.notifyChartLoadEvent();
      });
    
    // Refresh stock stats and daily chart data every 15 seconds
    this.interval = setInterval(() => {
      if (this.marketIsOpen()) {
        this.getDailyChartData(this.ticker);
      }
    }, 15000);
  }

  getDailyChartData(ticker: string): void {
    this.stockService.getDailyChartData(ticker)
    .subscribe(data => {
      this.dailyChartData = this.formatDailyChartData(data);
      this.createChart();
    });
  }

  createChart(): void {
    let change = this.stockStatistics.last - this.stockStatistics.prevClose;
    let lineColor = change > 0 ? 'green' :
      change != 0 ? 'red' :
      'black';
    this.chartOptions = {
      navigator: {
        enabled: true,
      },
      plotOptions: {
        series: {
          color: lineColor,
          marker: {
              enabled: false
          }
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
        showInLegend: false,
      }],
      scrollbar: {
        enabled: true
      },
      title: {
        text: this.ticker,
      },
      tooltip: {
        split: true, 
        xDateFormat: '%A, %b %d, %H:%M',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M',
        }
      },
      yAxis: {
        labels: {
          enabled: true,
        },
        opposite: true,
        title: {
          text: null,
        },
      },
    };
  }

  formatDailyChartData(data: DailyChartData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.close];
    });
  }

  marketIsOpen(): boolean {
    let lastTimestamp = new Date(this.stockStatistics.timestamp);
    return (Date.now() - +(lastTimestamp)) / 1000 < 60; // convert milliseconds to seconds
  }

  notifyChartLoadEvent(): void {
    console.log(`(summary-chart) FIRING EVENT`);
    this.newChartLoadEvent.emit();
  }

}
