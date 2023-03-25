import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserProfileService } from '../services/user-profile.service';
import { MainRoutingModule } from '../../../main/main-routing.module';
import { MessageService } from 'primeng/api';
import { AppRoutingModule } from '../../../app-routing.module';
import { UserService } from '../../api/services/user.service';
import { AuthService } from '../../api/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private userProfileService: UserProfileService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (!this.userProfileService.getUserProfile()) {
      // return this.userProfileService.getUSerProfile().pipe(
      //TODO REFACTO CA
      return this.authService.authControllerMe().pipe(
        map(u => {
          if (u.role === 'admin') {
            return true;
          }
          this.router.navigate([AppRoutingModule.UNAUTHORIZED]);
          return false;
        })
      );
    }
    const isAdmin = this.userProfileService.isAdmin();
    return isAdmin
      ? true
      : this.router.navigate([AppRoutingModule.UNAUTHORIZED]);
  }
}
