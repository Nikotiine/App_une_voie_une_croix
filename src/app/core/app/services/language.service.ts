import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  static KEY_TOAST_SITE: string = 'site';
  static KEY_TOAST_ROUTE: string = 'route';
  static KEY_TOAST_NOTEBOOK: string = 'notebook';
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

  /**
   * Intialise le language , si cookie deja present reprend sa valeur, sinon en fonction du navigateur
   * si la language du navigateur n'est pas suppoorte met la langue fr par defaut
   * Stocke la langue choisi dans un cookie
   */
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

  /**
   * Active le language trouve dans le cookie
   */
  private useLanguage(): void {
    this.translateService.use(this.userLanguage);
  }

  /**
   * Fonction pour mettre a jour la langue choisi , met a jour le cookie de langue utilisateur
   * @param language string
   */
  public setLanguage(language: string): void {
    this.userLanguage = language;
    this.cookieService.put(this.keyLanguage, language);
    this.initLabel();
    this.useLanguage();
  }

  /**
   * Permet de switcher entre les 2 langues supporté
   */
  public switchLanguage(): void {
    const language = this.userLanguage === this.keyFr ? this.keyEn : this.keyFr;
    this.setLanguage(language);
    this.initLabel();
  }

  /**
   * Retourne la langue qui sera defini en cas de switch
   */
  get switchTo(): string {
    return this.userLanguage === this.keyFr ? this.english : this.french;
  }

  /**
   * Renvoie la traduction sous forme d'observable
   * @param translate
   */
  public getTranslation(translate: string): Observable<any> {
    return this.translateService.get(translate);
  }

  /**
   * Initialiser les label de langue pour le dialogue en cas de changement de langue
   *
   */
  private initLabel(): void {
    this.getTranslation(this.translateKey).subscribe({
      next: translate => {
        this.french = translate.french;
        this.english = translate.english;
      },
    });
  }

  /**
   * Permet d'observer le changement de langue
   */
  get change() {
    return this.translateService.onLangChange;
  }

  /**
   * Retroune les traduction propre au toast de messageService
   * @param key
   */
  public toastTranslate(key: string): any {
    return this.translateService.instant('toast.' + key);
  }

  /**
   * Retourne les traduction propre a module site
   * @param key
   */
  public siteTranslate(key: string): any {
    return this.translateService.instant('site.' + key);
  }
}
