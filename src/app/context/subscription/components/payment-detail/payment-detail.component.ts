import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule
  ],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.scss'
})
export class PaymentDetailComponent {
  currentDate: Date;
  expirationDate: Date;

  constructor() {
    this.currentDate = new Date();
    this.expirationDate = this.addMonths(this.currentDate, 1);
  }

  addMonths(date: Date, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
}
