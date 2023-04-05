import { Injectable } from '@angular/core';
import { UserProfileDto } from '../../api/models/user-profile-dto';
import { AuthService } from '../../api/services/auth.service';
import { Observable, shareReplay } from 'rxjs';
import { UserRole } from '../enum/UserRole.enum';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private user: UserProfileDto;
  private admin: boolean = false;
  private user$!: Observable<UserProfileDto>;
  private static SHARE_REPLAY_TIMER = 1000 * 60 * 15;
  constructor(private readonly authService: AuthService) {}

  public getUserProfile(): UserProfileDto {
    return this.user;
  }
  public setUserProfile(user: UserProfileDto) {
    this.user = user;
    this.admin = user.role === UserRole.ROLE_ADMIN;
  }
  public isAdmin(): boolean {
    return this.admin;
  }
  public getUserProfileObservable(): Observable<UserProfileDto> {
    if (!this.user$) {
      this.user$ = this.authService
        .authControllerMe()
        .pipe(shareReplay(1, UserProfileService.SHARE_REPLAY_TIMER));
    }
    return this.user$;
  }
}
