import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Bus } from '../../models/bus';
import { MatButton } from '@angular/material/button';

import { BusService } from '../../service/bus.service';
import { TokenService } from '../../../shared/services/token.service';
@Component({
  selector: 'app-modal-bus',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule,
    ReactiveFormsModule,
    CommonModule,
    MatButton
  ],
  templateUrl: './modal-bus.component.html',
  styleUrl: './modal-bus.component.scss'
})
export class ModalBusComponent implements OnInit {
  state: any[] = [
    {
      value: 'OPERATIVO',
      viewValue: 'Operativo'
    },
    {
      value: 'FUERA_DE_SERVICIO',
      viewValue: 'Fuera de servicio'
    }
  ];
  
  bus: Bus;
  isEdit: boolean;
  busForm: FormGroup;

  @Output() busUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    public dialogRef: MatDialogRef<ModalBusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private busService: BusService,
    private tokenService: TokenService
  ) {
    this.bus = data.bus;
    this.isEdit = data.isEdit;
    this.busForm = this.fb.group({
      licensePlate: ['', Validators.required],
      year: ['', Validators.required],
      totalCapacity: ['', Validators.required],
      state: ['OPERATIVO', Validators.required]
    })

    if (this.isEdit) {
      this.busForm.patchValue(data.bus);
    }
  }

  ngOnInit(): void {}
   
  busSubmit() {
    if (!this.isEdit) {
      this.createNewBus();
    }else{
      this.updateBus();
    }
  }

  createNewBus() {
    if (this.busForm.valid) {
      this.busForm.value.seatingCapacity = this.busForm.value.totalCapacity;
      this.busForm.value.userId = this.tokenService.getUserId();
      this.busService.createBus(this.busForm.value).subscribe((bus) => {
        this.busUpdated.emit();
        this.dialogRef.close(bus);
      });
    }
  }

  updateBus() {
    if (this.busForm.valid) {
      this.busService.updateBus(this.bus.id, this.busForm.value).subscribe((bus) => {
        this.busUpdated.emit();
        this.dialogRef.close(bus);
      });
    }
  }

}
