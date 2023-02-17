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

import { DepartmentDto } from '../models/department-dto';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation departmentControllerFindByRegion
   */
  static readonly DepartmentControllerFindByRegionPath = '/api/department/{region}';

  /**
   * Get filtered collection department resource.
   *
   * Filter department with region id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `departmentControllerFindByRegion()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerFindByRegion$Response(params: {

    /**
     * id of region where are department
     */
    region: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DepartmentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentService.DepartmentControllerFindByRegionPath, 'get');
    if (params) {
      rb.path('region', params.region, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DepartmentDto>>;
      })
    );
  }

  /**
   * Get filtered collection department resource.
   *
   * Filter department with region id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `departmentControllerFindByRegion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerFindByRegion(params: {

    /**
     * id of region where are department
     */
    region: number;
    context?: HttpContext
  }
): Observable<Array<DepartmentDto>> {

    return this.departmentControllerFindByRegion$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DepartmentDto>>) => r.body as Array<DepartmentDto>)
    );
  }

}
