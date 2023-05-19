import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../core/api/services/route.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';
import { SiteDto } from '../../../core/api/models/site-dto';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { forkJoin } from 'rxjs';
import { TableRouteOptions } from '../../../core/app/models/TableOptions.model';

@Component({
  selector: 'app-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.scss'],
})
export class RouteListComponent implements OnInit {
  private routes: RouteListDto[] = [];
  public filteredRoutes: RouteListDto[] = [];
  public sites: SiteDto[] = [];
  public tableOptions: TableRouteOptions;
  constructor(
    private readonly routeService: RouteService,
    private readonly messageService: MessageService
  ) {
    this.tableOptions = {
      forAdmin: false,
      fullView: true,
    };
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    forkJoin([
      this.routeService.routeControllerGetSites(),
      this.routeService.routeControllerGetAllRoutes(),
    ]).subscribe({
      next: data => {
        this.sites = data[0];
        this.routes = data[1];
        this.filteredRoutes = this.routes;
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

  /**
   * Filtre les voies par rapport au site selectionner
   * si pas de choix affiche toutes les voies disponibles
   * @param $event
   */
  public onChangeSite($event: any): void {
    if (!$event.value) {
      this.filteredRoutes = this.routes;
    } else {
      this.filteredRoutes = this.routes.filter(
        s => s.sector.site.id === $event.value
      );
    }
  }
}
