import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';

import { MessageService } from 'primeng/api';

import { RegionService } from '../../../core/api/services/region.service';
import { RegionListDto } from '../../../core/api/models/region-list-dto';
import { SiteRoutingModule } from '../site-routing.module';
import { ToastConfig } from '../../../core/app/config/toast.config';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent implements OnInit {
  public loading: boolean = true;
  public siteViewUrl: string;
  public sites: SiteListDto[] = [];
  public filteredSites: SiteListDto[] = [];
  public regions: RegionListDto[] = [];
  public genericRegionName: string = 'Toutes les regions';

  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly regionService: RegionService
  ) {
    this.siteViewUrl = SiteRoutingModule.SITE_VIEW;
  }
  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.siteService.siteControllerGetAllSites().subscribe({
      next: data => {
        this.sites = data;
        this.filteredSites = this.sites;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.SITE_SUMMARY,
          detail: err.error.message,
        });
      },
      complete: () => {
        this.loading = !this.loading;
      },
    });
    this.regionService.regionControllerGetAllRegions().subscribe({
      next: data => {
        this.regions = data;
        this.addGenericRegion();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.SITE_SUMMARY,
          detail: err.error.message,
        });
      },
    });
  }

  public filterWithRegion(id: string): void {
    if (String(id) !== '0') {
      this.filteredSites = this.sites.filter(s => String(s.region.id) === id);
    } else {
      this.filteredSites = this.sites;
    }
  }

  private addGenericRegion() {
    const genericRegion: RegionListDto = {
      id: 0,
      name: this.genericRegionName,
    };
    this.regions.push(genericRegion);
  }
}
