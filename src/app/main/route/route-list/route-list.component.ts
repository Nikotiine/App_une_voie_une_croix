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
import { RatingRouteDto } from '../../../core/api/models/rating-route-dto';

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
  public readonly ICON = Icons;
  public siteViewUrl: string = SiteRoutingModule.SITE_VIEW;
  public routeViewUrl: string = RouteRoutingModule.ROUTE_VIEW;
  public isLogged: boolean;
  private notebooks: NotebookViewDto[] = [];
  public ratings: RatingRouteDto[] = [];
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
          return this.appNotebookService.getRoutesRatings();
        })
      )
      .pipe(
        mergeMap(ratings => {
          this.ratings = ratings;
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

  /**
   * Verfie si la route a ete coche par l'ulisateur
   * @param id
   */
  public isChecked(id: number): boolean {
    return !!this.notebooks.find(n => n.route.id === id);
  }

  /**
   * Affiche la modal pour coche la voie
   * @param id
   */
  public showDialog(id: number): void {
    this.selectedRoute = this.routes.find(route => route.id === id);
    this.visible = !this.visible;
  }

  /**
   * Si la voie est deja coche envoie un message d'avertissemenet
   */
  public alreadyChecked(): void {
    this.messageService.add({
      severity: ToastConfig.TYPE_WARNING,
      summary: ToastConfig.NOTEBOOK_SUMMARY,
      detail: ToastConfig.NOTEBOOK_ALREADY_CHECKED,
    });
  }

  /**
   * Ferme la modale pour coche la voie
   */
  public closeDialog(): void {
    this.visible = !this.visible;
  }

  /**
   * Recharge les donnee une voie la voie cochée
   */
  public reloadData(): void {
    this.loading = !this.loading;
    this.loadData();
  }

  /**
   * Retourne la moyenne d'evalution d'une voie
   * @param id
   */
  public getRating(id: number): number {
    const routeRating = this.ratings.filter(route => route.id === id);
    let rating = 0;
    if (routeRating.length === 0) {
      return rating;
    }

    for (const route of routeRating) {
      rating += route.rating;
    }
    return Math.round(rating / routeRating.length);
  }
}
