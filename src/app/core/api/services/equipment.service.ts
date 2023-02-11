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

import { EquipmentDto } from '../models/equipment-dto';

@Injectable({
  providedIn: 'root',
})
export class EquipmentService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation equipmentControllerGetAllEquipments
   */
  static readonly EquipmentControllerGetAllEquipmentsPath = '/api/equipment';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `equipmentControllerGetAllEquipments()` instead.
   *
   * This method doesn't expect any request body.
   */
  equipmentControllerGetAllEquipments$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<EquipmentDto>>> {

    const rb = new RequestBuilder(this.rootUrl, EquipmentService.EquipmentControllerGetAllEquipmentsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<EquipmentDto>>;
      })
    );
  }

  /**
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `equipmentControllerGetAllEquipments$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  equipmentControllerGetAllEquipments(params?: {
    context?: HttpContext
  }
): Observable<Array<EquipmentDto>> {

    return this.equipmentControllerGetAllEquipments$Response(params).pipe(
      map((r: StrictHttpResponse<Array<EquipmentDto>>) => r.body as Array<EquipmentDto>)
    );
  }

}
