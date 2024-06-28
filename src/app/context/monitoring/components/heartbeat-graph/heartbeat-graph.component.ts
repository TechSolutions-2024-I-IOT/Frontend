import { Component, OnInit, ViewChild, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip
} from 'ng-apexcharts';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-heart-rate-graph',
  standalone: true,
  templateUrl: './heartbeat-graph.component.html',
  styleUrls: ['./heartbeat-graph.component.scss'],
  imports: [
    NgApexchartsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    NgIf
  ],
  providers: [provideNativeDateAdapter()],
})
export class HeartRateGraphComponent implements OnInit, OnChanges {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() smartBandId!: number;
  public chartOptions: Partial<ChartOptions>;
  public showChart = false;
  public isLoading = false;  // Añade esta variable

  constructor(private http: HttpClient) {
    this.chartOptions = {
      series: [],
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true
        },
        toolbar: {
          autoSelected: 'zoom'
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      title: {
        text: 'Heart Rate Movement',
        align: 'left'
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        }
      },
      yaxis: {
        title: {
          text: 'Heart Rate'
        }
      },
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function(val) {
            return val.toFixed(0);
          }
        }
      }
    };
  }

  ngOnInit() {
    if (this.smartBandId) {
      this.fetchHeartRateData();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['smartBandId'] && !changes['smartBandId'].isFirstChange()) {
      this.fetchHeartRateData();
    }
  }

  fetchHeartRateData() {
    if (!this.smartBandId) {
      console.error('smartBandId is not provided');
      return;
    }

    this.isLoading = true;  // Inicia la carga

    const url = `https://chapatubusbackend.azurewebsites.net/api/v1/smart-band/heart-rate-logs?smartBandId=${this.smartBandId}`;
    this.http.get<any[]>(url).subscribe(data => {
      const seriesData = data.map(entry => ({
        x: new Date(entry.timeStamp).getTime(),
        y: entry.heartRate
      }));

      this.chartOptions.series = [{
        name: 'Heart Rate',
        data: seriesData
      }];

      this.showChart = true;
      this.isLoading = false;  // Termina la carga
      this.chart?.updateOptions(this.chartOptions);
    }, error => {
      console.error('Error fetching heart rate data', error);
      this.isLoading = false;  // Termina la carga incluso en caso de error
    });
  }

  refreshData() {
    this.fetchHeartRateData();
  }
}
