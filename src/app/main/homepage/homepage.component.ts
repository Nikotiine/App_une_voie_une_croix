import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../core/api/services/site.service';
import { SiteDto } from '../../core/api/models/site-dto';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../core/app/config/toast.config';
import { RouteDto } from '../../core/api/models/route-dto';
import { PublicService } from '../../core/api/services/public.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  public totalSite: number = 0;
  public lastSiteRegister!: SiteDto;
  public totalRoute: number = 0;
  public lastRouteRegister!: RouteDto;
  public totalUsers: number = 0;
  public loaded: boolean = false;
  constructor(
    private readonly publicService: PublicService,
    private readonly messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.publicService.publicControllerGetDataForHomePage().subscribe({
      next: data => {
        console.log(data);
        this.totalSite = data.totalSites;
        this.lastSiteRegister = data.lastSite;
        this.totalRoute = data.totalRoutes;
        this.lastRouteRegister = data.lastRoute;
        this.totalUsers = data.totalUsers;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.HOME_SUMMARY,
          detail: err.error.message,
        });
      },
      complete: () => {
        this.loaded = !this.loaded;
      },
    });
  }
}
