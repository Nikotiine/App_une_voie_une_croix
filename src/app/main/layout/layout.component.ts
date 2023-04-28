import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../core/app/services/user-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private readonly userProfileService: UserProfileService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    const user = this.activatedRoute.snapshot.data['user'];
    if (user) {
      this.userProfileService.setUserProfile(user);
    }
  }
}
