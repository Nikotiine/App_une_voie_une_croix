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
    body: UserRegisterDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerCreateUserPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerCreateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreateUser(params: {
    body: UserRegisterDto
  },
  context?: HttpContext

): Observable<UserProfileDto> {

    return this.userControllerCreateUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * Path part for operation userControllerEditUser
   */
  static readonly UserControllerEditUserPath = '/api/user';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerEditUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerEditUser$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerEditUserPath, 'put');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserProfileDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `userControllerEditUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerEditUser(params?: {
  },
  context?: HttpContext

): Observable<UserProfileDto> {

    return this.userControllerEditUser$Response(params,context).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

}
