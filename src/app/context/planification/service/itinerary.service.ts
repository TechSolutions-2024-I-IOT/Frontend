import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {ItineraryRequest} from "../models/itinerary-request";

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private baseUrl = 'https://chapatubusbackend.azurewebsites.net/api/v1/transport-company';

  constructor(private http: HttpClient) {}


  private getAuthToken(): string {

    const token = localStorage.getItem('authToken');
    return token ? token : '';
  }

  createNewItineraryWithStops(itineraryData: ItineraryRequest): Observable<any> {
    const url = `${this.baseUrl}/new-itinerary-with-stops`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getAuthToken()}`
    });

    return this.http.post(url, itineraryData, { headers });
  }
}
