import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  NgApexchartsModule
} from 'ng-apexcharts';
import { BusUnitService } from '../../../planification/service/bus-unit.service';
import { WeightSensorService } from "../../../planification/service/weigh-sensor.service";
import { BusUnit } from '../../../planification/models/bus-unit';
import { NgForOf } from "@angular/common";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-capacity-unit-buses-dashboard',
  standalone: true,
  imports: [
    NgApexchartsModule,
    NgForOf
  ],
  templateUrl: './capacity-unit-buses-dashboard.component.html',
  styleUrls: ['./capacity-unit-buses-dashboard.component.scss']
})
export class CapacityUnitBusesDashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public busUnits: BusUnit[] = [];
  public selectedBusUnit: BusUnit | null = null;

  constructor(
    private busUnitService: BusUnitService,
    private weightSensorService: WeightSensorService
  ) {
    this.chartOptions = {
      series: [{
        name: 'Bus Capacity',
        data: []
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Bus Capacity Trends',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: []
      }
    };
  }

  ngOnInit() {
    this.getAllBusUnits();
  }

  getAllBusUnits() {
    this.busUnitService.getAllBusUnits().subscribe(
      (busUnits) => {
        this.busUnits = busUnits;
        if (this.busUnits.length > 0) {
          this.selectedBusUnit = this.busUnits[0];
          this.getBusCapacities(this.selectedBusUnit.weightSensorId);
        }
      },
      (error) => {
        console.error('Error fetching bus units', error);
      }
    );
  }

  getBusCapacities(weightSensorId: number | null) {
    if (weightSensorId !== null) {
      this.weightSensorService.getBusCapacities(weightSensorId).subscribe(
        (data) => {
          const capacities = data.map(entry => entry.busCapacity);
          const timestamps = data.map(entry => new Date(entry.timeStamp).toLocaleTimeString());

          this.chartOptions = {
            ...this.chartOptions,
            series: [{
              name: 'Bus Capacity',
              data: capacities
            }],
            xaxis: {
              categories: timestamps
            }
          };
          // Forzar la actualización del gráfico
          this.chart?.updateOptions(this.chartOptions);
        },
        (error) => {
          console.error('Error fetching bus capacities', error);
        }
      );
    } else {
      // Manejar el caso donde weightSensorId es null
      this.chartOptions = {
        ...this.chartOptions,
        series: [{
          name: 'Bus Capacity',
          data: []
        }],
        xaxis: {
          categories: []
        }
      };
      this.chart?.updateOptions(this.chartOptions);
    }
  }

  onBusUnitChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const index = Number(selectElement.value);
    const busUnit = this.busUnits[index];
    if (busUnit) {
      this.selectedBusUnit = busUnit;
      this.getBusCapacities(this.selectedBusUnit.weightSensorId);
    }
  }

  refreshData() {
    if (this.selectedBusUnit) {
      this.getBusCapacities(this.selectedBusUnit.weightSensorId);
    }
  }
}
