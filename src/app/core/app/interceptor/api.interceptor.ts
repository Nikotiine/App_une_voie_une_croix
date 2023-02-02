import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private readonly securityService: SecurityService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token: string | undefined = this.securityService.getToken();

    if (access_token) {
      let requestClone = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' + access_token),
      });
      return next.handle(requestClone);
    }
    return next.handle(request);
  }
}
export const ApiInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
};
