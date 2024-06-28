import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { BusUnitService } from '../../../planification/service/bus-unit.service';
import { WeightSensorService } from "../../../planification/service/weigh-sensor.service";
import { BusUnit } from '../../../planification/models/bus-unit';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexStroke,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexLegend
} from 'ng-apexcharts';

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
  templateUrl: './label-bar-chart.component.html',
  imports: [NgApexchartsModule],
  styleUrls: ['./label-bar-chart.component.scss']
})
export class LabelBarChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  @Input() series: ApexAxisChartSeries = [];
  @Input() categories: string[] = [];
  public chartOptions: Partial<ChartOptions>;
  public busUnits: BusUnit[] = [];
  public legends: string[] = [];

  constructor(
    private busUnitService: BusUnitService,
    private weightSensorService: WeightSensorService
  ) {
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
        show: true,
        labels: {
          colors: ["#000"],
          useSeriesColors: true
        },
        formatter: (seriesName, opts) => {
          return this.legends[opts.seriesIndex];
        }
      },
    };
  }

  ngOnInit() {
    this.getAllBusUnits();
  }

  getAllBusUnits() {
    this.busUnitService.getAllBusUnits().subscribe(
      (busUnits) => {
        this.busUnits = busUnits;
        this.getBusCapacities();
      },
      (error) => {
        console.error('Error fetching bus units', error);
      }
    );
  }

  getBusCapacities() {
    const capacities: number[] = [];
    const labels: string[] = [];
    this.legends = [];

    const weightSensorObservables = this.busUnits.map(unit =>
      unit.weightSensorId ?
        this.weightSensorService.getBusCapacities(unit.weightSensorId).pipe(
          catchError(error => {
            console.error('Error fetching bus capacities', error);
            return of([]); // Return an empty array on error
          })
        ) : of([])
    );

    forkJoin(weightSensorObservables).subscribe((results) => {
      results.forEach((data, index) => {
        let totalPeopleBoarded = 0;
        let previousCapacity = 0;

        // Calcular el total de personas que se subieron
        data.forEach(entry => {
          if (entry.busCapacity > previousCapacity) {
            totalPeopleBoarded += entry.busCapacity - previousCapacity;
          }
          previousCapacity = entry.busCapacity;
        });

        capacities.push(totalPeopleBoarded);
        labels.push(`${this.busUnits[index].driver.firstName} ${this.busUnits[index].driver.lastName}`);
        this.legends.push(this.busUnits[index].bus.licensePlate);
      });
      this.updateChartOptions(capacities, labels);
    });
  }

  updateChartOptions(capacities: number[], labels: string[]) {
    this.chartOptions.series = [{
      name: 'Total passengers boarded',
      data: capacities
    }];
    this.chartOptions.xaxis = {
      categories: labels,
      labels: {
        style: {
          fontFamily: 'Urbanist, sans-serif',
        }
      }
    };
    this.chartOptions.dataLabels = {
      enabled: true,
      textAnchor: "start",
      style: {
        fontSize: "15px",
        fontFamily: 'Urbanist, sans-serif',
        colors: ["#fff"],
      },
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val + " passengers";
      },
      offsetX: 0,
      dropShadow: {
        enabled: false,
      },
    };
    this.chartOptions.plotOptions = {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom"
        }
      }
    };
    this.chartOptions.yaxis = {
      labels: {
        show: false
      }
    };
    this.chartOptions.colors = [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
    ];
    this.chartOptions.legend = {
      show: true,
      labels: {
        colors: ["#000"],
        useSeriesColors: true
      },
      formatter: (seriesName, opts) => {
        return this.legends[opts.seriesIndex];
      }
    };
    // Forzar la actualización del gráfico
    this.chart?.updateOptions(this.chartOptions);
  }

  refreshData() {
    this.getAllBusUnits();
  }
}
