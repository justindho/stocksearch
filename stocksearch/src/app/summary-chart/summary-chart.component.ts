import { Component, Input, OnInit } from '@angular/core';
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
  @Input() stockStatistics: StockStatistics;
  @Input() ticker: string;

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options;

  constructor(
    private stockService: StockService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ticker = this.activatedRoute.snapshot.params.ticker.toUpperCase();
    this.stockService.getDailyChartData(this.ticker)
      .subscribe(data => {
        this.dailyChartData = this.formatDailyChartData(data);
        this.createChart();
      });
  }

  ngAfterViewInit(): void {
    
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
        split: true, 
        xDateFormat: '%A, %b %d, %H:%M',
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M',
        }
      }
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

}
