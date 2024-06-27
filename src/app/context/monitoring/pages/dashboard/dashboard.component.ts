import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BarChartComponent}  from '../../components/bar-chart/bar-chart.component';
import {LabelBarChartComponent} from '../../components/label-bar-chart/label-bar-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    BarChartComponent,
    LabelBarChartComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DashboardComponent implements OnInit{

  public barChartSeriesQuantity = [
    {
      name: "basic",
      data: [10, 7, 12, 9, 6, 14, 8, 11, 5, 13]
    }
  ];

  public barChartCategories = [
    "Upc Monterrico",
    "Santa Elena Norte",
    "Encalada",
    "Puente Primavera",
    "Subaru",
    "Instituto Monterrico",
    "Prosegur",
    "Caminos Del Inca",
    "Cine Benavides",
    "Velazco Astete"
  ];

  public barChartSeriesHour = [
    {
      name: "basic",
      data: [
        10, 7, 12, 9, 6, 14, 8, 11, 5, 13
      ]
    }
  ];

  public labels = {
    datetimeFormatter: {
      hour: 'HH:mm'
    }
  };

  public barChartCategoriesHour = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ]

  public barChartSeriesPassengerBus = [
    {
      data: [80, 72, 70, 65, 62]
    }
  ]

  public barChartSeriesUnitBus = [
    "Jaime Zubieta",
    "Cristian Paredes",
    "Juan Perez",
    "Carlos Rodriguez",
    "Luis Ramirez",
  ]

  constructor() {
  }

  ngOnInit(): void {
    
  }


}
