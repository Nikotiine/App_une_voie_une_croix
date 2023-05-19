import { Component, Input, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { NotebookService } from '../../../core/api/services/notebook.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { ConfirmDialog } from 'primeng/confirmdialog';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.scss'],
})
export class NotebookListComponent implements OnInit {
  @Input() fullView: boolean = true;
  public notebooks: NotebookViewDto[] = [];
  public loading: boolean = false;
  public sidebarVisible: boolean = false;
  public readonly ICON = Icons;
  public notebookId: number = 0;
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly notebookService: NotebookService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.notebookService
      .notebookControllerGetNotebooks({
        id: this.userProfileService.getUserProfile().id,
      })
      .subscribe({
        next: data => {
          this.notebooks = data;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.NOTEBOOK_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
  public onRowSelect(event: any): void {
    this.notebookId = event.data.id;
    this.sidebarVisible = !this.sidebarVisible;
  }

  public uncheckRoute(id: number): void {
    this.confirmationService.confirm({
      message: 'Dechocher la voie',
      header: 'Notebook service',
      accept: () => {
        console.log('accpet');
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: 'Notebook service',
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }
}
