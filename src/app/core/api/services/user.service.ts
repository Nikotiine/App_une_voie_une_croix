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

import { UserProfileDto } from '../models/user-profile-dto';
import { UserRegisterDto } from '../models/user-register-dto';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation userControllerCreateUser
   */
  static readonly UserControllerCreateUserPath = '/api/user/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerCreateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreateUser$Response(params: {
    context?: HttpContext
    body: UserRegisterDto
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerCreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerCreateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreateUser(params: {
    context?: HttpContext
    body: UserRegisterDto
  }
): Observable<UserProfileDto> {

    return this.userControllerCreateUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * Path part for operation userControllerGetUser
   */
  static readonly UserControllerGetUserPath = '/api/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetUser$Response(params: {
    id: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerGetUserPath, 'get');
    if (params) {
      rb.path('id', params.id, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerGetUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetUser(params: {
    id: number;
    context?: HttpContext
  }
): Observable<UserProfileDto> {

    return this.userControllerGetUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * Path part for operation userControllerEditUser
   */
  static readonly UserControllerEditUserPath = '/api/user/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerEditUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUser$Response(params: {
    id: number;
    context?: HttpContext
    body: UserRegisterDto
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerEditUserPath, 'put');
    if (params) {
      rb.path('id', params.id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerEditUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUser(params: {
    id: number;
    context?: HttpContext
    body: UserRegisterDto
  }
): Observable<UserProfileDto> {

    return this.userControllerEditUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

}
