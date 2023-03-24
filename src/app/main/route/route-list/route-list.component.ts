import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../core/api/services/route.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { RouteRoutingModule } from '../route-routing.module';

import { SiteDto } from '../../../core/api/models/site-dto';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  private routes: RouteListDto[] = [];
  public filteredRoutes: RouteListDto[] = [];
  public sites: SiteDto[] = [];
  public loading: boolean = true;
  public iconSite: string = Icons.SITE;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconRoute: string = Icons.ROUTE;
  public iconSector: string = Icons.SECTOR;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconExposition: string = Icons.EXPOSITION;
  public siteViewUrl: string = SiteRoutingModule.SITE_VIEW;
  public routeViewUrl: string = RouteRoutingModule.ROUTE_VIEW;
  constructor(
    private readonly routeService: RouteService,
    private readonly messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadRoutes();
    this.loadSites();
  }

  private loadRoutes() {
    this.routeService.routeControllerGetAllRoutes().subscribe({
      next: data => {
        this.routes = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.ROUTE_SUMMARY,
          detail: err.error.message,
        });
      },
      complete: () => {
        this.filteredRoutes = this.routes;
        this.loading = !this.loading;
      },
    });
  }

  private loadSites() {
    this.routeService.routeControllerGetSites().subscribe({
      next: data => {
        this.sites = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.ROUTE_SUMMARY,
          detail: err.error.message,
        });
      },
    });
  }

  public onChangeSite($event: any): void {
    if (!$event.value) {
      this.filteredRoutes = this.routes;
    } else {
      this.filteredRoutes = this.routes.filter(
        s => s.secteur.site.id === $event.value
      );
    }
  }
}
