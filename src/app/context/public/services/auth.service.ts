import {Injectable} from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

import { newUser } from '../models/newUser';
import { Observable, retry, tap } from 'rxjs';
import { JwtDTO } from '../models/JwtDTO';
import { LoginUser } from '../models/login-user';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    authURL =  `${environment.apiUrl}/auth`;

    constructor(private httpClient: HttpClient) { }
  
    public newuser(newUser: newUser): Observable<any> {
      return this.httpClient.post<any>(this.authURL + '/register', newUser)
      .pipe(
        retry(2));
    }
  
    public login(loginUser: LoginUser): Observable<JwtDTO> {
      return this.httpClient.post<JwtDTO>(this.authURL + '/login', loginUser)
        .pipe(
          retry(2),
          tap((response: JwtDTO) => {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
          })
        );
    }
    public logout(): void {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/sign-in';
    }
}