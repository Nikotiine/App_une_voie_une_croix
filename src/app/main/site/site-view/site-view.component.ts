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

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  public routes: RouteListDto[] = [];
  public mapOption: MapOptions;
  public loading: boolean = true;
  public isAdmin: boolean;
  public isLogged: boolean;
  private readonly routeId: number;

  // **************ICONS*************************
  public readonly ICON = Icons;

  // *************String in template**************************
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
    private readonly securityService: SecurityService
  ) {
    this.mapOption = {
      draggable: false,
      lat: 45.151515,
      lng: 5.454545,
    };
    this.isAdmin = this.userProfileService.isAdmin();
    this.isLogged = this.securityService.isLogged();
    this.routeId = parseInt(this.activatedRoute.snapshot.params['id']);
  }
  public ngOnInit(): void {
    this.loadData(this.routeId);
  }

  private loadData(id: number): void {
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
        },
        complete: () => {
          this.loading = false;
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
