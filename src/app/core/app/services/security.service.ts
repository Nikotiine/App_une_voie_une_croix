import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TokenDto } from '../../api/models/token-dto';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  private accessTokenValue: string = 'access_token';
  constructor(private cookieService: CookieService) {}

  public saveToken(token: TokenDto): void {
    this.cookieService.put(this.accessTokenValue, token.access_token);
  }
  public isLogged(): boolean {
    const token = this.cookieService.get(this.accessTokenValue);
    return !!token;
  }
}
