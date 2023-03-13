import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { MessageService } from 'primeng/api';
import { SiteRoutingModule } from '../site-routing.module';
import { AppIcon } from '../../../core/app/config/app-icon.config';

@Component({
  selector: 'app-site-view',
  templateUrl: './site-view.component.html',
  styleUrls: ['./site-view.component.scss'],
})
export class SiteViewComponent implements OnInit {
  public site!: SiteViewDto;
  public mapOption: MapOptions;
  public siteListUrl: string;
  public siteEditUrl: string;
  public iconRoute: string;
  public iconRouteNumber: string;
  public iconRouteHeight: string;
  public iconExposition: string;
  public iconRockType: string;
  public iconMinLevel: string;
  public iconMaxLevel: string;
  public iconEquipment: string;
  public iconEngagement: string;
  public iconApproachTime: string;
  public iconApproachType: string;
  private toastSummary: string = 'Site';
  private toastDetailLoadDataError: string =
    'Erreur lors du chargement des donnees';

  constructor(
    private readonly siteService: SiteService,
    private activatedRoute: ActivatedRoute,
    private readonly messageService: MessageService,
    private router: Router
  ) {
    this.mapOption = {
      draggable: false,
      lat: 45.151515,
      lng: 5.454545,
    };
    this.siteListUrl = SiteRoutingModule.SITE_LIST;
    this.siteEditUrl = SiteRoutingModule.SITE_EDIT;
    this.iconRoute = AppIcon.ROUTE;
    this.iconRouteNumber = AppIcon.ROUTE_NUMBER;
    this.iconRouteHeight = AppIcon.ROUTE_HEIGHT;
    this.iconExposition = AppIcon.EXPOSITION;
    this.iconRockType = AppIcon.ROCK_TYPE;
    this.iconMinLevel = AppIcon.MIN_LEVEL;
    this.iconEquipment = AppIcon.EQUIPMENT;
    this.iconMaxLevel = AppIcon.MAX_LEVEL;
    this.iconEngagement = AppIcon.ENGAGMENT;
    this.iconApproachTime = AppIcon.APPROACH_TIME;
    this.iconApproachType = AppIcon.APPROACH_TYPE;
  }
  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadData(id);
  }

  private loadData(id: number): void {
    this.siteService
      .siteControllerGetSite({
        id: id,
      })
      .subscribe({
        next: data => {
          this.site = data;
        },
        error: err => {
          this.messageService.add({
            severity: 'error',
            summary: this.toastSummary,
            detail: this.toastDetailLoadDataError,
          });
          return this.router.navigate([this.siteListUrl]);
        },
      });
  }

  public showMapMainParking(): void {
    this.mapOption.lng = this.site.mainParkingLng;
    this.mapOption.lat = this.site.mainParkingLat;
  }
  public showMapSecondaryParking(): void {
    this.mapOption.lng = this.site.secondaryParkingLng;
    this.mapOption.lat = this.site.secondaryParkingLat;
  }
}
