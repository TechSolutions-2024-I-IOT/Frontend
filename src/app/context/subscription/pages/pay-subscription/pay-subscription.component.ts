import { Component } from '@angular/core';
import { PaymentDetailComponent } from '../../components/payment-detail/payment-detail.component';
import { SubscriptionPlanComponent } from '../../components/subscription-plan/subscription-plan.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { StripePaymentComponent } from '../../components/stripe-payment/stripe-payment.component';

@Component({
  selector: 'app-pay-subscription',
  standalone: true,
  imports: [
    PaymentDetailComponent,
    SubscriptionPlanComponent,
    MatToolbarModule,
    StripePaymentComponent
  ],
  templateUrl: './pay-subscription.component.html',
  styleUrl: './pay-subscription.component.scss'
})
export class PaySubscriptionComponent {

}
