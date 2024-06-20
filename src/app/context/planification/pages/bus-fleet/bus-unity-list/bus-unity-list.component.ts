import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';

import { Driver } from '../../../models/driver';
import { BusUnit } from '../../../models/bus-unit';
import { Bus } from '../../../models/bus';
import { NewUnitBus } from '../../../models/new-unit-bus';

import { BusService } from '../../../service/bus.service';
import { DriversService } from '../../../service/drivers.service';
import { BusUnitService } from '../../../service/bus-unit.service';
import { TokenService } from '../../../../shared/services/token.service';

import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
@Component({
  selector: 'app-bus-unity-list',
  standalone: true,
  imports: [
    FormsModule, 
    MatInputModule, 
    MatSelectModule, 
    MatFormFieldModule, 
    MatTableModule, 
    MatButtonModule, 
    MatAutocompleteModule,
    BackButtonComponent,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  templateUrl: './bus-unity-list.component.html',
  styleUrls: ['./bus-unity-list.component.scss']
})
export class BusUnityListComponent implements OnInit {

  displayedColumns: string[] = ['driver_name', 'buses_license_plate', 'actions'];
  dataSource: BusUnit[] = [];
  drivers: Driver[] = [];
  buses: Bus[] = [];
  selectedDriver: string = '';
  busUnitForm: FormGroup;
  newUnitBus: NewUnitBus;
  isEditMode = false;
  selectedUnitBusId: number | null = null;

  constructor(
    private busUnitService: BusUnitService,
    private driverService: DriversService,
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private busService: BusService,
    private fb: FormBuilder,
  ) {
    this.newUnitBus = new NewUnitBus();
    this.busUnitForm = this.fb.group({
      driverId: [''],
      busId: ['']
    });
  } 

  ngOnInit() {
    this.loadDrivers();
    this.loadBuses();
    this.loadBusUnits();
  }

  loadDrivers(): void {
    this.driverService.getAllDrivers().subscribe({
      next: (data) => {
        this.drivers = data;
      },
      error: (err) => console.error('Error fetching drivers:', err)
    });
  }

  loadBuses(): void {
    this.busService.getAllBuses().subscribe({
      next: (data) => {
        this.buses = data;
      },
      error: (err) => console.error('Error fetching buses:', err)
    });
  }

  busUnitSubmit() {
    this.busUnitForm.value.userId = this.tokenService.getUserId();
    this.busUnitService.createBusUnit(this.busUnitForm.value).subscribe({
      next: (data) => {      
        this.loadBusUnits();
      },
      error: (err) => console.error('Error creating bus unit:', err)
    });
  }

  loadBusUnits(): void {
    this.busUnitService.getAllBusUnits().subscribe({
      next: (data) => {
        this.dataSource = data;
      },
      error: (err) => console.error('Error fetching bus units:', err)
    });
  }  

  deleteBusUnit(id: number): void {
    this.busUnitService.deleteBusUnit(id).subscribe(() => {
      this.loadBusUnits();
    }, error => {
      console.error('Error deleting bus unit:', error);
    });
  }

  editBusUnit(element: any): void {
    this.isEditMode = true;
    this.selectedUnitBusId = element.id;
    this.busUnitForm.patchValue({
      driverId: element.driver.id,
      busId: element.bus.id,
    });
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedUnitBusId = null;
    this.busUnitForm.reset();
  }
}