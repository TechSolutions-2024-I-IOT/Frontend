import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  colors: string[];
  legend: ApexLegend;
};

@Component({
  selector: 'app-label-bar-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './label-bar-chart.component.html',
  styleUrl: './label-bar-chart.component.scss'
})
export class LabelBarChartComponent implements OnInit {

  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];

  chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: []
      },
      stroke: {
        width: 0
      },
      dataLabels: {
        enabled: false
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      colors: [],
      legend: {
        show: false
      },
    };
    }


  ngOnInit(): void {
    this.initializeChartOptions();
  }
  initializeChartOptions(): void  {
    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'bar',
        height: 350
      },
      xaxis: {
        categories: this.categories,
        labels:{
          style: {
            fontFamily: 'Urbanist, sans-serif',
          }
        }
      },
      stroke: {
        width: 3,
        colors: ["#fff"],
      },
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          fontSize: "15px",
          fontFamily: 'Urbanist, sans-serif',
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " pasajeros"  ;
        },
        offsetX: 0,
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom"
          }
        }
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      colors: [
        "#33b2df",
        "#546E7A",
        "#d4526e",
        "#13d8aa",
        "#A5978B",
      ],
      legend: {
        show: false,
      },
    };
  }  
}

