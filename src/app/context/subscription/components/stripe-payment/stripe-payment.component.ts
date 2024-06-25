import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stripe-payment.component.html',
  styleUrl: './stripe-payment.component.scss'
})
export class StripePaymentComponent implements OnInit{
  @ViewChild('cardElement') cardElement!: ElementRef;

  stripe: any;
  card: any;
  cardErrors: string = '';

  constructor() { }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51PUNngP4WoJRr8JJRjcEV1Dv1ih1VKhqeBqtjdQo97WspTsWL5q3y8kU6aWhBf9R3dcW3NUGRhkGvuYlh5RCogYN00hhFEeAMF');
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
    if (this.stripe && this.card) {
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        console.error(error);
      } else {
        // Envía el token a tu servidor
        this.processPayment(token);
      }
    }
  }

  processPayment(token: any) {
    // Aquí deberías hacer una llamada a tu backend para procesar el pago
    console.log('Processing payment with token:', token);
  }
}
