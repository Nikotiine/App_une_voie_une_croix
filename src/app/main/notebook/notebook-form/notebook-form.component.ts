import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorDto } from '../../../core/api/models/sector-dto';
import {
  AchievementType,
  AchievementTypes,
} from '../../../core/app/models/AchievementTypes.model';
import {
  AppNotebook,
  AppNotebookService,
} from '../../../core/app/services/app-notebook.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../core/app/services/language.service';
import { forkJoin } from 'rxjs';
import { NotebookRoutingModule } from '../notebook-routing.module';

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
  public isNew: boolean;
  private readonly notebookId: number;
  private translate: any;

  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder,
    private readonly appNotebookService: AppNotebookService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly languageService: LanguageService,
    private readonly router: Router
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
    this.notebookId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.isNew = !!this.notebookId;
  }
  public ngOnInit(): void {
    this.loadData();
    this.watchTrial();
  }

  /**
   * Charge les données des notebook ainsi que les traductions des toast et confirm dialog
   * @private
   */
  private loadData(): void {
    forkJoin([
      this.siteService.siteControllerGetAllSites(),
      this.languageService.getTranslation('notebook'),
    ]).subscribe({
      next: data => {
        this.sites = data[0];
        this.translate = data[1];
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
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).create,
        });
        this.router.navigate(['/' + NotebookRoutingModule.NOTEBOOK_LIST]);
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
            summary: this.languageService.toastTranslate(
              LanguageService.KEY_TOAST_NOTEBOOK
            ).summary,
            detail: err.error.message,
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
