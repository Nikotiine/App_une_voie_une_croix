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
  public isLogged: boolean = false;

  constructor(
    private readonly securityService: SecurityService,
    private readonly authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getProfile();
  }

  public logout(): void {
    this.securityService.logout();
    this.isLogged = false;
    this.getProfile();
  }
  public getProfile(): void {
    this.isLogged = this.securityService.isLogged();
    if (this.isLogged) {
      this.authService.authControllerMe().subscribe({
        next: data => {
          console.log(data);
        },
        error: err => {
          console.log(err);
        },
      });
    }
  }
}
