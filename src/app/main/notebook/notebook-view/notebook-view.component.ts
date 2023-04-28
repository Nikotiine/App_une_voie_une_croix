import { Component, Input, OnInit } from '@angular/core';
import { NotebookService } from '../../../core/api/services/notebook.service';
import { MessageService } from 'primeng/api';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { Icons } from '../../../core/app/enum/Icons.enum';

@Component({
  selector: 'app-notebook-view',
  templateUrl: './notebook-view.component.html',
  styleUrls: ['./notebook-view.component.scss'],
})
export class NotebookViewComponent implements OnInit {
  @Input() notebookId: number;
  public notebook: NotebookViewDto;
  public iconRoute: string = Icons.ROUTE;
  public iconLevel: string = Icons.LEVEL;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconEngagement: string = Icons.ENGAGMENT;
  public iconQuickdraw: string = Icons.QUICK_DRAW;
  constructor(
    private readonly notebookService: NotebookService,
    private readonly messageService: MessageService
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
          console.log(data);
          this.notebook = data;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.NOTEBOOK_SUMMARY,
            detail: err.erroe.message,
          });
        },
      });
  }
}
