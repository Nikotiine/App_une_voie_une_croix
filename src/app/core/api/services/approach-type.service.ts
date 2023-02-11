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

import { ApproachTypeDto } from '../models/approach-type-dto';

@Injectable({
  providedIn: 'root',
})
export class ApproachTypeService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation approachTypeControllerGetAllApproachTypes
   */
  static readonly ApproachTypeControllerGetAllApproachTypesPath = '/api/approach-type';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `approachTypeControllerGetAllApproachTypes()` instead.
   *
   * This method doesn't expect any request body.
   */
  approachTypeControllerGetAllApproachTypes$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ApproachTypeDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ApproachTypeService.ApproachTypeControllerGetAllApproachTypesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ApproachTypeDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `approachTypeControllerGetAllApproachTypes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  approachTypeControllerGetAllApproachTypes(params?: {
    context?: HttpContext
  }
): Observable<Array<ApproachTypeDto>> {

    return this.approachTypeControllerGetAllApproachTypes$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ApproachTypeDto>>) => r.body as Array<ApproachTypeDto>)
    );
  }

}
