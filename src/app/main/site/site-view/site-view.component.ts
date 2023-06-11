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
import { SecurityService } from '../../../core/app/services/security.service';
import { RouteListDto } from '../../../core/api/models/route-list-dto';
import { TableRouteOptions } from '../../../core/app/models/TableOptions.model';
import { LanguageService } from '../../../core/app/services/language.service';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public readonly ICON = Icons;
  public site!: SiteViewDto;
  public routes: RouteListDto[] = [];
  public mapOption: MapOptions;
  public tableOptions: TableRouteOptions;
  public loading: boolean = true;
  public isAdmin: boolean;
  public isLogged: boolean;
  private readonly routeId: number;

  // *************class css**************************
  public textDanger: string = 'has-text-danger';
  public textInfo: string = 'has-text-info';

  // *************URL**************************
  public siteListUrl: string = SiteRoutingModule.SITE_LIST;
  public siteEditUrl: string = SiteRoutingModule.SITE_EDIT;
  public routeNewUrl: string = RouteRoutingModule.ROUTE_NEW;
  constructor(
    private readonly siteService: SiteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly userProfileService: UserProfileService,
    private readonly securityService: SecurityService,
    private readonly languageService: LanguageService
  ) {
    this.mapOption = {
      draggable: false,
      lat: 45.151515,
      lng: 5.454545,
    };
    this.tableOptions = {
      fullView: true,
      forAdmin: false,
    };
    this.isAdmin = this.userProfileService.isAdmin();
    this.isLogged = this.securityService.isLogged();
    this.routeId = parseInt(this.activatedRoute.snapshot.params['id']);
  }
  public ngOnInit(): void {
    this.loadSite(this.routeId);
  }

  private loadSite(id: number): void {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: site => {
          this.site = site;
          this.routes = site.routes;
          this.loading = false;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: this.languageService.toastTranslate(
              LanguageService.KEY_TOAST_SITE
            ).summary,
            detail: err.error.message,
          });
          this.router.navigate([this.siteListUrl]);
        },
      });
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
}
