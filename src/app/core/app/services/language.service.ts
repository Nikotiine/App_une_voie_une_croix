import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private keyLanguage: string = 'userLanguage';
  private supportedLanguages: string[] = ['en', 'fr'];
  private userLanguage: string;
  constructor(
    private readonly cookieService: CookieService,
    private readonly translateService: TranslateService
  ) {
    this.initLanguage();
    this.translateService.use(this.userLanguage);
  }
  public initLanguage(): void {
    const userLanguage: string = this.cookieService.get(this.keyLanguage);
    if (userLanguage) {
      this.userLanguage = userLanguage;
    } else {
      const navigatorLanguage: string = navigator.language.split('-')[0];
      this.userLanguage = 'fr';
      if (this.supportedLanguages.includes(navigatorLanguage)) {
        this.userLanguage = navigatorLanguage;
        this.cookieService.put(this.keyLanguage, navigatorLanguage);
      }
    }
  }

  set language(language: string) {
    this.userLanguage = language;
    this.cookieService.put(this.keyLanguage, language);
  }
  get language(): string {
    return this.userLanguage;
  }

  get availableLanguages(): string[] {
    return this.supportedLanguages;
  }
}
