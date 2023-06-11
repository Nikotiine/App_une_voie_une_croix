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
   * Get all sites.
   *
   * Return all actives site
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerGetAllSites()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<SiteListDto>>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetAllSitesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SiteListDto>>;
      })
    );
  }

  /**
   * Get all sites.
   *
   * Return all actives site
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetAllSites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetAllSites(params?: {
  },
  context?: HttpContext

): Observable<Array<SiteListDto>> {

    return this.siteControllerGetAllSites$Response(params,context).pipe(
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
   * Entry point for post new site
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerCreateSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite$Response(params: {

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SiteListDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerCreateSitePath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
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
   * Entry point for post new site
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `siteControllerCreateSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerCreateSite(params: {

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  },
  context?: HttpContext

): Observable<SiteListDto> {

    return this.siteControllerCreateSite$Response(params,context).pipe(
      map((r: StrictHttpResponse<SiteListDto>) => r.body as SiteListDto)
    );
  }

  /**
   * Path part for operation siteControllerGetSite
   */
  static readonly SiteControllerGetSitePath = '/api/site/{id}';

  /**
   * Get one site resource.
   *
   * Entry point for get a site resource
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
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SiteViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerGetSitePath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
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
   * Entry point for get a site resource
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `siteControllerGetSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  siteControllerGetSite(params: {

    /**
     * id of site resource
     */
    id: number;
  },
  context?: HttpContext

): Observable<SiteViewDto> {

    return this.siteControllerGetSite$Response(params,context).pipe(
      map((r: StrictHttpResponse<SiteViewDto>) => r.body as SiteViewDto)
    );
  }

  /**
   * Path part for operation siteControllerEditSite
   */
  static readonly SiteControllerEditSitePath = '/api/site/{id}';

  /**
   * Edit site.
   *
   * Entry point for edit one site
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `siteControllerEditSite()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerEditSite$Response(params: {

    /**
     * id of site resource
     */
    id: number;

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<SiteViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, SiteService.SiteControllerEditSitePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SiteViewDto>;
      })
    );
  }

  /**
   * Edit site.
   *
   * Entry point for edit one site
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `siteControllerEditSite$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  siteControllerEditSite(params: {

    /**
     * id of site resource
     */
    id: number;

    /**
     * The Description for the Post Body. Please look into the DTO SiteCreateDto
     */
    body: SiteCreateDto
  },
  context?: HttpContext

): Observable<SiteViewDto> {

    return this.siteControllerEditSite$Response(params,context).pipe(
      map((r: StrictHttpResponse<SiteViewDto>) => r.body as SiteViewDto)
    );
  }

}
