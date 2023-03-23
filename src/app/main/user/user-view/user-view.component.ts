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

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  public user: UserProfileDto | null = null;
  public editUserUrl: string = UserRoutingModule.USER_EDIT;
  public iconEdit: string = Icons.EDIT;
  private homeUrl: string = MainRoutingModule.HOME;

  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private readonly userProfileService: UserProfileService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.user = this.userProfileService.getUserProfile();
  }
}
