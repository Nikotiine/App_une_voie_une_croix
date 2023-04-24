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

import { AdminRoutesDto } from '../models/admin-routes-dto';
import { AdminSitesDto } from '../models/admin-sites-dto';
import { AdminUsersDto } from '../models/admin-users-dto';
import { UpdateResponse } from '../models/update-response';

@Injectable({
  providedIn: 'root',
})
export class AdminService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation adminControllerGetAllUsers
   */
  static readonly AdminControllerGetAllUsersPath = '/api/admin/users';

  /**
   * Get collection users resouces.
   *
   * Mettre une descrption
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerGetAllUsers()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllUsers$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<AdminUsersDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerGetAllUsersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AdminUsersDto>>;
      })
    );
  }

  /**
   * Get collection users resouces.
   *
   * Mettre une descrption
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerGetAllUsers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllUsers(params?: {
  },
  context?: HttpContext

): Observable<Array<AdminUsersDto>> {

    return this.adminControllerGetAllUsers$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<AdminUsersDto>>) => r.body as Array<AdminUsersDto>)
    );
  }

  /**
   * Path part for operation adminControllerEditUserRole
   */
  static readonly AdminControllerEditUserRolePath = '/api/admin/users/role/{id}';

  /**
   * Edit user role.
   *
   * Mettre une descfitpion
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerEditUserRole()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminControllerEditUserRole$Response(params: {

    /**
     * id of user
     */
    id: number;
    body: AdminUsersDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UpdateResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerEditUserRolePath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UpdateResponse>;
      })
    );
  }

  /**
   * Edit user role.
   *
   * Mettre une descfitpion
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerEditUserRole$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  adminControllerEditUserRole(params: {

    /**
     * id of user
     */
    id: number;
    body: AdminUsersDto
  },
  context?: HttpContext

): Observable<UpdateResponse> {

    return this.adminControllerEditUserRole$Response(params,context).pipe(
      map((r: StrictHttpResponse<UpdateResponse>) => r.body as UpdateResponse)
    );
  }

  /**
   * Path part for operation adminControllerToggleUserStatus
   */
  static readonly AdminControllerToggleUserStatusPath = '/api/admin/users/{id}';

  /**
   * Toggle user status.
   *
   * Mettre une descfitpion
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerToggleUserStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleUserStatus$Response(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UpdateResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerToggleUserStatusPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UpdateResponse>;
      })
    );
  }

  /**
   * Toggle user status.
   *
   * Mettre une descfitpion
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerToggleUserStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleUserStatus(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<UpdateResponse> {

    return this.adminControllerToggleUserStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<UpdateResponse>) => r.body as UpdateResponse)
    );
  }

  /**
   * Path part for operation adminControllerGetAllSites
   */
  static readonly AdminControllerGetAllSitesPath = '/api/admin/sites';

  /**
   * Get collection sites resouces.
   *
   * Mettre une descrption
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerGetAllSites()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllSites$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<AdminSitesDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerGetAllSitesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AdminSitesDto>>;
      })
    );
  }

  /**
   * Get collection sites resouces.
   *
   * Mettre une descrption
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerGetAllSites$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllSites(params?: {
  },
  context?: HttpContext

): Observable<Array<AdminSitesDto>> {

    return this.adminControllerGetAllSites$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<AdminSitesDto>>) => r.body as Array<AdminSitesDto>)
    );
  }

  /**
   * Path part for operation adminControllerToggleSiteStatus
   */
  static readonly AdminControllerToggleSiteStatusPath = '/api/admin/sites/{id}';

  /**
   * Toggle site status.
   *
   * Mettre une descfitpion
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerToggleSiteStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleSiteStatus$Response(params: {

    /**
     * id of site
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UpdateResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerToggleSiteStatusPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UpdateResponse>;
      })
    );
  }

  /**
   * Toggle site status.
   *
   * Mettre une descfitpion
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerToggleSiteStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleSiteStatus(params: {

    /**
     * id of site
     */
    id: number;
  },
  context?: HttpContext

): Observable<UpdateResponse> {

    return this.adminControllerToggleSiteStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<UpdateResponse>) => r.body as UpdateResponse)
    );
  }

  /**
   * Path part for operation adminControllerGetAllRoutes
   */
  static readonly AdminControllerGetAllRoutesPath = '/api/admin/routes';

  /**
   * Get collection routes resouces.
   *
   * Mettre une descrption
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerGetAllRoutes()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllRoutes$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<AdminRoutesDto>>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerGetAllRoutesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AdminRoutesDto>>;
      })
    );
  }

  /**
   * Get collection routes resouces.
   *
   * Mettre une descrption
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerGetAllRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerGetAllRoutes(params?: {
  },
  context?: HttpContext

): Observable<Array<AdminRoutesDto>> {

    return this.adminControllerGetAllRoutes$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<AdminRoutesDto>>) => r.body as Array<AdminRoutesDto>)
    );
  }

  /**
   * Path part for operation adminControllerToggleRouteStatus
   */
  static readonly AdminControllerToggleRouteStatusPath = '/api/admin/routes/{id}';

  /**
   * Toggle route status.
   *
   * Mettre une descfitpion
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `adminControllerToggleRouteStatus()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleRouteStatus$Response(params: {

    /**
     * id of site
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UpdateResponse>> {

    const rb = new RequestBuilder(this.rootUrl, AdminService.AdminControllerToggleRouteStatusPath, 'patch');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UpdateResponse>;
      })
    );
  }

  /**
   * Toggle route status.
   *
   * Mettre une descfitpion
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `adminControllerToggleRouteStatus$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  adminControllerToggleRouteStatus(params: {

    /**
     * id of site
     */
    id: number;
  },
  context?: HttpContext

): Observable<UpdateResponse> {

    return this.adminControllerToggleRouteStatus$Response(params,context).pipe(
      map((r: StrictHttpResponse<UpdateResponse>) => r.body as UpdateResponse)
    );
  }

}
