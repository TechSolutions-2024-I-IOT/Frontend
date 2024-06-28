import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Driver } from "../../../planification/models/driver";

import { DriversService } from "../../../planification/service/drivers.service";

import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { DriverInfoComponent } from '../../components/driver-info/driver-info.component';
import { HeartRateGraphComponent } from "../../components/heartbeat-graph/heartbeat-graph.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-heartbeat-analytics',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
    MatButtonModule,
    BackButtonComponent,
    DriverInfoComponent,
    HeartRateGraphComponent,
    MatProgressSpinnerModule,
    NgIf,
    // Añade esto
  ],
  templateUrl: './heartbeat-analytics.component.html',
  styleUrls: ['./heartbeat-analytics.component.scss']
})
export class HeartbeatAnalyticsComponent implements OnInit {

  driverId: number;
  driver: Driver;
  isLoading = true;  // Añade esta variable

  constructor(
    private route: ActivatedRoute,
    private driversService: DriversService,
    private cdr: ChangeDetectorRef  // Importa ChangeDetectorRef aquí
  ) {
    this.driver = new Driver();
    this.driverId = 0;
  }

  ngOnInit(): void {
    this.driverId = +this.route.snapshot.paramMap.get('id')!;
    this.getDriverById(this.driverId);
  }

  async getDriverById(id: number): Promise<void> {
    try {
      this.driver = await firstValueFrom(this.driversService.getDriverById(id));
      this.isLoading = false;  // Termina la carga
      this.cdr.detectChanges();  // Añade esto para detectar cambios y actualizar la vista
    } catch (error) {
      console.error('Error fetching driver:', error);
      this.isLoading = false;  // Termina la carga incluso en caso de error
    }
  }

}
