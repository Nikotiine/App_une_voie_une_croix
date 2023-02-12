/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CreateSiteDto } from '../models/create-site-dto';
import { SiteDataDto } from '../models/site-data-dto';

@Injectable({
  providedIn: 'root',
})
export class SiteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation siteControllerGetAllSites
   */
  static readonly SiteControllerGetAllSitesPath = '/api/site';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerGetAllSites()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetAllSitesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetAllSites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites(params?: {
    context?: HttpContext
  }
): Observable<void> {

    return this.siteControllerGetAllSites$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation siteControllerCreateSite
   */
  static readonly SiteControllerCreateSitePath = '/api/site';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerCreateSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite$Response(params: {
    context?: HttpContext
    body: CreateSiteDto
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerCreateSitePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerCreateSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite(params: {
    context?: HttpContext
    body: CreateSiteDto
  }
): Observable<void> {

    return this.siteControllerCreateSite$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation siteControllerGetData
   */
  static readonly SiteControllerGetDataPath = '/api/site/data';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerGetData()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetData$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SiteDataDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetDataPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteDataDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetData$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetData(params?: {
    context?: HttpContext
  }
): Observable<SiteDataDto> {

    return this.siteControllerGetData$Response(params).pipe(
      map((r: StrictHttpResponse<SiteDataDto>) => r.body as SiteDataDto)
    );
  }

}
