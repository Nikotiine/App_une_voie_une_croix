import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SectorDto } from '../../../core/api/models/sector-dto';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';

@Component({
  selector: 'app-notebook-form',
  templateUrl: './notebook-form.component.html',
  styleUrls: ['./notebook-form.component.scss'],
})
export class NotebookFormComponent implements OnInit {
  public sites: SiteListDto[] = [];
  public form: FormGroup;
  public sectors: SectorDto[] = [];
  public routes: RouteViewDto[] = [];
  realisationTypes: any = [
    { name: 'A Vue', value: 1 },
    { name: 'Flash', value: 2 },
    { name: 'Travail', value: 3 },
  ];

  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly fb: FormBuilder
  ) {
    this.form = this.fb.group({
      site: [0, Validators.required],
      sector: [0],
      commentary: [''],
      routes: [0, [Validators.required, Validators.min(1)]],
      trials: [1],
      realisationType: [1],
    });
  }
  ngOnInit(): void {
    this.loadData();
    this.watchTrial();
  }

  private loadData() {
    this.siteService.siteControllerGetAllSites().subscribe({
      next: data => {
        console.log(data);
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
    console.log('submit');
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

  private watchTrial(): void {
    this.form.controls['trials'].valueChanges.subscribe({
      next: value => {
        if (value > 1) {
          this.form.controls['realisationType'].setValue(3);
        }
      },
    });
    this.form.controls['realisationType'].valueChanges.subscribe({
      next: value => {
        if (value === 1 || value === 2) {
          this.form.controls['trials'].setValue(1);
        }
      },
    });
  }
}
