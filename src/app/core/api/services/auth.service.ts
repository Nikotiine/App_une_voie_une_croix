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

import { TokenDto } from '../models/token-dto';
import { UserCredentialsDto } from '../models/user-credentials-dto';
import { UserProfileDto } from '../models/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation authControllerLogin
   */
  static readonly AuthControllerLoginPath = '/api/auth/login';

  /**
   * login path
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerLogin()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin$Response(params: {
    context?: HttpContext
    body: UserCredentialsDto
  }
): Observable<StrictHttpResponse<TokenDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerLoginPath, 'post');
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
        return r as StrictHttpResponse<TokenDto>;
      })
    );
  }

  /**
   * login path
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `authControllerLogin$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  authControllerLogin(params: {
    context?: HttpContext
    body: UserCredentialsDto
  }
): Observable<TokenDto> {

    return this.authControllerLogin$Response(params).pipe(
      map((r: StrictHttpResponse<TokenDto>) => r.body as TokenDto)
    );
  }

  /**
   * Path part for operation authControllerMe
   */
  static readonly AuthControllerMePath = '/api/auth/me';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authControllerMe()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerMe$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserProfileDto>> {

    const rb = new RequestBuilder(this.rootUrl, AuthService.AuthControllerMePath, 'get');
    if (params) {
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
   * To access the full response (for headers, for example), `authControllerMe$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authControllerMe(params?: {
    context?: HttpContext
  }
): Observable<UserProfileDto> {

    return this.authControllerMe$Response(params).pipe(
      map((r: StrictHttpResponse<UserProfileDto>) => r.body as UserProfileDto)
    );
  }

}
