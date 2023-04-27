import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { NotebookService } from '../../../core/api/services/notebook.service';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.scss'],
})
export class NotebookListComponent implements OnInit {
  public notebooks: NotebookViewDto[] = [];
  public loading: boolean = false;
  iconRoute: string = Icons.INFORMATION;
  iconTrials: string = Icons.LIST;
  iconMinLevel: string = Icons.LEVEL;
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly notebookService: NotebookService,
    private readonly messageService: MessageService
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
          console.log(data);
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
}
