import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-departure-time-dialog',
  standalone: true,
  imports: [
    DatePipe,
    MatFormField,
    MatIcon,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './departure-time-dialog.component.html',
  styleUrls: ['./departure-time-dialog.component.scss'],
})
export class DepartureTimeDialogComponent implements OnInit {
  hourOptions: number[] = Array.from({ length: 24 }, (_, i) => i);
  minuteOptions: number[] = Array.from({ length: 60 }, (_, i) => i);
  hours: number[] = [];
  minutes: number[] = [];
  is24HourFormat: boolean = true;

  departureTimes: string[] = [];
  canAddToTable: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DepartureTimeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initializeDepartureTimes();
  }

  initializeDepartureTimes() {
    for (let i = 0; i < this.data.numberOfLaps; i++) {
      this.departureTimes.push('');
      this.hours.push(0);
      this.minutes.push(0);
    }
    this.updateCanAddToTable();
  }

  toggleTimeFormat() {
    this.is24HourFormat = !this.is24HourFormat;
    this.updateCanAddToTable();
  }

  hasEmptyDepartureTimes(): boolean {
    return this.departureTimes.some((time) => time === '');
  }

  getDepartureTime(index: number): Date | null {
    const hour = this.hours[index];
    const minute = this.minutes[index];

    if (hour === null || minute === null) {
      return null;
    }

    let date = new Date();
    date.setHours(hour, minute, 0, 0);
    return date;
  }

  formatHour(hour: number): string {
    if (this.is24HourFormat) {
      return hour.toString().padStart(2, '0');
    } else {
      const formattedHour = hour % 12 || 12;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      return `${formattedHour} ${amPm}`;
    }
  }

  formatMinute(minute: number): string {
    return minute.toString().padStart(2, '0');
  }

  onCancel() {
    this.dialogRef.close();
  }

  onAddToTable() {
    if (this.canAddToTable) {
      const departureTimes = this.hours.map((hour, index) => {
        const minute = this.minutes[index];
        const formattedHour = this.is24HourFormat ? hour : hour % 12 || 12;
        const formattedMinute = minute.toString().padStart(2, '0');
        const amPm = this.is24HourFormat ? '' : hour >= 12 ? ' PM' : ' AM';
        return `${formattedHour}:${formattedMinute}${amPm}`;
      });
      this.dialogRef.close({ departureTimes });
    }
  }

  updateCanAddToTable() {
    const now = new Date();
    const selectedDate = new Date(this.data.date);
    const isSameDay =
      selectedDate.getFullYear() === now.getFullYear() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getDate() === now.getDate();

    let previousDepartureTime: Date | null = null;
    for (let i = 0; i < this.departureTimes.length; i++) {
      const departureTime = this.getDepartureTime(i);
      if (!departureTime) {
        this.canAddToTable = false;
        return;
      }

      if (isSameDay && i === 0) {
        const twoMinutesDiff = 120000; // Two minutes in milliseconds
        if (departureTime.getTime() - now.getTime() < twoMinutesDiff) {
          this.canAddToTable = false;
          return;
        }
      }

      if (previousDepartureTime && departureTime <= previousDepartureTime) {
        this.canAddToTable = false;
        return;
      }

      if (previousDepartureTime && i > 0) {
        const oneHourDiff = 3600000; // One hour in milliseconds
        if (
          departureTime.getTime() - previousDepartureTime.getTime() <
          oneHourDiff
        ) {
          this.canAddToTable = false;
          return;
        }
      }

      previousDepartureTime = departureTime;
    }

    this.canAddToTable = true;
  }

  onHourChange(index: number, hour: number) {
    this.hours[index] = hour;
    this.updateCanAddToTable();
  }

  onMinuteChange(index: number, minute: number) {
    this.minutes[index] = minute;
    this.updateCanAddToTable();
  }
}
