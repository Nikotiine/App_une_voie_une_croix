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
import { TableRouteOptions } from '../../../../core/app/models/TableOptions.model';
import { LanguageService } from '../../../../core/app/services/language.service';

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

  @Input() options: TableRouteOptions;
  @Output() selectedRoute: EventEmitter<number> = new EventEmitter<number>();
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
  public selectedRouteForNotebook: RouteListDto;
  constructor(
    private readonly securityService: SecurityService,
    private readonly appNotebookService: AppNotebookService,
    private readonly messageService: MessageService,
    private readonly languageService: LanguageService
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    if (this.isLogged) {
      this.loadMyNoteBook();
    } else {
      this.loadRating();
    }
  }

  /**
   * Si l'utilsateur est connecter , charge ses croix et affiche ou non le status checked a la voie
   */
  private loadMyNoteBook(): void {
    this.appNotebookService.getMyNotebook().subscribe({
      next: data => {
        this.notebooks = data;
        this.loadRating();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: err.error.message,
        });
      },
    });
  }

  /**
   * Charge toutes les note disponible en bdd
   * un fois fais , creer les view models
   */
  private loadRating(): void {
    this.appNotebookService.getRoutesRatings().subscribe({
      next: data => {
        this.ratings = data;
        this.makeRouteViewModels();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: this.languageService.toastTranslate(
            LanguageService.KEY_TOAST_NOTEBOOK
          ).summary,
          detail: err.error.message,
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  /**
   * Transforme le model de RouteListDto en RouteViewModel
   * Ajoute les champs de notation et le status coche ou non de la voie
   */
  private makeRouteViewModels(): void {
    this.routesVM = this.routes.map(route => {
      return {
        ...route,
        rating: this.setRatingForRoute(route.id),
        checked: this.isLogged ? this.setIsChecked(route.id) : false,
      };
    });
  }

  /**
   * Fait la moyenne des voie par rapport au note attribue lors des coches.
   * la moyenne est toujours arrondi a un chiffre entier
   * @param id
   */
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
    return !!this.notebooks.find(notebook => notebook.route.id === id);
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
      summary: this.languageService.toastTranslate(
        LanguageService.KEY_TOAST_NOTEBOOK
      ).summary,
      detail: this.languageService.toastTranslate(
        LanguageService.KEY_TOAST_NOTEBOOK
      ).alreadyChecked,
    });
  }

  /**
   * Affiche la modal pour coche la voie
   * @param id
   */
  public showDialog(id: number): void {
    this.selectedRouteForNotebook = this.routes.find(route => route.id === id);
    this.visible = !this.visible;
  }

  /**
   * Recharge les donnee une voie la voie cochée
   */
  public reloadData(): void {
    this.loading = true;
    this.loadData();
  }

  /**
   * En cas d'utilisation du composant depuis le dashboard admin, emet l'id de la voie pour changer son status (actif ou inatcif)
   * @param id
   */
  public emitToSwitchStatus(id: number): void {
    this.selectedRoute.emit(id);
  }
}
