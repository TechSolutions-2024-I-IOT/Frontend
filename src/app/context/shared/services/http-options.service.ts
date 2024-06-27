import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class HttpOptionsService {

  constructor(private tokenService: TokenService) {}

  getHttpOptions(): { headers: HttpHeaders } {
    const token = this.tokenService.getToken();
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return { headers };
  }
}
