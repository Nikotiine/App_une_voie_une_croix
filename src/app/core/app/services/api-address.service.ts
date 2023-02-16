import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAddressService {
  private departementUrl: string = '/departements';
  private regionUrl: string = 'https://geo.api.gouv.fr/regions';
  private listDeptUrl: string = 'https://geo.api.gouv.fr/departements';

  arrayDept!: Observable<any>;
  private static readonly REFRESH_INTERVAL = 1000 * 60 * 15;

  private http: HttpClient;
  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  public getDepartment(idRegion: string): Observable<any> {
    return this.http.get(this.regionUrl + '/' + idRegion + this.departementUrl);
  }

  public getRegions(): Observable<any> {
    return this.http.get(this.regionUrl);
  }
  public getAllDept() {
    if (!this.arrayDept) {
      this.arrayDept = this.http
        .get(this.listDeptUrl)
        .pipe(shareReplay(1, ApiAddressService.REFRESH_INTERVAL));
    }
    return this.arrayDept;
  }
}
