import { Component, OnInit } from '@angular/core';
import { RouteService } from '../../../core/api/services/route.service';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RouteRoutingModule } from '../route-routing.module';
import { RouteViewDto } from '../../../core/api/models/route-view-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { MessageService } from 'primeng/api';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { LanguageService } from '../../../core/app/services/language.service';

@Component({
  selector: 'app-route-view',
  templateUrl: './route-view.component.html',
  styleUrls: ['./route-view.component.scss'],
})
export class RouteViewComponent implements OnInit {
  public route!: RouteViewDto;
  public readonly ICON = Icons;
  public routeListUrl: string = RouteRoutingModule.ROUTE_LIST;
  public routeEditUrl: string = RouteRoutingModule.ROUTE_EDIT;
  public isAdmin: boolean;

  constructor(
    private readonly routeService: RouteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userProfileService: UserProfileService,
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly languageService: LanguageService
  ) {
    this.isAdmin = this.userProfileService.isAdmin();
  }
  public ngOnInit(): void {
    const id: number = parseInt(this.activatedRoute.snapshot.params['id']);
    this.loadRoute(id);
  }

  /**
   * Charge la voie avec son id en param
   * @param id number, id de la voie
   *
   */
  private loadRoute(id: number): void {
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
            summary: this.languageService.toastTranslate(
              LanguageService.KEY_TOAST_ROUTE
            ).summary,
            detail: err.error.message,
          });
          return this.router.navigate([this.routeListUrl]);
        },
      });
  }
}
