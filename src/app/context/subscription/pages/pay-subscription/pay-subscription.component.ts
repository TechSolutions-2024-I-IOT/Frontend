import { Component } from '@angular/core';
import { PaymentDetailComponent } from '../../components/payment-detail/payment-detail.component';
import { SubscriptionPlanComponent } from '../../components/subscription-plan/subscription-plan.component';

@Component({
  selector: 'app-pay-subscription',
  standalone: true,
  imports: [
    PaymentDetailComponent,
    SubscriptionPlanComponent
  ],
  templateUrl: './pay-subscription.component.html',
  styleUrl: './pay-subscription.component.scss'
})
export class PaySubscriptionComponent {

}
