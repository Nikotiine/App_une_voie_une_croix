import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressService {
  private departementUrl: string = '/departements';
  private regionUrl: string = 'https://geo.api.gouv.fr/regions';

  private http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  public getDepartement(idRegion: string): Observable<any> {
    return this.http.get(this.regionUrl + '/' + idRegion + this.departementUrl);
  }

  public getRegions(): Observable<any> {
    return this.http.get(this.regionUrl);
  }
}
