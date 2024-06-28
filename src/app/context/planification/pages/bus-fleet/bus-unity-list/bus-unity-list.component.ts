import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
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
  dataSource: MatTableDataSource<BusUnit> = new MatTableDataSource<BusUnit>();
  drivers: Driver[] = [];
  buses: Bus[] = [];
  busUnitForm: FormGroup;
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
    this.busUnitForm = this.fb.group({
      driverId: ['', Validators.required],
      busId: ['', Validators.required],
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

  busUnitSubmit(): void {
    if (this.isEditMode === true) {
      this.updateBusUnit();
    } else {
      this.createBusUnit();
    }
  }
  
  createBusUnit(): void {
    if (this.busUnitForm.invalid) {
      return;
    }

    const unitBusData = this.busUnitForm.value;
    unitBusData.userId = this.tokenService.getUserId();
    this.busUnitService.createBusUnit(unitBusData).subscribe(() => {
      this.resetForm();
      this.loadBusUnits(); // Recarga los datos sin recargar la página
    }, error => {
      console.error('Error creating bus unit:', error);
    });
  }

  updateBusUnit(): void {
    if (this.busUnitForm.invalid || this.selectedUnitBusId === null) {
      return;
    }

    const unitBusData = this.busUnitForm.value;
    unitBusData.userId = this.tokenService.getUserId();
    this.busUnitService.updateBusUnit(this.selectedUnitBusId, unitBusData).subscribe(() => {
      this.resetForm();
      this.loadBusUnits(); // Recarga los datos sin recargar la página
    }, error => {
      console.error('Error updating bus unit:', error);
    });
  }

  loadBusUnits(): void {
    this.busUnitService.getAllBusUnits().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data);
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

  editBusUnit(element: BusUnit): void {
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