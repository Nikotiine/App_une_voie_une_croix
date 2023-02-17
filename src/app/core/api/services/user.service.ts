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

import { UserEditPasswordDto } from '../models/user-edit-password-dto';
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
   * Register new user.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerCreateUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreateUser$Response(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
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
   * Register new user.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerCreateUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerCreateUser(params: {
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
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
   * Get user resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerGetUser()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetUser$Response(params: {

    /**
     * id of user
     */
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
   * Get user resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerGetUser$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  userControllerGetUser(params: {

    /**
     * id of user
     */
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
   * Edit user resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerEditUser()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUser$Response(params: {

    /**
     * id of user
     */
    id: number;
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
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
   * Edit user resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerEditUser$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUser(params: {

    /**
     * id of user
     */
    id: number;
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
    body: UserRegisterDto
  }
): Observable<UserProfileDto> {

    return this.userControllerEditUser$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

  /**
   * Path part for operation userControllerEditUserPassword
   */
  static readonly UserControllerEditUserPasswordPath = '/api/user/password/{id}';

  /**
   * Edit user password resource.
   *
   * Mettre la description
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `userControllerEditUserPassword()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUserPassword$Response(params: {

    /**
     * id of user
     */
    id: number;
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
    body: UserEditPasswordDto
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, UserService.UserControllerEditUserPasswordPath, 'put');
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
   * Edit user password resource.
   *
   * Mettre la description
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `userControllerEditUserPassword$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  userControllerEditUserPassword(params: {

    /**
     * id of user
     */
    id: number;
    context?: HttpContext

    /**
     * The Description for the Post Body. Please look into the DTO UserRegisterDto
     */
    body: UserEditPasswordDto
  }
): Observable<UserProfileDto> {

    return this.userControllerEditUserPassword$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

}
