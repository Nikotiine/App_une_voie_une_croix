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

import { RegionListDto } from '../models/region-list-dto';

@Injectable({
  providedIn: 'root',
})
export class RegionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation regionControllerGetAllRegions
   */
  static readonly RegionControllerGetAllRegionsPath = '/api/region';

  /**
   * Get all regions resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `regionControllerGetAllRegions()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionControllerGetAllRegions$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<RegionListDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RegionService.RegionControllerGetAllRegionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RegionListDto>>;
      })
    );
  }

  /**
   * Get all regions resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `regionControllerGetAllRegions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  regionControllerGetAllRegions(params?: {
    context?: HttpContext
  }
): Observable<Array<RegionListDto>> {

    return this.regionControllerGetAllRegions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RegionListDto>>) => r.body as Array<RegionListDto>)
    );
  }

}
