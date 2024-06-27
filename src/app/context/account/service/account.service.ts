import {Injectable} from '@angular/core';
import {UserProfile} from "../models/user-profile";

import { environment } from '../../../../environments/environment';
import { HttpOptionsService } from '../../shared/services/http-options.service';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../../shared/services/token.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService{

  private baseUrl = `${environment.apiUrl}/users`;
  private userId: string | null;

  constructor(
    private http: HttpClient,
    private httpOptionsService: HttpOptionsService,
    private tokenService: TokenService
) {
    this.userId = this.tokenService.getUserId();
}

  getCurrentUser(): Observable<UserProfile> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
        .get<UserProfile>(`${this.baseUrl}/user/profile?userId=${this.userId}`, httpOptions);
  }

  updateCurrentUser(user: UserProfile): Observable<UserProfile> {
    const httpOptions = this.httpOptionsService.getHttpOptions();
    return this.http
        .put<UserProfile>(`${this.baseUrl}/user/profile?userId=${this.userId}`, user, httpOptions);
  }
}
