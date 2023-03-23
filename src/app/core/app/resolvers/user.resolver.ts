import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

import { AuthService } from '../../api/services/auth.service';
import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class UserResolver implements Resolve<UserProfileDto> {
  constructor(
    private readonly securityService: SecurityService,
    private readonly authService: AuthService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<UserProfileDto | null> {
    if (this.securityService.isLogged()) {
      return this.authService.authControllerMe();
    }
    return null;
  }
}
