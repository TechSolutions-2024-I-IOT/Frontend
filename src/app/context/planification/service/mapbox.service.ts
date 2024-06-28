import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../../../../../../Desktop/Frontend/src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MapboxService {
  private readonly accessToken = environment.mapBoxKey;
  private readonly apiUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';

  constructor(private http: HttpClient) { }

  getDirections(start: [number, number], end: [number, number]): Observable<any> {
    const url = `${this.apiUrl}/${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${this.accessToken}`;
    return this.http.get(url);
  }
}
