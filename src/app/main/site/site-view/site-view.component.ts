import { Component, OnInit } from '@angular/core';
import { SiteService } from '../../../core/api/services/site.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteViewDto } from '../../../core/api/models/site-view-dto';
import { MapOptions } from '../../../core/app/models/MapOptions';
import { MessageService } from 'primeng/api';
import { SiteRoutingModule } from '../site-routing.module';

import { Icons } from '../../../core/app/enum/Icons.enum';
import { ToastConfig } from '../../../core/app/config/toast.config';

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
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.SITE_SUMMARY,
            detail: err.error.message,
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
