import { Component, Input, OnInit } from '@angular/core';

import * as HighCharts from 'highcharts';
import { CompanyMeta } from '../company-meta';

@Component({
  selector: 'app-summary-chart',
  templateUrl: './summary-chart.component.html',
  styleUrls: ['./summary-chart.component.css']
})
export class SummaryChartComponent implements OnInit {
  @Input() companyMeta: CompanyMeta;

  constructor() { }

  ngOnInit(): void {
    this.barChartPopulation();
    this.dailyChartPopulation();
  }

  dailyChartPopulation() {
    // HighCharts.stockChart('dailychart', {


    //   rangeSelector: {
    //     selected: 1
    //   },
  
    //   title: {
    //     text: `${companyMeta.symbol}`,
    //   },
  
    //   series: [{
    //     name: 'AAPL',
    //     data: data,
    //     tooltip: {
    //       valueDecimals: 2
    //     }
    //   }]
    // });
  }

  barChartPopulation() {
    HighCharts.chart('dailychart2', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Historic World Population by Region'
      },
      xAxis: {
        categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population (millions)',
          align: 'high'
        },
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        type: undefined,
        name: 'Year 1800',
        data: [107, 31, 635, 203, 2]
      }, {
        type: undefined,
        name: 'Year 1900',
        data: [133, 156, 947, 408, 6]
      }, {
        type: undefined,
        name: 'Year 2000',
        data: [814, 841, 3714, 727, 31]
      }, {
        type: undefined,
        name: 'Year 2016',
        data: [1216, 1001, 4436, 738, 40]
      }]
    });
  }

}
