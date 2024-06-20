import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable, retry} from "rxjs";

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';

import { BusUnit } from "../models/bus-unit";
import { NewUnitBus } from '../models/new-unit-bus';
@Injectable({
  providedIn: 'root',
})

export class BusUnitService {

  private baseUrl = `${environment.apiUrl}/transport-company`;
  private userId: string | null;

  constructor(
    private http: HttpClient,
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
  ) {
    this.userId = this.tokenService.getUserId();
  }

  getAllBusUnits(): Observable<BusUnit[]> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
            .get<BusUnit[]>(`${this.baseUrl}/unit-buses?userId=${this.userId}`, httpOptions)
            .pipe(retry(3));
  }

  createBusUnit(unitBusData: any): Observable<NewUnitBus> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
          .post<NewUnitBus>(`${this.baseUrl}/assign-unit-bus`, unitBusData, httpOptions)
          .pipe(retry(3));
  }

  deleteBusUnit(id: number): Observable<any> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    const body = { unitBusId: id };
    return this.http
                .patch(`${this.baseUrl}/unit-bus/delete`, body, httpOptions)
                .pipe(retry(3));
  }

  updateBusUnit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
