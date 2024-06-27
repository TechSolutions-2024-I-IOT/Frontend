import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexFill
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  colors: string[];
};

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})

export class BarChartComponent implements OnInit {
  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  @Input() labels!: {};
  @Input() bar: boolean = true;

  chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: [],
        labels: {}
      },
      colors: ['#FF0000']
    };
  }

  ngOnInit(): void {
    this.initializeChartOptions();
  }

  initializeChartOptions(): void {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: this.bar
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: this.categories,
        labels: this.labels ? this.labels : {
          datetimeFormatter: {
            hour: 'HH:mm'
          }
        }
      },
      colors: ['#FF0000']
    };
  }
}
