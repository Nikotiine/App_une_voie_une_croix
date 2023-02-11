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

import { LevelsDto } from '../models/levels-dto';

@Injectable({
  providedIn: 'root',
})
export class LevelService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation levelControllerGetAllLevels
   */
  static readonly LevelControllerGetAllLevelsPath = '/api/level';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `levelControllerGetAllLevels()` instead.
   *
   * This method doesn't expect any request body.
   */
  levelControllerGetAllLevels$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<LevelsDto>>> {

    const rb = new RequestBuilder(this.rootUrl, LevelService.LevelControllerGetAllLevelsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<LevelsDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `levelControllerGetAllLevels$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  levelControllerGetAllLevels(params?: {
    context?: HttpContext
  }
): Observable<Array<LevelsDto>> {

    return this.levelControllerGetAllLevels$Response(params).pipe(
      map((r: StrictHttpResponse<Array<LevelsDto>>) => r.body as Array<LevelsDto>)
    );
  }

}
