import { Component } from '@angular/core';
import {DriverCardComponent} from "../../../components/driver-card/driver-card.component";
import {MatButton} from "@angular/material/button";
import {MatPaginator} from "@angular/material/paginator";
import {Location, NgForOf, NgIf} from "@angular/common";
import {UserProfileCardComponent} from "../../../../shared/components/user-profile-card/user-profile-card.component";

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { BackButtonComponent } from '../../../../shared/components/back-button/back-button.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {DriversService} from "../../../service/drivers.service";
import { TokenService } from '../../../../shared/services/token.service';
@Component({
  selector: 'app-driver-register',
  standalone: true,
  imports: [
    DriverCardComponent,
    MatButton,
    MatPaginator,
    NgForOf,
    NgIf,
    UserProfileCardComponent,
    ReactiveFormsModule,
    BackButtonComponent,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './driver-register.component.html',
  styleUrl: './driver-register.component.scss'
})
export class DriverRegisterComponent {
  registerForm: FormGroup;
  isSubmitted=false;

  constructor(
    private location:Location,
    private fb: FormBuilder,
    private driversService:DriversService,
    private tokenService: TokenService
  )
  {
    this.registerForm = this.fb.group({
      photoUrl: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      phoneNumber: ['', Validators.required, Validators.pattern('^[0-9]*$')],
      email: ['', Validators.required, Validators.email],
      driverLicenseNumber: ['', Validators.required]
    });
  }

  goBack(){
    this.location.back();
  }

  onSubmit() {

    if (!this.registerForm.invalid) {
      this.registerForm.value.user = this.tokenService.getUserId();
      this.driversService.addDriver(this.registerForm.value).subscribe({
        next: (response) => {
          this.goBack();
        },
        error: (error) => {
        }
      });
    }
    this.isSubmitted = true;
  }

  shouldShowError(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return <boolean>control?.invalid && (control?.touched || this.isSubmitted);
  }

  resetForm() {
    this.registerForm.reset({
      photo: '',
      first_name: '',
      last_name: '',
      dni: '',
      phone_number: '',
      email: '',
      license_number: '',
      license_photo: ''
    });
    this.isSubmitted = false;
  }


}
