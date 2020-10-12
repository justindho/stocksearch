import { Component, OnInit } from '@angular/core';
import { StockChart } from 'angular-highcharts';

import { CompanyMeta } from '../company-meta';
import { HistoricalData } from '../historical-data';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  chart: StockChart;
  companyMeta: CompanyMeta;
  historicalData: HistoricalData[];
  ohlc: number[][];
  volume: number[][];

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    let ticker='AMZN';
    this.stockService.getCompanyMeta(ticker)
      .subscribe(meta => this.companyMeta = meta);
    this.stockService.getHistoricalData(ticker)
      .subscribe(data => {
        this.historicalData = data;
        this.ohlc = this.formatOHLCData(data);
        this.volume = this.formatVolumeData(data);
        this.createChart();
      });
  }

  createChart(): void {
    this.chart = new StockChart({

      rangeSelector: {
        selected: 2,
      },

      // series: [{
      //   type: 'candlestick',
      //   name: `${this.companyMeta.ticker}`,
      //   data: this.ohlc,
      //   // dataGrouping: {
      //   //   units: groupingUnits
      //   // }
      // }, {
      //   type: 'column',
      //   name: 'Volume',
      //   data: this.volume,
      //   yAxis: 1,
      //   // dataGrouping: {
      //   //   units: groupingUnits
      //   // }
      // }],

      series: [{
        type: 'candlestick',
        name: `${this.companyMeta.ticker}`,
        id: `${this.companyMeta.ticker}`,
        zIndex: 2,
        data: this.ohlc
      }, {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: this.volume,
        yAxis: 1
      }, {
        type: 'vbp',
        linkedTo: `${this.companyMeta.ticker}`,
        params: {
          volumeSeriesID: 'volume'
        },
        dataLabels: {
          enabled: false
        },
        zoneLines: {
          enabled: false
        }
      }, {
        type: 'sma',
        linkedTo: `${this.companyMeta.ticker}`,
        zIndex: 1,
        marker: {
          enabled: false
        }
      }],

      subtitle: {
        text: 'With SMA and Volume by Price technical indicators',
      },

      title: {
        text: `${this.companyMeta.ticker} Historical`,
      },

      tooltip: {
        split: true,
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
    });
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
