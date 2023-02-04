import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/api/services/auth.service';
import { UserProfileDto } from '../../../core/api/models/user-profile-dto';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
})
export class UserViewComponent implements OnInit {
  public user: UserProfileDto | null = null;
  public editUserUrl: string = '/user/edit/';
  constructor(private readonly authService: AuthService) {}
  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile(): void {
    this.authService.authControllerMe().subscribe({
      next: data => {
        this.user = data;
      },
      error: err => {
        console.log(err);
      },
    });
  }
}
