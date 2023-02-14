import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { SiteListDto } from '../../../core/api/models/site-list-dto';
import { ApiAddressService } from '../../../core/app/services/api-address.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-site-list',
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.scss'],
})
export class SiteListComponent implements OnInit {
  public loading: boolean = false;
  public siteViewUrl: string = '/site/view/';
  public sites: SiteListDto[] = [];
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
}
