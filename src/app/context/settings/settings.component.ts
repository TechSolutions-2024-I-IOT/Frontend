import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TransportCompanyService } from '../planification/service/transport-company.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  transportCompanyForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transportCompanyService: TransportCompanyService
  ) {}

  ngOnInit(): void {
    this.transportCompanyForm = this.fb.group({
      name: ['', Validators.required],
      busImageUrl: ['', Validators.required],
      logoImageUrl: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.getTransportCompany();
  }

  getTransportCompany(): void {
    this.transportCompanyService.getTransportCompanyByUserId().subscribe(
      data => {
        this.transportCompanyForm.patchValue({
          name: data.name,
          busImageUrl: data.busImageUrl,
          logoImageUrl: data.logoImageUrl,
          description: data.description
        });
      },
      error => {
        console.error('Error fetching transport company data', error);
      }
    );
  }

  onSubmit(): void {
    if (this.transportCompanyForm.valid) {
      const updatedData = this.transportCompanyForm.value;
      // Llama a un método del servicio para actualizar la información
      console.log('Updated data:', updatedData);
    }
  }
  onCancel(): void {
    // Aquí puedes definir lo que debe suceder cuando el usuario cancela la edición.
    // Por ejemplo, puedes resetear el formulario o navegar a otra vista.
    this.transportCompanyForm.reset();
  }
}
