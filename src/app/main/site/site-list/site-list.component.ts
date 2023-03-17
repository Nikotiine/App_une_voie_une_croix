import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';

import { MessageService } from 'primeng/api';

import { RegionService } from '../../../core/api/services/region.service';

import { SiteRoutingModule } from '../site-routing.module';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RegionDto } from '../../../core/api/models/region-dto';

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
  public regions: RegionDto[] = [];
  public genericRegionName: string = 'Toutes les regions';
  public iconRouteNumber: string = Icons.ROUTE_NUMBER;
  public iconMinLevel: string = Icons.MIN_LEVEL;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconExposition: string = Icons.EXPOSITION;
  public iconDepartment: string = Icons.DEPARTMENT;
  public iconApproachTime: string = Icons.APPROACH_TIME;
  public iconSite: string = Icons.SITE;

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
        console.log(data);
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

  /**
   * Filtre les sites par rapport a leur region
   * @param id de la region
   */
  public filterWithRegion(id: string): void {
    if (String(id) !== '0') {
      this.filteredSites = this.sites.filter(s => String(s.region.id) === id);
    } else {
      this.filteredSites = this.sites;
    }
  }

  /**
   * Ajoute une region generique qui permet de selectioner tous les site de toutes les regions
   * @private
   */
  private addGenericRegion() {
    const genericRegion: RegionDto = {
      id: 0,
      name: this.genericRegionName,
    };
    this.regions.push(genericRegion);
  }
}
