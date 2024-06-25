import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { HttpOptionsService } from '../../shared/services/http-options.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private baseUrl = 'http://localhost:8080/api/v1/payment';
  

  constructor(private http: HttpClient,  private httpOptionsService: HttpOptionsService) {}

httpOptions = this.httpOptionsService.getHttpOptions();

  createPaymentIntent(amount: number, currency: string): Observable<any> {
    return this.http
    .post<any>(`${this.baseUrl}/create-payment-intent`, { amount, currency },this.httpOptions)
    .pipe(retry(3));;
  }
}
