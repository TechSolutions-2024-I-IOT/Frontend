import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { BusUnitService } from '../../../planification/service/bus-unit.service';
import { WeightSensorService } from "../../../planification/service/weigh-sensor.service";
import { BusUnit } from '../../../planification/models/bus-unit';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-bus-capacity-pie-chart',
  standalone: true,
  templateUrl: './bus-capacity-pie-chart.component.html',
  imports: [
    NgApexchartsModule
  ],
  styleUrls: ['./bus-capacity-pie-chart.component.scss']
})
export class BusCapacityPieChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public busUnits: BusUnit[] = [];

  constructor(
    private busUnitService: BusUnitService,
    private weightSensorService: WeightSensorService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        width: 380,
        type: 'pie'
      },
      labels: [],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
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
        labels.push(this.busUnits[index].bus.licensePlate);
      });
      this.updateChartOptions(capacities, labels);
    });
  }

  updateChartOptions(capacities: number[], labels: string[]) {
    this.chartOptions.series = capacities;
    this.chartOptions.labels = labels;
    // Forzar la actualización del gráfico
    this.chart?.updateOptions(this.chartOptions);
  }

  refreshData() {
    this.getAllBusUnits();
  }
}
