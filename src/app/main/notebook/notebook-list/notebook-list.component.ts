import { Component, Input, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { NotebookService } from '../../../core/api/services/notebook.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { LanguageService } from '../../../core/app/services/language.service';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.scss'],
})
export class NotebookListComponent implements OnInit {
  @Input() fullView: boolean = true;
  public notebooks: NotebookViewDto[] = [];
  public loading: boolean = true;
  public sidebarVisible: boolean = false;
  public readonly ICON = Icons;
  public notebookId: number = 0;

  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly notebookService: NotebookService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly languageService: LanguageService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les croix de l'utilisateur
   * @private
   */
  private loadData(): void {
    this.notebookService
      .notebookControllerGetNotebooks({
        id: this.userProfileService.getUserProfile().id,
      })
      .subscribe({
        next: data => {
          this.notebooks = data;
          this.loading = false;
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

  /**
   * Affiche le detail de la croix a la selection de la ligne du tableau
   * @param event
   */
  public onRowSelect(event: any): void {
    this.notebookId = event.data.id;
    this.sidebarVisible = !this.sidebarVisible;
  }

  /**
   * Decoche la voie et la supprime en bdd
   * @param id
   */
  public uncheckRoute(id: number): void {
    this.confirmationService.confirm({
      message: this.languageService.toastTranslate(
        LanguageService.KEY_TOAST_NOTEBOOK
      ).unCheckRoute,
      header: this.languageService.toastTranslate(
        LanguageService.KEY_TOAST_NOTEBOOK
      ).summary,
      accept: () => {
        this.notebookService
          .notebookControllerDeleteNotebook({
            id: id,
          })
          .subscribe({
            next: res => {
              if (res.isDeleted) {
                this.messageService.add({
                  severity: ToastConfig.TYPE_SUCCESS,
                  summary: this.languageService.toastTranslate(
                    LanguageService.KEY_TOAST_NOTEBOOK
                  ).summary,
                  detail: this.languageService.toastTranslate(
                    LanguageService.KEY_TOAST_NOTEBOOK
                  ).unCheckedRoute,
                });
                this.loading = true;
                this.loadData();
              } else {
                this.messageService.add({
                  severity: ToastConfig.TYPE_ERROR,
                  summary: this.languageService.toastTranslate(
                    LanguageService.KEY_TOAST_NOTEBOOK
                  ).summary,
                  detail: this.languageService.toastTranslate('deleteError'),
                });
              }
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: this.languageService.toastTranslate('cancelAction'),
        });
      },
    });
  }
}
