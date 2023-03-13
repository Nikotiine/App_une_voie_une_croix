import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/app/services/security.service';

import { MenuItem } from 'primeng/api';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { AppIcon } from '../../../core/app/config/app-icon.config';
import { MainRoutingModule } from '../../main-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  // attributs publics
  public loginAppIcon: string;
  public loginUrl: string;

  public isLogged: boolean = false;
  items: MenuItem[] = [];

  // attributs prives
  constructor(private readonly securityService: SecurityService) {
    this.loginUrl = AuthRoutingModule.LOGIN;
    this.loginAppIcon = AppIcon.LOGIN;
  }
  ngOnInit(): void {
    this.userIsLogged();
    this.items = [
      {
        label: 'Home',
        icon: AppIcon.HOME,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: 'Site',
        icon: AppIcon.SITE,
        items: [
          {
            label: 'Liste',
            icon: AppIcon.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: 'Carte des sites',
            icon: AppIcon.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
          {
            separator: true,
          },
          {
            label: 'Ajouter',
            icon: AppIcon.ADD,
            routerLink: [SiteRoutingModule.SITE_NEW],
          },
        ],
      },
      {
        label: 'Voies',
        icon: AppIcon.ROUTE,
        items: [
          {
            label: 'Toutes les voies',
            icon: AppIcon.LIST,
          },
          {
            label: 'Rechercher',
            icon: 'pi pi-fw pi-align-right',
          },
          {
            separator: true,
          },
          {
            label: 'Ajouter',
            icon: 'pi pi-fw pi-align-center',
          },
        ],
      },
      {
        label: 'Topos',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Chercher',
            icon: 'pi pi-fw pi-user-plus',
          },
          {
            label: 'Contribuer',
            icon: 'pi pi-fw pi-user-minus',
          },
        ],
      },
    ];
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
