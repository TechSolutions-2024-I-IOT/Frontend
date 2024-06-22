import { Component } from '@angular/core';
import { PaymentDetailComponent } from '../../components/payment-detail/payment-detail.component';
import { SubscriptionPlanComponent } from '../../components/subscription-plan/subscription-plan.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-pay-subscription',
  standalone: true,
  imports: [
    PaymentDetailComponent,
    SubscriptionPlanComponent,
    MatToolbarModule
  ],
  templateUrl: './pay-subscription.component.html',
  styleUrl: './pay-subscription.component.scss'
})
export class PaySubscriptionComponent {

}
