import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
// attributs publics
  public registerUrl:string = 'auth/register';
  public loginUrl:string = 'auth/login'
}
