import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { AdminUsersDto } from '../../../core/api/models/admin-users-dto';
import { AdminSitesDto } from '../../../core/api/models/admin-sites-dto';
import { mergeMap } from 'rxjs';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserRole } from '../../../core/app/enum/UserRole.enum';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { AdminRoutesDto } from '../../../core/api/models/admin-routes-dto';
import { RouteRoutingModule } from '../../route/route-routing.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading: boolean = true;
  public users: AdminUsersDto[] = [];
  public sites: AdminSitesDto[] = [];
  private routes: AdminRoutesDto[] = [];
  public filteredRoutes: AdminRoutesDto[] = [];
  public readonly ICON = Icons;
  public siteViewUrl: string = SiteRoutingModule.SITE_VIEW;
  public routeViewUrl: string = RouteRoutingModule.ROUTE_VIEW;

  public inactiveStatus: string = 'Inactif';
  public activeStatus: string = 'Actif';
  constructor(
    private readonly adminService: AdminService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}
  public ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading = true;
    this.adminService
      .adminControllerGetAllUsers()
      .pipe(
        mergeMap(users => {
          this.users = users;
          return this.adminService.adminControllerGetAllSites();
        }),
        mergeMap(sites => {
          this.sites = sites;
          return this.adminService.adminControllerGetAllRoutes();
        })
      )
      .subscribe({
        next: routes => {
          console.log(routes);
          this.routes = routes;
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ADMIN_SUMMARY,
            detail: err.error.message,
          });
        },
        complete: () => {
          this.filteredRoutes = this.routes;
          this.loading = !this.loading;
        },
      });
  }

  public confirmToggleUserStatus(id: number): void {
    this.confirmationService.confirm({
      message: this.messageUserStatus(id),
      header: 'Modification du status',
      accept: () => {
        this.toggleUserStatus(id);
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }
  private messageUserStatus(id: number): string {
    const user = this.selectedUser(id);
    const newStatus = user.isActive ? this.inactiveStatus : this.activeStatus;
    return (
      'Passer ' +
      user.lastName +
      ' ' +
      user.firstName +
      ' en status ' +
      newStatus
    );
  }
  private toggleUserStatus(id: number): void {
    this.adminService
      .adminControllerToggleUserStatus({
        id: id,
      })
      .subscribe({
        next: res => {
          if (res.isUpdated) {
            this.messageService.add({
              severity: ToastConfig.TYPE_SUCCESS,
              summary: ToastConfig.ADMIN_SUMMARY,
              detail: ToastConfig.ADMIN_USER_STATUS,
            });
            this.loadData();
          }
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ADMIN_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }

  public confirmEditRole(id: number): void {
    this.confirmationService.confirm({
      message: this.messageUserRole(id),
      header: 'Modification des droits',
      accept: () => {
        this.editUserRole(id);
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }
  private editUserRole(id: number): void {
    const user = this.selectedUser(id);
    user.role = this.getNewRole(user.role);
    user.updatedAt = new Date().toDateString();
    this.adminService
      .adminControllerEditUserRole({
        id: id,
        body: user,
      })
      .subscribe({
        next: res => {
          if (res.isUpdated) {
            this.loadData();
            this.messageService.add({
              severity: ToastConfig.TYPE_SUCCESS,
              summary: ToastConfig.ADMIN_SUMMARY,
              detail: ToastConfig.ADMIN_USER_STATUS,
            });
          }
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ADMIN_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
  private getNewRole(userRole: string): UserRole {
    return userRole === UserRole.ROLE_ADMIN
      ? UserRole.ROLE_USER
      : UserRole.ROLE_ADMIN;
  }
  private messageUserRole(id: number): string {
    const user = this.selectedUser(id);
    const newRole = this.getNewRole(user.role);
    return (
      'Donner le role de ' +
      newRole +
      ' à ' +
      user.lastName +
      ' ' +
      user.firstName
    );
  }
  private selectedUser(id: number): AdminUsersDto {
    return this.users.find(u => u.id === id);
  }

  public confirmToggleSiteStatus(id: number): void {
    this.confirmationService.confirm({
      message: this.messageSiteStatus(id),
      header: 'Modification du site',
      accept: () => {
        this.toggleSiteStatus(id);
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }
  public toggleSiteStatus(id: number): void {
    this.adminService
      .adminControllerToggleSiteStatus({
        id: id,
      })
      .subscribe({
        next: res => {
          if (res.isUpdated) {
            this.loadData();
            this.messageService.add({
              severity: ToastConfig.TYPE_SUCCESS,
              summary: ToastConfig.ADMIN_SUMMARY,
              detail: ToastConfig.ADMIN_USER_STATUS,
            });
          }
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ADMIN_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
  private messageSiteStatus(id: number): string {
    const site = this.selectedSite(id);
    const newStatus = site.isActive ? this.inactiveStatus : this.activeStatus;
    return 'Mettre le status ' + newStatus + ' au site ' + site.name;
  }
  private selectedSite(id: number): AdminSitesDto {
    return this.sites.find(s => s.id === id);
  }

  public confirmToggleRouteStatus(id: number): void {
    this.confirmationService.confirm({
      message: this.messageRouteStatus(id),
      header: 'Modification de la voie',
      accept: () => {
        this.toggleRouteStatus(id);
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }

  private toggleRouteStatus(id: number): void {
    this.adminService
      .adminControllerToggleRouteStatus({
        id: id,
      })
      .subscribe({
        next: res => {
          if (res.isUpdated) {
            this.loadData();
            this.messageService.add({
              severity: ToastConfig.TYPE_SUCCESS,
              summary: ToastConfig.ADMIN_SUMMARY,
              detail: ToastConfig.ADMIN_USER_STATUS,
            });
          }
        },
        error: err => {
          this.messageService.add({
            severity: ToastConfig.TYPE_ERROR,
            summary: ToastConfig.ADMIN_SUMMARY,
            detail: err.error.message,
          });
        },
      });
  }
  private messageRouteStatus(id: number): string {
    const route = this.selectedRoute(id);
    const newStatus = route.isActive ? this.inactiveStatus : this.activeStatus;
    return 'Mettre le status ' + newStatus + ' a la voie ' + route.name;
  }
  private selectedRoute(id: number): AdminRoutesDto {
    return this.routes.find(r => r.id === id);
  }
}
