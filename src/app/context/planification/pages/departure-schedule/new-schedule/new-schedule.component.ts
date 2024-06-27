import { Component, OnInit } from '@angular/core';
import {Router, RouterOutlet} from "@angular/router";
import { MatStepperModule} from '@angular/material/stepper';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import { Schedule } from '../../../models/schedule';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BusUnitService } from '../../../service/bus-unit.service';
import { BusUnit } from '../../../models/bus-unit';
import { Location, CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';

import { ScheduleService } from '../../../service/schedule.service';
import { ModalDepartureHoursComponent } from '../../../components/modal-departure-hours/modal-departure-hours.component';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { DepartureSchedule } from '../../../models/departure-schedule';
import { TokenService } from '../../../../shared/services/token.service';
@Component({
  selector: 'app-new-schedule',
  standalone: true,
  imports: [
    RouterOutlet,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommonModule,
    MatTableModule,
    MatDividerModule,
    BackButtonComponent,
    MatDialogModule
  ],
  templateUrl: './new-schedule.component.html',
  styleUrl: './new-schedule.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class NewScheduleComponent implements OnInit {

  schedule: FormGroup;
  addDepartures: FormGroup;
  busUnits: BusUnit[] = []
  displayedColumns: string[] = ['driver', 'bus', 'roundNumber', 'times', 'actions'];
  dataSource: any[] = [];

  constructor(
    private router: Router,
    private location:Location,
    private fb: FormBuilder,
    private busUnitService: BusUnitService,
    private scheduleService: ScheduleService,
    public dialog: MatDialog,
    private tokenService: TokenService
  ) {
    this.schedule = this.fb.group({
      description: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.addDepartures = this.fb.group({
      unitBusId: ['', Validators.required],
      roundNumber: ['', [Validators.required, Validators.min(1)]],
      times: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadBusUnits();
  }

  loadBusUnits() {
    this.busUnitService.getAllBusUnits().subscribe((busUnits) => {
      this.busUnits = busUnits;
    });
  }

  openDialog() {
    const roundNumber = this.addDepartures.get('roundNumber')?.value;
    const dialogRef = this.dialog.open(ModalDepartureHoursComponent, {
      width: '400px',
      data: { roundNumber: roundNumber }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addTimesToForm(result.departureTimes);
      }
    });
  }

  addTimesToForm(times: string[]) {
    const timesArray = this.addDepartures.get('times') as FormArray;
    timesArray.clear();
    times.forEach(time => {
      timesArray.push(this.fb.control(time, Validators.required));
    });
  }

  addToTable() {
    const unitBusId = this.addDepartures.get('unitBusId')?.value;
    const roundNumber = this.addDepartures.get('roundNumber')?.value;
    const times = (this.addDepartures.get('times') as FormArray).value;

    const selectedBusUnit = this.busUnits.find(busUnit => busUnit.id === unitBusId);

    if (selectedBusUnit) {
      const newRow = {
        driver: `${selectedBusUnit.driver.firstName} ${selectedBusUnit.driver.lastName}`,
        bus: selectedBusUnit.bus.licensePlate,
        roundNumber: roundNumber,
        times: times.join(', ')
      };

      this.dataSource.push(newRow);
      this.dataSource = [...this.dataSource];
    }

    this.addDepartures.reset();
    (this.addDepartures.get('times') as FormArray).clear();
  }

  deleteBus(element: any) {
    const index = this.dataSource.indexOf(element);
    if (index >= 0) {
      this.dataSource.splice(index, 1);
      this.dataSource = [...this.dataSource];
    }
  }

  goBack(){
    this.location.back();
  }

  saveSchedule() {

    const dateValue = this.schedule.get('date')?.value;
    const formattedDate = this.formatDate(dateValue);

    const schedule: Schedule = {
      description: this.schedule.get('description')?.value,
      date: formattedDate,
      departureSchedules: this.dataSource.map(departure => {
        return new DepartureSchedule(
          departure.times.split(', '),
          departure.roundNumber,
          this.busUnits.find(busUnit => busUnit.bus.licensePlate === departure.bus)?.id || 0
        );
      }),
      userId: this.tokenService.getUserId() || ''
    };

    this.scheduleService.createNewSchedule(schedule).subscribe(() => {
      this.goBack();
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${day}/${month}/${year}`;
  }
}