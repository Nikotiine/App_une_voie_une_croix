import { Injectable } from '@angular/core';

import { UserProfileDto } from '../../api/models/user-profile-dto';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private user: UserProfileDto;
  private admin: boolean = false;

  public getUserProfile(): UserProfileDto {
    return this.user;
  }
  public setUserProfile(user: UserProfileDto) {
    this.user = user;
    this.admin = user.role === 'admin';
  }
  public isAdmin(): boolean {
    return this.admin;
  }
}
