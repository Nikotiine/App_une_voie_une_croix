import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/api/services/auth.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../user-routing.module';
import { MainRoutingModule } from '../../main-routing.module';
import { ToastConfig } from '../../../core/app/config/toast.config';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { UserProfileService } from '../../../core/app/services/user-profile.service';
import { AdminRoutingModule } from '../../admin/admin-routing.module';
import { UserService } from '../../../core/api/services/user.service';
import { SiteDto } from '../../../core/api/models/site-dto';
import { RouteListDto } from '../../../core/api/models/route-list-dto';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  public user: UserProfileDto | null = null;
  public sites: SiteDto[] = [];
  public routes: RouteListDto[] = [];
  public editUserUrl: string = UserRoutingModule.USER_EDIT;
  public adminDashboardUrl: string = AdminRoutingModule.DASHBOARD;
  public iconEdit: string = Icons.EDIT;
  public iconAdmin: string = Icons.ADMIN;
  private homeUrl: string = MainRoutingModule.HOME;
  public isAdmin: boolean;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly userProfileService: UserProfileService,
    private readonly userService: UserService,
    private router: Router
  ) {
    this.isAdmin = this.userProfileService.isAdmin();
  }
  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.user = this.userProfileService.getUserProfile();
    this.userService
      .userControllerGetUserContributions({
        id: this.user.id,
      })
      .subscribe({
        next: data => {
          console.log(data);
          this.sites = data.sites;
          this.routes = data.routes;
        },
      });
  }
}
