import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../core/app/config/toast.config';

import { PublicService } from '../../core/api/services/public.service';
import { SiteListDto } from '../../core/api/models/site-list-dto';
import { RouteListDto } from '../../core/api/models/route-list-dto';
import { TableSiteOptions } from '../../core/app/models/TableOptions.model';
import { LanguageService } from '../../core/app/services/language.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public totalSite: number = 0;
  public lastFiveSite: SiteListDto[] = [];
  public totalRoute: number = 0;
  public lastFiveRoute: RouteListDto[] = [];
  public totalUsers: number = 0;
  public loaded: boolean = false;
  public lastFiveCheckedRoute: RouteListDto[] = [];
  public sitesOptions: TableSiteOptions;
  constructor(
    private readonly publicService: PublicService,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {
    this.sitesOptions = {
      loading: true,
      forAdmin: false,
      fullView: false,
    };
  }
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * Charge les donnee publique de la homepage
   * @private
   */
  private loadData(): void {
    this.publicService.publicControllerGetDataForHomePage().subscribe({
      next: data => {
        this.lastFiveCheckedRoute = data.lastFiveCheckedRoutes;
        this.totalSite = data.totalSites;
        this.lastFiveSite = data.lastFiveSite;
        this.totalRoute = data.totalRoutes;
        this.lastFiveRoute = data.lastFiveRoute;
        this.totalUsers = data.totalUsers;
        this.loaded = !this.loaded;
        this.sitesOptions.loading = false;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: this.languageService.toastTranslate('homepage').summary,
          detail: err.error.message,
        });
      },
    });
  }
}
