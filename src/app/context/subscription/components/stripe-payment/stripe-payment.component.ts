import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient } from '@angular/common/http';
import { SubscriptionService } from '../../service/subscription.service';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule],
  templateUrl: './stripe-payment.component.html',
  styleUrl: './stripe-payment.component.scss'
})
export class StripePaymentComponent implements OnInit {
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;
  amount: number = 2400;
  cardErrors: string = '';
  paymentForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private subscriptionService: SubscriptionService) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51PRHFWILNSnESdAQap2xiRby8lWX3STOfyHO62ip3rTiVZ6sRzjTSTljJW2yOMi3wMdYyupoYSbVmPLPEGjfq17D00jo2npn4n');
    if (this.stripe) {
      const elements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount(this.cardElement.nativeElement);

      this.card.on('change', (event: { error?: { message: string } }) => {
        this.cardErrors = event.error ? event.error.message : '';
      });
    }
  }

  async onSubmit() {
    if (this.paymentForm.valid && this.stripe && this.card) {
      this.loading = true;

      try {
        const paymentIntent = await this.processPayment();

        if (paymentIntent && paymentIntent.clientSecret) {
          const { error, paymentIntent: confirmedPaymentIntent } = await this.stripe.confirmCardPayment(paymentIntent.clientSecret, {
            payment_method: {
              card: this.card,
              billing_details: {
                name: this.paymentForm.get('name')?.value,
                email: this.paymentForm.get('email')?.value,
              },
            },
          });

          if (error) {
            console.error(error);
            this.cardErrors = error.message || 'An error occurred';
          } else {
            if (confirmedPaymentIntent && confirmedPaymentIntent.status === 'succeeded') {
              console.log('PaymentIntent successfully confirmed:', confirmedPaymentIntent);
              alert('Payment successful!');
            } else {
              console.log('PaymentIntent not successful:', confirmedPaymentIntent);
              alert('Payment failed or requires additional action.');
            }
          }
        }
      } catch (error) {
        console.error('Error processing payment', error);
        this.cardErrors = 'An error occurred while processing your payment.';
      } finally {
        this.loading = false;
      }
    }
  }

  async processPayment() {
    try {
      const response = await this.subscriptionService.createPaymentIntent(this.amount, 'PEN').toPromise();
      return response;
    } catch (error) {
      console.error('Error creating payment intent', error);
      throw error;
    }
  }
}
