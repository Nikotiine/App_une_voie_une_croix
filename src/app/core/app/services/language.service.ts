import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly keyFr = 'fr';
  private readonly keyEn = 'en';
  private readonly translateKey = 'language';
  private keyLanguage: string = 'userLanguage';
  private supportedLanguages: string[] = [this.keyFr, this.keyEn];
  private userLanguage: string;
  private french: string = '';
  private english: string = '';

  constructor(
    private readonly cookieService: CookieService,
    private readonly translateService: TranslateService
  ) {
    this.initLanguage();
    this.translateService.addLangs(this.supportedLanguages);
    this.useLanguage();
    this.initLabel();
  }
  public initLanguage(): void {
    const userLanguage: string = this.cookieService.get(this.keyLanguage);
    if (userLanguage) {
      this.userLanguage = userLanguage;
    } else {
      const navigatorLanguage: string = navigator.language.split('-')[0];
      this.userLanguage = this.keyFr;
      if (this.supportedLanguages.includes(navigatorLanguage)) {
        this.userLanguage = navigatorLanguage;
        this.cookieService.put(this.keyLanguage, navigatorLanguage);
      }
    }
  }

  private useLanguage(): void {
    this.translateService.use(this.userLanguage);
  }
  public setLanguage(language: string): void {
    this.userLanguage = language;
    this.cookieService.put(this.keyLanguage, language);
    this.initLabel();
    this.useLanguage();
  }
  get language(): string {
    return this.userLanguage;
  }

  public switchLanguage(): void {
    const language = this.language === this.keyFr ? this.keyEn : this.keyFr;
    this.setLanguage(language);
    this.initLabel();
  }
  get switchTo(): string {
    return this.userLanguage === this.keyFr ? this.english : this.french;
  }

  /*get availableLanguages(): string[] {
    return this.supportedLanguages;
  }*/

  public getTranslation(translate: string): Observable<any> {
    return this.translateService.get(translate);
  }

  private initLabel(): void {
    this.getTranslation(this.translateKey).subscribe({
      next: translate => {
        this.french = translate.french;
        this.english = translate.english;
      },
    });
  }
}
