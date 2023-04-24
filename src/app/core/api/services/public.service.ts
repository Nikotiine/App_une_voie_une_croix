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

import { PublicDataDto } from '../models/public-data-dto';

@Injectable({
  providedIn: 'root',
})
export class PublicService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation publicControllerGetDataForHomePage
   */
  static readonly PublicControllerGetDataForHomePagePath = '/api/public';

  /**
   * Data for public home page.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `publicControllerGetDataForHomePage()` instead.
   *
   * This method doesn't expect any request body.
   */
  publicControllerGetDataForHomePage$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<PublicDataDto>> {

    const rb = new RequestBuilder(this.rootUrl, PublicService.PublicControllerGetDataForHomePagePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PublicDataDto>;
      })
    );
  }

  /**
   * Data for public home page.
   *
   *
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `publicControllerGetDataForHomePage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  publicControllerGetDataForHomePage(params?: {
  },
  context?: HttpContext

): Observable<PublicDataDto> {

    return this.publicControllerGetDataForHomePage$Response(params,context).pipe(
      map((r: StrictHttpResponse<PublicDataDto>) => r.body as PublicDataDto)
    );
  }

}
