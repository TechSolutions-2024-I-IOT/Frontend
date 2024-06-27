import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, retry } from 'rxjs';
import { Schedule } from '../models/schedule';
import { DepartureSchedule } from '../models/departure-schedule';

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {

  private baseUrl = `${environment.apiUrl}/transport-company`;
  private userId: string | null;

  constructor(
    private http: HttpClient,
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
) {
    this.userId = this.tokenService.getUserId();
}

  getAllSchedules(): Observable<Schedule[]> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
        .get<Schedule[]>(`${this.baseUrl}/schedules?userId=${this.userId}`, httpOptions)
        .pipe(retry(3));
  }

  createNewSchedule(scheduleData: Schedule): Observable<Schedule> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
        .post<Schedule>(`${this.baseUrl}/new-schedule-with-departures`, scheduleData, httpOptions)
        .pipe(retry(3));
  }
}
