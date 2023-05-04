import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icons } from '../../../../core/app/enum/Icons.enum';
import { RouteListDto } from '../../../../core/api/models/route-list-dto';
import { SiteRoutingModule } from '../../../../main/site/site-routing.module';
import { RouteRoutingModule } from '../../../../main/route/route-routing.module';
import { SecurityService } from '../../../../core/app/services/security.service';
import { AppNotebookService } from '../../../../core/app/services/app-notebook.service';
import { NotebookViewDto } from '../../../../core/api/models/notebook-view-dto';
import { MessageService } from 'primeng/api';
import { ToastConfig } from '../../../../core/app/config/toast.config';
import { RatingRouteDto } from '../../../../core/api/models/rating-route-dto';

export interface RouteViewModel extends RouteListDto {
  rating: number;
  checked: boolean;
}
@Component({
  selector: 'app-table-routes',
  templateUrl: './table-routes.component.html',
  styleUrls: ['./table-routes.component.scss'],
})
export class TableRoutesComponent implements OnInit {
  @Input()
  set routes(routes: RouteListDto[]) {
    this._routes = routes;
    if (!this.loading) {
      this.makeRouteViewModels();
    }
  }
  get routes(): RouteListDto[] {
    return this._routes;
  }

  private _routes: RouteListDto[] = [];
  public routesVM: RouteViewModel[] = [];
  public loading: boolean = true;
  public readonly ICON = Icons;
  public isLogged: boolean;
  public siteViewUrl: string = SiteRoutingModule.SITE_VIEW;
  public routeViewUrl: string = RouteRoutingModule.ROUTE_VIEW;
  private notebooks: NotebookViewDto[] = [];
  public ratings: RatingRouteDto[] = [];
  public visible: boolean = false;
  public selectedRoute: RouteListDto;
  constructor(
    private readonly securityService: SecurityService,
    private readonly appNotebookService: AppNotebookService,
    private readonly messageService: MessageService
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
    this.loadData();
    console.log(this.routes);
  }

  private loadData(): void {
    if (this.isLogged) {
      this.loadMyNoteBook();
    }
    this.loadRating();
  }
  private loadMyNoteBook(): void {
    this.appNotebookService.getMyNotebook().subscribe({
      next: data => {
        this.notebooks = data;
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.NOTEBOOK_SUMMARY,
          detail: err.error.message,
        });
      },
    });
  }

  private loadRating(): void {
    this.appNotebookService.getRoutesRatings().subscribe({
      next: data => {
        this.ratings = data;
        this.makeRouteViewModels();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.NOTEBOOK_SUMMARY,
          detail: err.error.message,
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  private makeRouteViewModels(): void {
    this.routesVM = this.routes.map(route => {
      return {
        ...route,
        rating: this.setRatingForRoute(route.id),
        checked: this.isLogged ? this.setIsChecked(route.id) : false,
      };
    });
  }

  private setRatingForRoute(id: number): number {
    let rating: number = 0;
    const ratings = this.ratings.filter(rating => rating.id === id);
    if (ratings.length === 0) {
      return rating;
    }
    for (const route of ratings) {
      rating += route.rating;
    }
    return Math.round(rating / ratings.length);
  }

  /**
   * Verfie si la route a ete coche par l'ulisateur
   * @param id
   */
  private setIsChecked(id: number): boolean {
    return !!this.notebooks.find(n => n.route.id === id);
  }

  /**
   * Ferme la modale pour coche la voie
   */
  public closeDialog(): void {
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
   * Affiche la modal pour coche la voie
   * @param id
   */
  public showDialog(id: number): void {
    this.selectedRoute = this.routes.find(route => route.id === id);
    this.visible = !this.visible;
  }

  /**
   * Recharge les donnee une voie la voie cochée
   */
  public reloadData(): void {
    this.loading = true;
    this.loadData();
  }
}
