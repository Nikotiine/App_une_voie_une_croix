import { Component } from '@angular/core';
import { LanguageService } from './core/app/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app_une_voie_une_croix';
  constructor(private readonly languageService: LanguageService) {}
}
