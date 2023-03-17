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

import { RouteCreateDto } from '../models/route-create-dto';
import { RouteListDto } from '../models/route-list-dto';
import { SiteDto } from '../models/site-dto';

@Injectable({
  providedIn: 'root',
})
export class RouteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation routeControllerGetAllRoutes
   */
  static readonly RouteControllerGetAllRoutesPath = '/api/route';

  /**
   * get all route resource.
   *
   * Find all routes in all sites
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `routeControllerGetAllRoutes()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetAllRoutes$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<RouteListDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RouteService.RouteControllerGetAllRoutesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RouteListDto>>;
      })
    );
  }

  /**
   * get all route resource.
   *
   * Find all routes in all sites
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `routeControllerGetAllRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetAllRoutes(params?: {
    context?: HttpContext
  }
): Observable<Array<RouteListDto>> {

    return this.routeControllerGetAllRoutes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RouteListDto>>) => r.body as Array<RouteListDto>)
    );
  }

  /**
   * Path part for operation routeControllerCreateRoute
   */
  static readonly RouteControllerCreateRoutePath = '/api/route';

  /**
   * Create route resource.
   *
   * Add new route for a site
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `routeControllerCreateRoute()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  routeControllerCreateRoute$Response(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO RouteCreateDto
     */
    body: RouteCreateDto
  }
): Observable<StrictHttpResponse<RouteListDto>> {

    const rb = new RequestBuilder(this.rootUrl, RouteService.RouteControllerCreateRoutePath, 'post');
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
        return r as StrictHttpResponse<RouteListDto>;
      })
    );
  }

  /**
   * Create route resource.
   *
   * Add new route for a site
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `routeControllerCreateRoute$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  routeControllerCreateRoute(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO RouteCreateDto
     */
    body: RouteCreateDto
  }
): Observable<RouteListDto> {

    return this.routeControllerCreateRoute$Response(params).pipe(
      map((r: StrictHttpResponse<RouteListDto>) => r.body as RouteListDto)
    );
  }

  /**
   * Path part for operation routeControllerGetRoute
   */
  static readonly RouteControllerGetRoutePath = '/api/route/{id}';

  /**
   * get route resource.
   *
   * find route resource by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `routeControllerGetRoute()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetRoute$Response(params: {

    /**
     * id of the route
     */
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<RouteListDto>> {

    const rb = new RequestBuilder(this.rootUrl, RouteService.RouteControllerGetRoutePath, 'get');
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
        return r as StrictHttpResponse<RouteListDto>;
      })
    );
  }

  /**
   * get route resource.
   *
   * find route resource by id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `routeControllerGetRoute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetRoute(params: {

    /**
     * id of the route
     */
    id: number;
    context?: HttpContext
  }
): Observable<RouteListDto> {

    return this.routeControllerGetRoute$Response(params).pipe(
      map((r: StrictHttpResponse<RouteListDto>) => r.body as RouteListDto)
    );
  }

  /**
   * Path part for operation routeControllerGetSites
   */
  static readonly RouteControllerGetSitesPath = '/api/route/site/list';

  /**
   * Entry point to get sites resource.
   *
   * Get all sites resource with minimum necesary datas
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `routeControllerGetSites()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetSites$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<SiteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RouteService.RouteControllerGetSitesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SiteDto>>;
      })
    );
  }

  /**
   * Entry point to get sites resource.
   *
   * Get all sites resource with minimum necesary datas
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `routeControllerGetSites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeControllerGetSites(params?: {
    context?: HttpContext
  }
): Observable<Array<SiteDto>> {

    return this.routeControllerGetSites$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SiteDto>>) => r.body as Array<SiteDto>)
    );
  }

}
