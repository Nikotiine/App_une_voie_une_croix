import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { ApiAddressService } from '../../../core/app/services/api-address.service';
import { MessageService } from 'primeng/api';
import { Region } from '../../../core/app/models/Region';

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
  public regions: Region[] = [];
  private toastSummary: string = 'Liste des sites';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';

  constructor(
    private readonly siteService: SiteService,
    private readonly apiAddressService: ApiAddressService,
    private readonly messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.siteService.siteControllerGetAllSites().subscribe({
      next: data => {
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
    this.apiAddressService.getRegions().subscribe({
      next: data => {
        this.regions = data;
        const allRegion: Region = {
          nom: 'Toutes les regions',
          code: '0',
        };
        this.regions.push(allRegion);
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

  public loadSiteWithRegion(code: string) {
    if (code === '0') {
      this.filteredSites = this.sites;
    } else {
      this.filteredSites = this.sites.filter(s => s.region === code);
    }
  }
}
