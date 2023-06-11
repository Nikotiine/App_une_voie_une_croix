import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

import { AuthService } from '../../api/services/auth.service';
import { UserProfileDto } from '../../api/models/user-profile-dto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserProfileDto | boolean> {
  constructor(
    private readonly securityService: SecurityService,
    private readonly authService: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfileDto | null | boolean> {
    if (this.securityService.isLogged()) {
      return this.authService.authControllerMe().pipe(
        catchError(e => {
          return this.securityService.logoutByResolver();
        }),
        map(res => res)
      );
    }
    return null;
  }
}
