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

import { RockTypeDto } from '../models/rock-type-dto';

@Injectable({
  providedIn: 'root',
})
export class RockTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation rockTypeControllerGetAllRockTypes
   */
  static readonly RockTypeControllerGetAllRockTypesPath = '/api/rock-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `rockTypeControllerGetAllRockTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  rockTypeControllerGetAllRockTypes$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<RockTypeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, RockTypeService.RockTypeControllerGetAllRockTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RockTypeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `rockTypeControllerGetAllRockTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  rockTypeControllerGetAllRockTypes(params?: {
    context?: HttpContext
  }
): Observable<Array<RockTypeDto>> {

    return this.rockTypeControllerGetAllRockTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<RockTypeDto>>) => r.body as Array<RockTypeDto>)
    );
  }

}
