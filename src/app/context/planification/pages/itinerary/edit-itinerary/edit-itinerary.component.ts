import { Component } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Location } from '@angular/common';

import { Stop } from '../../../models/stop.dto';

const ELEMENT_DATA: Stop[] = [
  {id: '1', name: 'Stop 1', distritic: 'Distrito 1', latitude: '1.000', longitude: '1.000'},
  {id: '2', name: 'Stop 2', distritic: 'Distrito 2', latitude: '2.000', longitude: '2.000'},
  {id: '3', name: 'Stop 3', distritic: 'Distrito 3', latitude: '3.000', longitude: '3.000'},
  {id: '4', name: 'Stop 4', distritic: 'Distrito 4', latitude: '4.000', longitude: '4.000'},
  {id: '5', name: 'Stop 5', distritic: 'Distrito 5', latitude: '5.000', longitude: '5.000'},
];

@Component({
  selector: 'app-edit-itinerary',
  standalone: true,
  imports: [
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatIcon,
    MatPaginatorModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-itinerary.component.html',
  styleUrl: './edit-itinerary.component.scss'
})
export default class EditItineraryComponent {

  displayedColumns: string[] = ['Alias', 'Distrito', 'Latitud', 'Longitud', 'Acciones'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor(private location: Location) { }

  goBack(): void {
    this.location.back();
  }
}
