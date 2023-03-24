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

import { DataRouteDto } from '../models/data-route-dto';
import { DataSiteDto } from '../models/data-site-dto';

@Injectable({
  providedIn: 'root',
})
export class CommonService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation commonControllerGetDataForSite
   */
  static readonly CommonControllerGetDataForSitePath = '/api/common/data/site';

  /**
   * Data for site.
   *
   * descrpitoin
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commonControllerGetDataForSite()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonControllerGetDataForSite$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DataSiteDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.CommonControllerGetDataForSitePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DataSiteDto>;
      })
    );
  }

  /**
   * Data for site.
   *
   * descrpitoin
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `commonControllerGetDataForSite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonControllerGetDataForSite(params?: {
    context?: HttpContext
  }
): Observable<DataSiteDto> {

    return this.commonControllerGetDataForSite$Response(params).pipe(
      map((r: StrictHttpResponse<DataSiteDto>) => r.body as DataSiteDto)
    );
  }

  /**
   * Path part for operation commonControllerGetDataForRoute
   */
  static readonly CommonControllerGetDataForRoutePath = '/api/common/data/route';

  /**
   * Data for route.
   *
   * descrptit
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `commonControllerGetDataForRoute()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonControllerGetDataForRoute$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<DataRouteDto>> {

    const rb = new RequestBuilder(this.rootUrl, CommonService.CommonControllerGetDataForRoutePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<DataRouteDto>;
      })
    );
  }

  /**
   * Data for route.
   *
   * descrptit
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `commonControllerGetDataForRoute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  commonControllerGetDataForRoute(params?: {
    context?: HttpContext
  }
): Observable<DataRouteDto> {

    return this.commonControllerGetDataForRoute$Response(params).pipe(
      map((r: StrictHttpResponse<DataRouteDto>) => r.body as DataRouteDto)
    );
  }

}
