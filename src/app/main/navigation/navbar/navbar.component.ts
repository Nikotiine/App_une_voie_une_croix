import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/app/services/security.service';
import { AuthService } from '../../../core/api/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // attributs publics

  public loginUrl: string = '/auth/login';
  public homeUrl: string = '/home';
  public userProfileUrl: string = '/user/profile';
  public isLogged: boolean = false;

  constructor(private readonly securityService: SecurityService) {}
  ngOnInit(): void {
    this.userIsLogged();
  }

  public logout(): void {
    this.securityService.logout();
    this.isLogged = false;
    this.userIsLogged();
  }
  public userIsLogged(): void {
    this.isLogged = this.securityService.isLogged();
  }
}
