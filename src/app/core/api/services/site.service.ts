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

import { SiteCreateDto } from '../models/site-create-dto';
import { SiteDataDto } from '../models/site-data-dto';
import { SiteListDto } from '../models/site-list-dto';
import { SiteViewDto } from '../models/site-view-dto';

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
   * Get all site resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerGetAllSites()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SiteListDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetAllSitesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SiteListDto>>;
      })
    );
  }

  /**
   * Get all site resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetAllSites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites(params?: {
    context?: HttpContext
  }
): Observable<Array<SiteListDto>> {

    return this.siteControllerGetAllSites$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SiteListDto>>) => r.body as Array<SiteListDto>)
    );
  }

  /**
   * Path part for operation siteControllerCreateSite
   */
  static readonly SiteControllerCreateSitePath = '/api/site';

  /**
   * Create site resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerCreateSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite$Response(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  }
): Observable<StrictHttpResponse<SiteListDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerCreateSitePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteListDto>;
      })
    );
  }

  /**
   * Create site resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerCreateSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  }
): Observable<SiteListDto> {

    return this.siteControllerCreateSite$Response(params).pipe(
      map((r: StrictHttpResponse<SiteListDto>) => r.body as SiteListDto)
    );
  }

  /**
   * Path part for operation siteControllerGetSite
   */
  static readonly SiteControllerGetSitePath = '/api/site/one/{id}';

  /**
   * Get one site resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerGetSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetSite$Response(params: {

    /**
     * id of site resource
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<SiteViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetSitePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteViewDto>;
      })
    );
  }

  /**
   * Get one site resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetSite(params: {

    /**
     * id of site resource
     */
    id: number;
    context?: HttpContext
  }
): Observable<SiteViewDto> {

    return this.siteControllerGetSite$Response(params).pipe(
      map((r: StrictHttpResponse<SiteViewDto>) => r.body as SiteViewDto)
    );
  }

  /**
   * Path part for operation siteControllerGetData
   */
  static readonly SiteControllerGetDataPath = '/api/site/data';

  /**
   * Get data for create site resource.
   *
   * Returns all the data necessary for the creation of a site
   *
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
   * Get data for create site resource.
   *
   * Returns all the data necessary for the creation of a site
   *
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
