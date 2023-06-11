import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: 'root',
})
export class AppMessageService {
  //TODO : implmenter ce service dans tout les composant qui se servent de MessageService
  constructor(
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {}

  public addSuccess(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'success',
      summary: summary,
      detail: detail,
    });
  }

  public addError(summary: string, detail: string): void {
    this.messageService.add({
      severity: 'error',
      summary: summary,
      detail: detail,
    });
  }
}
