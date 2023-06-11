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

import { DeleteResponse } from '../models/delete-response';
import { NotebookCreateDto } from '../models/notebook-create-dto';
import { NotebookViewDto } from '../models/notebook-view-dto';
import { RatingRouteDto } from '../models/rating-route-dto';

@Injectable({
  providedIn: 'root',
})
export class NotebookService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation notebookControllerCreateNewNotebook
   */
  static readonly NotebookControllerCreateNewNotebookPath = '/api/notebook';

  /**
   * Post new notebook.
   *
   * Entry point for post new user notebook
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerCreateNewNotebook()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notebookControllerCreateNewNotebook$Response(params: {

    /**
     * The Description for the Post Body. Please look into the DTO NotebookCreateDto
     */
    body: NotebookCreateDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<NotebookViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerCreateNewNotebookPath, 'post');
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
        return r as StrictHttpResponse<NotebookViewDto>;
      })
    );
  }

  /**
   * Post new notebook.
   *
   * Entry point for post new user notebook
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerCreateNewNotebook$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  notebookControllerCreateNewNotebook(params: {

    /**
     * The Description for the Post Body. Please look into the DTO NotebookCreateDto
     */
    body: NotebookCreateDto
  },
  context?: HttpContext

): Observable<NotebookViewDto> {

    return this.notebookControllerCreateNewNotebook$Response(params,context).pipe(
      map((r: StrictHttpResponse<NotebookViewDto>) => r.body as NotebookViewDto)
    );
  }

  /**
   * Path part for operation notebookControllerGetNotebooks
   */
  static readonly NotebookControllerGetNotebooksPath = '/api/notebook/user/{id}';

  /**
   * Get notebooks.
   *
   * Return all active notebook filtered by user.id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerGetNotebooks()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetNotebooks$Response(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<NotebookViewDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerGetNotebooksPath, 'get');
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
        return r as StrictHttpResponse<Array<NotebookViewDto>>;
      })
    );
  }

  /**
   * Get notebooks.
   *
   * Return all active notebook filtered by user.id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerGetNotebooks$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetNotebooks(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<Array<NotebookViewDto>> {

    return this.notebookControllerGetNotebooks$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<NotebookViewDto>>) => r.body as Array<NotebookViewDto>)
    );
  }

  /**
   * Path part for operation notebookControllerGetNotebook
   */
  static readonly NotebookControllerGetNotebookPath = '/api/notebook/view/{id}';

  /**
   * Get notebooks.
   *
   * Return  notebook filtered by .id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerGetNotebook()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetNotebook$Response(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<NotebookViewDto>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerGetNotebookPath, 'get');
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
        return r as StrictHttpResponse<NotebookViewDto>;
      })
    );
  }

  /**
   * Get notebooks.
   *
   * Return  notebook filtered by .id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerGetNotebook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetNotebook(params: {

    /**
     * id of user
     */
    id: number;
  },
  context?: HttpContext

): Observable<NotebookViewDto> {

    return this.notebookControllerGetNotebook$Response(params,context).pipe(
      map((r: StrictHttpResponse<NotebookViewDto>) => r.body as NotebookViewDto)
    );
  }

  /**
   * Path part for operation notebookControllerGetAllRatingsRoutes
   */
  static readonly NotebookControllerGetAllRatingsRoutesPath = '/api/notebook/rating/all';

  /**
   * Get rating all route.
   *
   * Return  all rating of notebook
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerGetAllRatingsRoutes()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsRoutes$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RatingRouteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerGetAllRatingsRoutesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<RatingRouteDto>>;
      })
    );
  }

  /**
   * Get rating all route.
   *
   * Return  all rating of notebook
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerGetAllRatingsRoutes$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsRoutes(params?: {
  },
  context?: HttpContext

): Observable<Array<RatingRouteDto>> {

    return this.notebookControllerGetAllRatingsRoutes$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RatingRouteDto>>) => r.body as Array<RatingRouteDto>)
    );
  }

  /**
   * Path part for operation notebookControllerGetAllRatingsRoutesBySite
   */
  static readonly NotebookControllerGetAllRatingsRoutesBySitePath = '/api/notebook/rating/site/{id}';

  /**
   * Get rating all route.
   *
   * Return  all rating of notebook
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerGetAllRatingsRoutesBySite()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsRoutesBySite$Response(params: {

    /**
     * id of the site
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RatingRouteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerGetAllRatingsRoutesBySitePath, 'get');
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
        return r as StrictHttpResponse<Array<RatingRouteDto>>;
      })
    );
  }

  /**
   * Get rating all route.
   *
   * Return  all rating of notebook
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerGetAllRatingsRoutesBySite$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsRoutesBySite(params: {

    /**
     * id of the site
     */
    id: number;
  },
  context?: HttpContext

): Observable<Array<RatingRouteDto>> {

    return this.notebookControllerGetAllRatingsRoutesBySite$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RatingRouteDto>>) => r.body as Array<RatingRouteDto>)
    );
  }

  /**
   * Path part for operation notebookControllerGetAllRatingsByRoute
   */
  static readonly NotebookControllerGetAllRatingsByRoutePath = '/api/notebook/rating/route/{id}';

  /**
   * Get rating by route.
   *
   * Return  all rating of notebook
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerGetAllRatingsByRoute()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsByRoute$Response(params: {

    /**
     * id of the route
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<RatingRouteDto>>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerGetAllRatingsByRoutePath, 'get');
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
        return r as StrictHttpResponse<Array<RatingRouteDto>>;
      })
    );
  }

  /**
   * Get rating by route.
   *
   * Return  all rating of notebook
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerGetAllRatingsByRoute$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerGetAllRatingsByRoute(params: {

    /**
     * id of the route
     */
    id: number;
  },
  context?: HttpContext

): Observable<Array<RatingRouteDto>> {

    return this.notebookControllerGetAllRatingsByRoute$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<RatingRouteDto>>) => r.body as Array<RatingRouteDto>)
    );
  }

  /**
   * Path part for operation notebookControllerDeleteNotebook
   */
  static readonly NotebookControllerDeleteNotebookPath = '/api/notebook/{id}';

  /**
   * Delete notbook.
   *
   * Entry point to delete a notebook by id
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `notebookControllerDeleteNotebook()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerDeleteNotebook$Response(params: {

    /**
     * id of user notebook
     */
    id: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<DeleteResponse>> {

    const rb = new RequestBuilder(this.rootUrl, NotebookService.NotebookControllerDeleteNotebookPath, 'delete');
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
        return r as StrictHttpResponse<DeleteResponse>;
      })
    );
  }

  /**
   * Delete notbook.
   *
   * Entry point to delete a notebook by id
   *
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `notebookControllerDeleteNotebook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  notebookControllerDeleteNotebook(params: {

    /**
     * id of user notebook
     */
    id: number;
  },
  context?: HttpContext

): Observable<DeleteResponse> {

    return this.notebookControllerDeleteNotebook$Response(params,context).pipe(
      map((r: StrictHttpResponse<DeleteResponse>) => r.body as DeleteResponse)
    );
  }

}
