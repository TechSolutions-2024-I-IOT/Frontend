import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from "@angular/common/http";
import {Observable, retry} from "rxjs";

import { TransportCompany } from '../models/transport-company';

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { TokenService } from '../../shared/services/token.service';

@Injectable({
  providedIn: 'root'
})
export class TransportCompanyService{

  private apiUrl = `${environment.apiUrl}/transport-company`;
  private userId: string | null;

  constructor(
    private http: HttpClient, 
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
  ) {
    this.userId = this.tokenService.getUserId();
  }

  addTransportCompany(transportCompany: any): Observable<TransportCompany> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http.post<TransportCompany>(`${this.apiUrl}/new-transport-company?userId=${this.userId}`, transportCompany, httpOptions);
  }
  getTransportCompanyByUserId(): Observable<TransportCompany>{
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http.get<TransportCompany>(`${this.apiUrl}/byUserId?userId=${this.userId}`);
  }
}
