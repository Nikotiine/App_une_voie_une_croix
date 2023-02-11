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

import { ExpositionsDto } from '../models/expositions-dto';

@Injectable({
  providedIn: 'root',
})
export class ExpositionService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation expositionControllerGetAllExpositions
   */
  static readonly ExpositionControllerGetAllExpositionsPath = '/api/exposition';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `expositionControllerGetAllExpositions()` instead.
   *
   * This method doesn't expect any request body.
   */
  expositionControllerGetAllExpositions$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ExpositionsDto>>> {

    const rb = new RequestBuilder(this.rootUrl, ExpositionService.ExpositionControllerGetAllExpositionsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ExpositionsDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `expositionControllerGetAllExpositions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  expositionControllerGetAllExpositions(params?: {
    context?: HttpContext
  }
): Observable<Array<ExpositionsDto>> {

    return this.expositionControllerGetAllExpositions$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ExpositionsDto>>) => r.body as Array<ExpositionsDto>)
    );
  }

}
