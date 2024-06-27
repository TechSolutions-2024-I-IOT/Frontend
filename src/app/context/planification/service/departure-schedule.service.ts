import {Injectable} from '@angular/core';
import {DepartureSchedule} from "../models/departure-schedule";
import { DepartureScheduleDisplay } from '../models/departure-schedule-display';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root',
})
export class DepartureScheduleService {
  private baseUrl =
    'https://my-json-server.typicode.com/TechSolutions-2024-I-IOT/PlanificationBoundedContext/departures_schedule';

  /* private baseUrl = `${environment.apiUrl}/transport-company`; */

  constructor(private http: HttpClient) {}

  getDepartureSchedulesRecord(): Observable<DepartureSchedule[]> {
    return this.http.get<DepartureSchedule[]>(this.baseUrl);
  }

}
