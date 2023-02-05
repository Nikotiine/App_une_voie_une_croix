import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/api/services/auth.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  // attributs publics
  public user: UserProfileDto | null = null;
  public editUserUrl: string = '/user/edit/';

  // attributs prives
  private toastSummary: string = 'Mon compte';
  private homeUrl: string = '/home';
  constructor(
    private readonly authService: AuthService,
    private readonly messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.authService.authControllerMe().subscribe({
      next: data => {
        this.user = data;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: this.toastSummary,
          detail: err.error.message,
        });
        return this.router.navigate([this.homeUrl]);
      },
    });
  }
}
