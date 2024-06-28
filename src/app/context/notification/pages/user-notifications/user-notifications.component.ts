import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../service/notification.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table'; // Importa MatTableModule
import { MatIconModule } from '@angular/material/icon';
import { DriversService } from '../../../planification/service/drivers.service';
import { Driver } from '../../../planification/models/driver';

@Component({
  selector: 'app-user-notifications',
  standalone: true,
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './user-notifications.component.html',
  styleUrl: './user-notifications.component.scss'
})
export class UserNotificationsComponent implements OnInit {
  
  notifications: any[] = [];
  

  constructor(private heartRateService: NotificationService, private driverService: DriversService) { }

  ngOnInit() {
    this.checkHeartRates();
    setInterval(() => this.checkHeartRates(), 300000);
  }

  checkHeartRates() {
    this.driverService.getAllDrivers().subscribe(
      (drivers: Driver[]) => {
        drivers.forEach(driver => {
          this.heartRateService.getHeartRateLogs(driver.smartBandId).subscribe(
            logs => {
              const latestLog = logs[logs.length - 1];
              if (latestLog) {
                if (latestLog.heartRate < 40 || latestLog.heartRate > 130) {
                  this.notifications.push({
                    driverName: `${driver.firstName} ${driver.lastName}`,
                    heartRate: latestLog.heartRate,
                    timestamp: latestLog.timeStamp,
                    message: `Alerta: Ritmo cardíaco anormal (${latestLog.heartRate} bpm) para ${driver.firstName} ${driver.lastName}`
                  });
                }
              }
            },
            error => console.error('Error fetching heart rate logs:', error)
          );
        });
      },
      error => console.error('Error fetching drivers:', error)
    );
  }
}
