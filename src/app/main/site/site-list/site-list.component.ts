import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';

import { MessageService } from 'primeng/api';
import { RegionDto } from '../../../core/api/models/region-dto';
import { RegionService } from '../../../core/api/services/region.service';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent implements OnInit {
  public loading: boolean = false;
  public siteViewUrl: string = '/site/view/';
  public sites: SiteListDto[] = [];
  public filteredSites: SiteListDto[] = [];
  public regions: RegionDto[] = [];
  private toastSummary: string = 'Liste des sites';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';

  constructor(
    private readonly siteService: SiteService,
    private readonly messageService: MessageService,
    private readonly regionService: RegionService
  ) {}
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
          severity: 'error',
          summary: this.toastSummary,
          detail: this.toastDetailLoadDataError,
        });
      },
    });
    this.regionService.regionControllerGetAllRegions().subscribe({
      next: data => {
        this.regions = data;
        const genericRegion: RegionDto = {
          id: 0,
          name: 'All region',
        };
        this.regions.push(genericRegion);
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.toastSummary,
          detail: this.toastDetailLoadDataError,
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
}
