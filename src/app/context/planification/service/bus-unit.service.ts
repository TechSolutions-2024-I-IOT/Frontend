import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpParams} from "@angular/common/http";
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

  private httpOptions = this.httpOptionsService.getHttpOptions();

  getAllBusUnits(): Observable<BusUnit[]> {
    return this.http
            .get<BusUnit[]>(`${this.baseUrl}/unit-buses?userId=${this.userId}`, this.httpOptions)
            .pipe(retry(3));
  }

  createBusUnit(unitBusData: any): Observable<NewUnitBus> {
    return this.http
          .post<NewUnitBus>(`${this.baseUrl}/assign-unit-bus`, unitBusData, this.httpOptions)
          .pipe(retry(3));
  }

  deleteBusUnit(id: number): Observable<any> {
    const body = { unitBusId: id };
    return this.http
                .patch(`${this.baseUrl}/unit-bus/delete`, body, this.httpOptions)
                .pipe(retry(3));
  }

  updateBusUnit(unitBusId: number, data: any): Observable<any> {
    const params = new HttpParams().set('unidbusId', unitBusId.toString()).set('userId', this.userId || '');
    return this.http
      .put(`${this.baseUrl}/unit-bus`, data, { params, ...this.httpOptions })
      .pipe(retry(3));
  }
}
