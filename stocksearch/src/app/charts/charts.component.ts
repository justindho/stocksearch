import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import SMA from "highcharts/indicators/indicators"; SMA(Highcharts);
import VBP from 'highcharts/indicators/volume-by-price'; VBP(Highcharts);

import { StockService } from '../stock.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  @Input() ticker: string;
  @Input() ohlc: number[][];
  @Input() volume: number[][];

  Highcharts: typeof Highcharts = Highcharts;
  chartConstructor = "stockChart";
  chartOptions: Highcharts.Options;

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.createChart();
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
                enabled: true,
                units: [[
                  'week', // unit name
                    [1] // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
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

}
