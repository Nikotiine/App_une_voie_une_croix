import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TokenDto } from '../../api/models/token-dto';
import { AuthService } from '../../api/services/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthRoutingModule } from '../../../main/auth/auth-routing.module';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private accessTokenValue: string = 'access_token';
  authenticated$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private readonly cookieService: CookieService,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public saveToken(token: TokenDto): void {
    this.cookieService.put(this.accessTokenValue, token.access_token);
    this.authenticated$.next(true);
  }
  public logout(): void {
    this.cookieService.remove(this.accessTokenValue);
    this.authenticated$.next(false);
  }

  public logoutByGuard(): Promise<boolean> {
    this.logout();
    return this.router.navigate([AuthRoutingModule.LOGIN]);
  }
  public isLogged(): boolean {
    const access_token = this.getToken();
    this.authenticated$.next(!!access_token);
    return !!access_token;
  }
  public getToken(): string | undefined {
    return this.cookieService.get(this.accessTokenValue);
  }
}
