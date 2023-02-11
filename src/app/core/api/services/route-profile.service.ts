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

import { RouteProfileDto } from '../models/route-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class RouteProfileService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation routeProfileControllerGetAllRouteProfile
   */
  static readonly RouteProfileControllerGetAllRouteProfilePath = '/api/route-profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `routeProfileControllerGetAllRouteProfile()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeProfileControllerGetAllRouteProfile$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<RouteProfileDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RouteProfileService.RouteProfileControllerGetAllRouteProfilePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RouteProfileDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `routeProfileControllerGetAllRouteProfile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  routeProfileControllerGetAllRouteProfile(params?: {
    context?: HttpContext
  }
): Observable<Array<RouteProfileDto>> {

    return this.routeProfileControllerGetAllRouteProfile$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RouteProfileDto>>) => r.body as Array<RouteProfileDto>)
    );
  }

}
