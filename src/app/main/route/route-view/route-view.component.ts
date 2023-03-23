import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../core/api/services/route.service';

import { Icons } from '../../../core/app/enum/Icons.enum';
import { RouteRoutingModule } from '../route-routing.module';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';
import { ActivatedRoute } from '@angular/router';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { MessageService } from 'primeng/api';
import { UserProfileService } from '../../../core/app/services/user-profile.service';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss'],
})
export class RouteViewComponent implements OnInit {
  public route!: RouteViewDto;
  public iconRockType: string = Icons.ROCK_TYPE;
  public iconEdit: string = Icons.EDIT;
  public iconRoute: string = Icons.ROUTE;
  public iconLevel: string = Icons.LEVEL;
  public iconInformation: string = Icons.INFORMATION;
  public iconSite: string = Icons.SITE;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconQuickdraw: string = Icons.QUICK_DRAW;
  public iconExposition: string = Icons.EXPOSITION;
  public iconSector: string = Icons.SECTOR;
  public iconEquipment: string = Icons.EQUIPMENT;
  public iconEngagement: string = Icons.ENGAGMENT;
  public routeListUrl: string = RouteRoutingModule.ROUTE_LIST;
  public routeEditUrl: string = RouteRoutingModule.ROUTE_EDIT;
  public isAdmin: boolean;
  public iconVan: string = Icons.VAN;
  constructor(
    private readonly routeService: RouteService,
    private activatedRoute: ActivatedRoute,
    private userProfileService: UserProfileService,
    private readonly messageService: MessageService
  ) {
    this.isAdmin = this.userProfileService.isAdmin();
  }
  ngOnInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadSite(id);
  }

  private loadSite(id: number) {
    this.routeService
      .routeControllerGetRoute({
        id: id,
      })
      .subscribe({
        next: data => {
          this.route = data;
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
}
