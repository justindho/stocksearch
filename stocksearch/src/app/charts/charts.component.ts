import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import SMA from "highcharts/indicators/indicators"; SMA(Highcharts);
// import * as HC_VBP from 'highcharts/indicators/volume-by-price';
import VBP from 'highcharts/indicators/volume-by-price'; VBP(Highcharts);

import { HistoricalData } from '../historical-data';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() ticker: string;
  historicalData: HistoricalData[];
  ohlc: number[][];
  volume: number[][];

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "stockChart";
  chartOptions: Highcharts.Options;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getHistoricalData(this.ticker)
      .subscribe(data => {
        this.historicalData = data;
        this.ohlc = this.formatOHLCData(data);
        this.volume = this.formatVolumeData(data);
          this.createChart();
      });
  }

  createChart(): void {
    this.chartOptions = {
      navigator: {
        enabled: true,
      },
      rangeSelector: {
        allButtonsEnabled: true,
        selected: 2,
      },
      title: {
          text: `${this.ticker} Historical`
      },
      subtitle: {
          text: 'With SMA and Volume by Price technical indicators'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H:%M',
        }
      },
      yAxis: [{
          startOnTick: false,
          endOnTick: false,
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'OHLC'
          },
          height: '60%',
          lineWidth: 2,
          resize: {
              enabled: true
          }
      }, {
          labels: {
              align: 'right',
              x: -3
          },
          title: {
              text: 'Volume'
          },
          top: '65%',
          height: '35%',
          offset: 0,
          lineWidth: 2
      }],
      tooltip: {
          split: true,
          xDateFormat: '%A, %b %d, %H:%M',
      },
      plotOptions: {
          series: {
              dataGrouping: {
                  units: [[
                      'day',
                      [1]
                  ], [
                      'week',
                      [1]
                  ], [
                      'month',
                      [1, 3, 6]
                  ], [
                      'year',
                      null
                  ]]
              }
          }
      },
      series: [{
          type: 'candlestick',
          name: `${this.ticker}`,
          id: `${this.ticker}`,
          zIndex: 2,
          data: this.ohlc,
          showInLegend: false,
      }, {
          type: 'column',
          name: 'Volume',
          id: 'volume',
          data: this.volume,
          yAxis: 1,
          showInLegend: false,
      }, {
          type: 'vbp',
          linkedTo: `${this.ticker}`,
          params: {
              volumeSeriesID: 'volume'
          },
          dataLabels: {
              enabled: false
          },
          zoneLines: {
              enabled: false
          },
          showInLegend: false,
      }, {
          type: 'sma',
          linkedTo: `${this.ticker}`,
          zIndex: 1,
          marker: {
              enabled: false
          },
          showInLegend: false,
      }]
    }
  }

  formatOHLCData(data: HistoricalData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.open, x.high, x.low, x.close];
    });
  }

  formatVolumeData(data: HistoricalData[]): number[][] {
    let timeOffsetMinutes = new Date().getTimezoneOffset();
    let timeOffsetMilliseconds = timeOffsetMinutes * 60 * 1000;
    return data.map(x => {
      let date = new Date(x.date);
      return [date.valueOf() - timeOffsetMilliseconds, x.volume];
    })
  }

}
