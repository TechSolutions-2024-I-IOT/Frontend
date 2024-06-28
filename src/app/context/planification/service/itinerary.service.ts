import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ItineraryRequest} from "../models/itinerary-request";
import {ItineraryResource} from "../models/itinerary";

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';
@Injectable({
  providedIn: 'root'
})
export class ItineraryService {

  private baseUrl = `${environment.apiUrl}/transport-company`;
  private userId: string | null;


  constructor(
    private http: HttpClient,
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
  ) {
    this.userId = this.tokenService.getUserId();
  }

  createNewItineraryWithStops(itineraryData: ItineraryRequest): Observable<any> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
          .post(`${this.baseUrl}/new-itinerary-with-stops`, itineraryData, httpOptions)
  }

  getItineraryWithStops(): Observable<any> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
          .get(`${this.baseUrl}/itinerary-with-stops?userId=${this.userId}`, httpOptions)
  }
}
