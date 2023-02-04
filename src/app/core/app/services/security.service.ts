import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TokenDto } from '../../api/models/token-dto';
import { UserService } from '../../api/services/user.service';
import { AuthService } from '../../api/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private accessTokenValue: string = 'access_token';
  constructor(
    private readonly cookieService: CookieService,
    private readonly authService: AuthService
  ) {}

  public saveToken(token: TokenDto): void {
    this.cookieService.put(this.accessTokenValue, token.access_token);
  }
  public logout(): void {
    this.cookieService.remove(this.accessTokenValue);
  }
  public isLogged(): any {
    const access_token = this.getToken();
    return !!access_token;
  }
  public getToken(): string | undefined {
    return this.cookieService.get(this.accessTokenValue);
  }
}
