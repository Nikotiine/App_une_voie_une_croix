import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SecurityService } from '../../../core/app/services/security.service';

import { MenuItem } from 'primeng/api';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { MainRoutingModule } from '../../main-routing.module';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RouteRoutingModule } from '../../route/route-routing.module';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../../user/user-routing.module';
import { UserProfileService } from '../../../core/app/services/user-profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public iconLogin: string = Icons.LOGIN;
  public iconUser: string = Icons.USER;
  public loginUrl = AuthRoutingModule.LOGIN;
  public userProfileUrl = UserRoutingModule.USER_VIEW;
  public isLogged: boolean;
  public items: MenuItem[] = [];

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  ngOnInit(): void {
    this.securityService.authenticated$.subscribe({
      next: data => {
        this.isLogged = data;
        data ? this.loadConnectedNavbar() : this.loadVisitorNavbar();
      },
    });
  }

  public logout(): Promise<boolean> {
    this.securityService.logout();

    this.isLogged = false;

    this.loadVisitorNavbar();
    return this.router.navigate([MainRoutingModule.HOME]);
  }

  private loadConnectedNavbar() {
    this.items = [
      {
        label: 'Home',
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: 'Site',
        icon: Icons.SITE,
        items: [
          {
            label: 'Liste',
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: 'Carte des sites',
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
          {
            separator: true,
          },
          {
            label: 'Ajouter',
            icon: Icons.ADD,
            routerLink: [SiteRoutingModule.SITE_NEW],
          },
        ],
      },
      {
        label: 'Voies',
        icon: Icons.ROUTE,
        items: [
          {
            label: 'Toutes les voies',
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
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
            icon: Icons.ADD,
            routerLink: [RouteRoutingModule.ROUTE_NEW],
          },
        ],
      },
      {
        label: 'Topos',
        icon: Icons.TOPO,
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

  private loadVisitorNavbar() {
    this.items = [
      {
        label: 'Home',
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: 'Site',
        icon: Icons.SITE,
        items: [
          {
            label: 'Liste',
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: 'Carte des sites',
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
        ],
      },
      {
        label: 'Voies',
        icon: Icons.ROUTE,
        items: [
          {
            label: 'Toutes les voies',
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
          },
          {
            label: 'Rechercher',
            icon: 'pi pi-fw pi-align-right',
          },
        ],
      },
    ];
  }
}
