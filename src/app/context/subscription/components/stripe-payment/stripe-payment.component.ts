import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
  cardErrors: string = '';
  paymentForm: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('your_stripe_publishable_key');
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
      const { token, error } = await this.stripe.createToken(this.card, {
        name: this.paymentForm.get('name')?.value,
      });

      if (error) {
        console.error(error);
        this.cardErrors = error.message || 'An error occurred';
      } else {
        this.processPayment(token);
      }
      this.loading = false;
    }
  }

  processPayment(token: any) {
    // Aquí deberías hacer una llamada a tu backend para procesar el pago
    console.log('Processing payment with token:', token);
  }
}
