import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {UserProfileCardComponent} from "../../../../shared/components/user-profile-card/user-profile-card.component";
import {Router, RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-bus-fleet-home-page',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    UserProfileCardComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './bus-fleet-home-page.component.html',
  styleUrl: './bus-fleet-home-page.component.scss'
})
export class BusFleetHomePageComponent {

  constructor(private router:Router) {
  }

  navigateToBusFleet(): void {
    this.router.navigate(['/bus-fleet/buses']);
  }

  navigateToDriverFleet(): void {
    this.router.navigate(['/bus-fleet/drivers']);
  }

  navigateToBusUnity(): void {
    this.router.navigate(['/bus-fleet/unity']);
  }
}
