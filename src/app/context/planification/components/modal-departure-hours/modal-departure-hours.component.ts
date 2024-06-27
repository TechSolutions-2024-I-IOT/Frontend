import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-departure-hours',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './modal-departure-hours.component.html',
  styleUrls: ['./modal-departure-hours.component.scss']
})

export class ModalDepartureHoursComponent implements OnInit {

  departureHoursForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalDepartureHoursComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roundNumber: number },
    private fb: FormBuilder,
  ) {
    this.departureHoursForm = this.fb.group({
      departureTimes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.initDepartureTimes(this.data.roundNumber);
  }

  initDepartureTimes(roundNumber: number) {
    const departureTimes = this.departureHoursForm.get('departureTimes') as FormArray;
    for (let i = 0; i < roundNumber; i++) {
      departureTimes.push(this.fb.control('', Validators.required));
    }
  }

  get departureTimes(): FormArray {
    return this.departureHoursForm.get('departureTimes') as FormArray;
  }

  submit() {
    if (this.departureHoursForm.valid) {
      this.dialogRef.close(this.departureHoursForm.value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
