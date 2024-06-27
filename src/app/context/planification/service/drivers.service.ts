import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable, retry} from "rxjs";

import {Driver} from "../models/driver";

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService{

  private apiUrl = `${environment.apiUrl}/transport-company`;
  private userId: string | null;

  constructor(
    private http: HttpClient, 
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
  ) {
    this.userId = this.tokenService.getUserId();
  }

  getAllDrivers(): Observable<Driver[]> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
      .get<Driver[]>(`${this.apiUrl}/drivers?userId=${this.userId}`, httpOptions)
      .pipe(retry(3));
  }

  addDriver(driverData: any): Observable<Driver> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http.post<Driver>(`${this.apiUrl}/register-driver`, driverData, httpOptions);
  }

  getDriverById(driverId: number): Observable<Driver> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http.get<Driver>(`${this.apiUrl}/driverById?driverId=${driverId}`, httpOptions);
  }
}


