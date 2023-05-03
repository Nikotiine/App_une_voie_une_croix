import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';
import { AuthService } from '../../api/services/auth.service';
import { AuthRoutingModule } from '../../../main/auth/auth-routing.module';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly securityService: SecurityService,
    private router: Router,
    private readonly authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLogged = this.securityService.isLogged();
    console.log(isLogged);
    if (!isLogged) {
      return this.router.navigate([AuthRoutingModule.LOGIN]);
    } else {
      return this.authService.authControllerMe().pipe(
        catchError(e => {
          return this.securityService.logoutByGuard();
        }),
        map(data => !!data)
      );
    }
  }
}
