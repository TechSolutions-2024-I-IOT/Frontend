import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WeightSensorService {
  private baseUrl = 'https://chapatubusbackend.azurewebsites.net/api/v1/weight-sensor';

  constructor(private http: HttpClient) {}

  getBusCapacities(weightSensorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/bus-capacities?weightSensorId=${weightSensorId}`);
  }
}
