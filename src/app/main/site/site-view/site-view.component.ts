import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { MessageService } from 'primeng/api';
import { SiteRoutingModule } from '../site-routing.module';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { RouteRoutingModule } from '../../route/route-routing.module';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { mergeMap } from 'rxjs';
import { SecurityService } from '../../../core/app/services/security.service';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';
import { AppNotebookService } from '../../../core/app/services/app-notebook.service';
import { NotebookViewDto } from '../../../core/api/models/notebook-view-dto';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  public routes: RouteViewDto[] = [];
  public mapOption: MapOptions;
  public loading: boolean = true;
  public visible: boolean = false;
  public siteListUrl: string = SiteRoutingModule.SITE_LIST;
  public siteEditUrl: string = SiteRoutingModule.SITE_EDIT;
  public routeViewUrl: string = RouteRoutingModule.ROUTE_VIEW;
  public routeNewUrl: string = RouteRoutingModule.ROUTE_NEW;
  public iconRoute: string = Icons.ROUTE;
  public iconRouteNumber: string = Icons.ROUTE_NUMBER;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconExposition: string = Icons.EXPOSITION;
  public iconRockType: string = Icons.ROCK_TYPE;
  public iconMinLevel: string = Icons.MIN_LEVEL;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconEquipment: string = Icons.EQUIPMENT;
  public iconEngagement: string = Icons.ENGAGMENT;
  public iconApproachTime: string = Icons.APPROACH_TIME;
  public iconApproachType: string = Icons.APPROACH_TYPE;
  public iconRegion: string = Icons.REGION;
  public iconDepartment: string = Icons.DEPARTMENT;
  public iconWater: string = Icons.WATER;
  public iconNetwork: string = Icons.NETWORK;
  public iconRiver: string = Icons.RIVER;
  public iconWc: string = Icons.WC;
  public iconVan: string = Icons.VAN;
  public iconSector: string = Icons.SECTOR;
  public iconLocation: string = Icons.LOCATION;
  public iconTopo: string = Icons.TOPO;
  public iconEdit: string = Icons.EDIT;
  public iconInformation: string = Icons.INFORMATION;
  public isAdmin: boolean;
  public isLogged: boolean;
  private notebooks: NotebookViewDto[] = [];
  public selectedRoute: RouteViewDto;
  private routeId: number;
  constructor(
    private readonly siteService: SiteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly userProfileService: UserProfileService,
    private readonly securityService: SecurityService,
    private readonly appNotebookService: AppNotebookService
  ) {
    this.mapOption = {
      draggable: false,
      lat: 45.151515,
      lng: 5.454545,
    };
    this.isAdmin = this.userProfileService.isAdmin();
    this.isLogged = this.securityService.isLogged();
  }
  ngOnInit(): void {
    this.routeId = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadData(this.routeId);
  }

  private loadData(id: number): void {
    if (this.isLogged) {
      this.siteService
        .siteControllerGetSite({
          id: id,
        })
        .pipe(
          mergeMap(site => {
            this.site = site;
            this.routes = site.routes;
            return this.appNotebookService.getMyNotebook();
          })
        )
        .subscribe({
          next: data => {
            this.notebooks = data;
          },
          error: err => {
            this.messageService.add({
              severity: ToastConfig.TYPE_ERROR,
              summary: ToastConfig.SITE_SUMMARY,
              detail: err.error.message,
            });
            return this.router.navigate([this.siteListUrl]);
          },
          complete: () => {
            this.loading = !this.loading;
          },
        });
    } else {
      this.siteService
        .siteControllerGetSite({
          id: id,
        })
        .subscribe({
          next: data => {
            this.site = data;
            this.routes = data.routes;
          },
          error: err => {
            this.messageService.add({
              severity: ToastConfig.TYPE_ERROR,
              summary: ToastConfig.SITE_SUMMARY,
              detail: err.error.message,
            });
            return this.router.navigate([this.siteListUrl]);
          },
          complete: () => {
            this.loading = !this.loading;
          },
        });
    }
  }

  /**
   * Affiche la map avec le parking du site
   */
  public showMapMainParking(): void {
    this.mapOption.lng = this.site.mainParkingLng;
    this.mapOption.lat = this.site.mainParkingLat;
  }

  /**
   * Affiche la map avec le parking pour camion
   */
  public showMapSecondaryParking(): void {
    this.mapOption.lng = this.site.secondaryParkingLng;
    this.mapOption.lat = this.site.secondaryParkingLat;
  }

  /**
   * Verifie que la voie est deja coche dans le carnet de l'utlisateur
   * @param id
   */
  public isChecked(id: number): boolean {
    return !!this.notebooks.find(n => n.route.id === id);
  }

  /**
   * Affiche le p-dialog pour cocher la voie
   * @param id de la voie
   */
  public showDialog(id: number): void {
    this.selectedRoute = this.routes.find(route => route.id === id);
    this.visible = !this.visible;
  }

  /**
   * Ferme le dialog
   */
  public closeDialog(): void {
    this.visible = !this.visible;
  }

  /**
   * Si la voie est deja cochée envoye un taost type warning
   */
  public alreadyChecked(): void {
    this.messageService.add({
      severity: ToastConfig.TYPE_WARNING,
      summary: ToastConfig.NOTEBOOK_SUMMARY,
      detail: ToastConfig.NOTEBOOK_ALREADY_CHECKED,
    });
  }

  /**
   * En cas de success pour cocher une voie, recharge les donnee
   */
  public reloadData(): void {
    this.loading = !this.loading;
    this.loadData(this.routeId);
  }
}
