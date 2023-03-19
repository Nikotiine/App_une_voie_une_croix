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

import { DepartmentDataDto } from '../models/department-data-dto';
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
   * Path part for operation departmentControllerGetByRegion
   */
  static readonly DepartmentControllerGetByRegionPath = '/api/department/region/{region}';

  /**
   * Get filtered collection department resource.
   *
   * Filter department with region id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `departmentControllerGetByRegion()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerGetByRegion$Response(params: {

    /**
     * id of region where are department
     */
    region: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DepartmentDataDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentService.DepartmentControllerGetByRegionPath, 'get');
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
        return r as StrictHttpResponse<Array<DepartmentDataDto>>;
      })
    );
  }

  /**
   * Get filtered collection department resource.
   *
   * Filter department with region id
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `departmentControllerGetByRegion$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerGetByRegion(params: {

    /**
     * id of region where are department
     */
    region: number;
    context?: HttpContext
  }
): Observable<Array<DepartmentDataDto>> {

    return this.departmentControllerGetByRegion$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DepartmentDataDto>>) => r.body as Array<DepartmentDataDto>)
    );
  }

  /**
   * Path part for operation departmentControllerGetAllDepartments
   */
  static readonly DepartmentControllerGetAllDepartmentsPath = '/api/department';

  /**
   * Get all departments.
   *
   * Retrieve all departments, Please look in DTO for DepartmentDto
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `departmentControllerGetAllDepartments()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerGetAllDepartments$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<DepartmentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, DepartmentService.DepartmentControllerGetAllDepartmentsPath, 'get');
    if (params) {
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
   * Get all departments.
   *
   * Retrieve all departments, Please look in DTO for DepartmentDto
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `departmentControllerGetAllDepartments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  departmentControllerGetAllDepartments(params?: {
    context?: HttpContext
  }
): Observable<Array<DepartmentDto>> {

    return this.departmentControllerGetAllDepartments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DepartmentDto>>) => r.body as Array<DepartmentDto>)
    );
  }

}
