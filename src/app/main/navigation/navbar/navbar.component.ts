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
  public homeUrl: string = '/home';
  public loginUrl: string = '/auth/login';
  public userProfileUrl: string = '/user/profile';
  public siteListUrl: string = '/site';
  public siteFormUrl: string = '/site/new';
  public isLogged: boolean = false;

  // attributs prives
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
