import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/app/services/security.service';

import { MenuItem } from 'primeng/api';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { MainRoutingModule } from '../../main-routing.module';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RouteRoutingModule } from '../../route/route-routing.module';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../../user/user-routing.module';
import { NotebookRoutingModule } from '../../notebook/notebook-routing.module';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public readonly ICON = Icons;
  public loginUrl: string = AuthRoutingModule.LOGIN;
  public userProfileUrl: string = UserRoutingModule.USER_VIEW;
  public isLogged: boolean;
  public items: MenuItem[] = [];

  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
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

  private loadConnectedNavbar(): void {
    this.items = [
      {
        label: 'Accueil',
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: 'Sites',
        icon: Icons.SITE,
        items: [
          {
            label: 'Liste des sites',
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
            label: 'Ajouter un site',
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
            label: 'Rechercher une voie',
            icon: Icons.SEARCH,
          },
          {
            separator: true,
          },
          {
            label: 'Ajouter une voie',
            icon: Icons.ADD,
            routerLink: [RouteRoutingModule.ROUTE_NEW],
          },
        ],
      },
      {
        label: 'Mon carnet',
        icon: Icons.TOPO,
        items: [
          {
            label: 'Voir tout',
            icon: Icons.NOTEBOOK,
            routerLink: [NotebookRoutingModule.NOTEBOOK_LIST],
          },
          {
            label: 'Ajouter',
            icon: Icons.ADD,
            routerLink: [NotebookRoutingModule.NOTEBOOK_NEW],
          },
        ],
      },
    ];
  }

  private loadVisitorNavbar(): void {
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
