import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {Driver} from "../../../planification/models/driver";

@Component({
  selector: 'app-driver-info',
  standalone: true,
  imports: [
    MatCardModule,
    MatIcon,
  ],
  templateUrl: './driver-info.component.html',
  styleUrl: './driver-info.component.scss'
})
export class DriverInfoComponent {
  @Input()
  public driver: Driver | undefined;

  defaultImage: string = 'assets/images/planification/bus_flote/bus_driver_logo.png';

  handleImageError(event: Event): void {
    (event.target as HTMLImageElement).src = this.defaultImage;
  }
}
