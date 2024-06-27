import {Component, Input} from '@angular/core';
import {Driver} from "../../models/driver";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-driver-card',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,RouterLink,RouterOutlet],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.scss'
})
export class DriverCardComponent {
  @Input()
  public driver: Driver | undefined;
  defaultImage: string = 'assets/images/planification/bus_flote/bus_driver_logo.png';

  constructor(private router:Router) {}

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }

  navigateToHeartbeatAnalytics(driverId?:number): void {
    //this.router.navigate(['/bus-fleet/drivers/' + driverId + '/heartbeat-analytics']);
    this.router.navigate([driverId + '/heartbeat-analytics']);
  }

}

