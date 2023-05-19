import { Component, Input, OnInit } from '@angular/core';
import { NotebookService } from '../../../core/api/services/notebook.service';
import { MessageService } from 'primeng/api';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { LanguageService } from '../../../core/app/services/language.service';

@Component({
  selector: 'app-notebook-view',
  templateUrl: './notebook-view.component.html',
  styleUrls: ['./notebook-view.component.scss'],
})
export class NotebookViewComponent implements OnInit {
  @Input() notebookId: number;
  public notebook: NotebookViewDto;
  public readonly ICON = Icons;
  constructor(
    private readonly notebookService: NotebookService,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.notebookService
      .notebookControllerGetNotebook({
        id: this.notebookId,
      })
      .subscribe({
        next: data => {
          this.notebook = data;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: this.languageService.toastTranslate(
              LanguageService.KEY_TOAST_NOTEBOOK
            ).summary,
            detail: err.error.message,
          });
        },
      });
  }
}
