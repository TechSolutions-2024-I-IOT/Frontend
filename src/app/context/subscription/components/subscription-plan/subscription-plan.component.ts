import { Component } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-subscription-plan',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './subscription-plan.component.html',
  styleUrl: './subscription-plan.component.scss'
})
export class SubscriptionPlanComponent {

}
