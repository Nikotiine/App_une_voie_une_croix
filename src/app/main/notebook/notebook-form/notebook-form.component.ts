import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorDto } from '../../../core/api/models/sector-dto';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';
import {
  AchievementType,
  AchievementTypes,
} from '../../../core/app/models/AchievementTypes.model';
import {
  AppNotebook,
  AppNotebookService,
} from '../../../core/app/services/app-notebook.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';

@Component({
  selector: 'app-notebook-form',
  templateUrl: './notebook-form.component.html',
  styleUrls: ['./notebook-form.component.scss'],
})
export class NotebookFormComponent implements OnInit {
  public sites: SiteListDto[] = [];
  public form: FormGroup;
  public sectors: SectorDto[] = [];
  public routes: RouteListDto[] = [];
  public achievementTypes: AchievementTypes[] = [];
  public title: string = 'Nouvelle croix';

  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly appNotebookService: AppNotebookService
  ) {
    this.form = this.fb.group({
      site: [0, Validators.required],
      sector: [0],
      commentary: [''],
      routes: [0, [Validators.required, Validators.min(1)]],
      trials: [1],
      achievement: [1],
      succeedAt: [new Date()],
      ranking: [null],
    });
    this.achievementTypes = this.appNotebookService.achievementTypes();
  }
  public ngOnInit(): void {
    this.loadData();
    this.watchTrial();
  }

  private loadData(): void {
    this.siteService.siteControllerGetAllSites().subscribe({
      next: data => {
        this.sites = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.NOTEBOOK_SUMMARY,
          detail: err.err.message,
        });
      },
    });
  }

  public submit(): void {
    const notebook: AppNotebook = {
      trials: this.form.controls['trials'].value,
      route: this.route,
      commentary: this.form.controls['commentary'].value,
      succeedAt: this.form.controls['succeedAt'].value,
      achievementType: this.achievement,
      ranking: this.form.controls['ranking'].value,
    };
    this.appNotebookService.newNotebook(notebook).subscribe({
      next: res => {
        this.messageService.add({
          severity: ToastConfig.TYPE_SUCCESS,
          summary: ToastConfig.NOTEBOOK_SUMMARY,
          detail: ToastConfig.NOTEBOOK_CREATE,
        });
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

  private get achievement(): AchievementType {
    const achievement = this.achievementTypes.find(
      a => a.value === this.form.controls['achievement'].value
    );
    return achievement.name;
  }
  public onChangeSite(id: number): void {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: data => {
          this.sectors = data.sectors;
          this.routes = data.routes;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.NOTEBOOK_SUMMARY,
            detail: err.err.message,
          });
        },
      });
  }
  private get route(): RouteListDto {
    return this.routes.find(
      route => route.id === this.form.controls['routes'].value
    );
  }

  private watchTrial(): void {
    this.form.controls['trials'].valueChanges.subscribe({
      next: value => {
        if (value > 1) {
          this.form.controls['achievement'].setValue(3);
        }
      },
    });
    this.form.controls['achievement'].valueChanges.subscribe({
      next: value => {
        if (value === 1 || value === 2) {
          this.form.controls['trials'].setValue(1);
        }
      },
    });
  }
}
