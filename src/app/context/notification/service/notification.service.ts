import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'https://chapatubusbackend.azurewebsites.net/api/v1';

  constructor(private http: HttpClient) { }

  getHeartRateLogs(smartBandId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/smart-band/heart-rate-logs?smartBandId=${smartBandId}`);
  }

  getDriverInfo(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/transport-company/drivers?userId=${userId}`);
  }
}
