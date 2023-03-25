import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../core/api/services/admin.service';
import { AdminUsersDto } from '../../../core/api/models/admin-users-dto';
import { AdminSitesDto } from '../../../core/api/models/admin-sites-dto';
import { mergeMap } from 'rxjs';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UserRoles } from '../../../core/app/enum/UserRoles.enum';
import { ToastConfig } from '../../../core/app/config/toast.config';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public loading: boolean = false;
  public users: AdminUsersDto[] = [];
  public sites: AdminSitesDto[] = [];
  public iconRouteNumber: string = Icons.ROUTE_NUMBER;
  public iconMinLevel: string = Icons.MIN_LEVEL;
  public iconMaxLevel: string = Icons.MAX_LEVEL;
  public iconRouteHeight: string = Icons.ROUTE_HEIGHT;
  public iconExposition: string = Icons.EXPOSITION;
  public iconDepartment: string = Icons.DEPARTMENT;
  public iconEdit: string = Icons.EDIT;
  public iconSite: string = Icons.SITE;
  public iconLock: string = Icons.LOCK;
  public iconUnlock: string = Icons.UNLOCK;
  public inactiveStatus: string = 'Inactif';
  public activeStatus: string = 'Actif';
  constructor(
    private readonly adminService: AdminService,
    private confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.adminService
      .adminControllerGetAllUsers()
      .pipe(
        mergeMap(users => {
          this.users = users;
          return this.adminService.adminControllerGetAllSites();
        })
      )
      .subscribe({
        next: data => {
          this.sites = data;
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log(this.sites);
          console.log(this.users);
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

  public confirmEditRole(id: number) {
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
  private getNewRole(userRole: string): string {
    return userRole === UserRoles.ROLE_ADMIN
      ? UserRoles.ROLE_USER
      : UserRoles.ROLE_ADMIN;
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
  public toggleSiteStatus(id: number): void {
    console.log(id);
  }
}
