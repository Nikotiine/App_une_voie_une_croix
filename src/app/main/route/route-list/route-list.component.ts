import { Component, OnInit } from '@angular/core';

import { RouteService } from '../../../core/api/services/route.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { RouteRoutingModule } from '../route-routing.module';

import { SiteDto } from '../../../core/api/models/site-dto';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { AppNotebookService } from '../../../core/app/services/app-notebook.service';
import { mergeMap } from 'rxjs';

import { SecurityService } from '../../../core/app/services/security.service';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';

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
  public isLogged: boolean;
  private notebooks: NotebookViewDto[] = [];
  public selectedRoute: RouteListDto;
  public visible: boolean = false;
  constructor(
    private readonly routeService: RouteService,
    private readonly messageService: MessageService,
    private readonly appNotebookService: AppNotebookService,
    private readonly securityService: SecurityService
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.routeService
      .routeControllerGetSites()
      .pipe(
        mergeMap(sites => {
          this.sites = sites;
          return this.routeService.routeControllerGetAllRoutes();
        })
      )
      .subscribe({
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
    if (this.isLogged) {
      this.loadNoteBook();
    }
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

  private loadNoteBook(): void {
    this.appNotebookService.getMyNotebook().subscribe({
      next: data => {
        this.notebooks = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.NOTEBOOK_SUMMARY,
          detail: ToastConfig.NOTEBOOK_ALREADY_CHECKED,
        });
      },
    });
  }
  public isChecked(id: number): boolean {
    return !!this.notebooks.find(n => n.route.id === id);
  }
  public showDialog(id: number): void {
    this.selectedRoute = this.routes.find(route => route.id === id);
    this.visible = !this.visible;
  }
  public alreadyChecked(): void {
    this.messageService.add({
      severity: ToastConfig.TYPE_WARNING,
      summary: ToastConfig.NOTEBOOK_SUMMARY,
      detail: ToastConfig.NOTEBOOK_ALREADY_CHECKED,
    });
  }

  public closeDialog(): void {
    this.visible = !this.visible;
  }
  public reloadData(): void {
    this.loading = !this.loading;
    this.loadData();
  }
}
