import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../core/app/config/toast.config';

import { PublicService } from '../../core/api/services/public.service';
import { SiteListDto } from '../../core/api/models/site-list-dto';
import { RouteListDto } from '../../core/api/models/route-list-dto';

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
        this.lastFiveSite = data.lastFiveSite;
        this.totalRoute = data.totalRoutes;
        this.lastFiveRoute = data.lastFiveRoute;
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
