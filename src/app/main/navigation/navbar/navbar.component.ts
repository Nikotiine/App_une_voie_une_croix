import { Component, OnInit } from '@angular/core';
import { SecurityService } from '../../../core/app/services/security.service';

import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SiteRoutingModule } from '../../site/site-routing.module';
import { AuthRoutingModule } from '../../auth/auth-routing.module';
import { MainRoutingModule } from '../../main-routing.module';
import { Icons } from '../../../core/app/enum/Icons.enum';
import { RouteRoutingModule } from '../../route/route-routing.module';
import { Router } from '@angular/router';
import { UserRoutingModule } from '../../user/user-routing.module';
import { NotebookRoutingModule } from '../../notebook/notebook-routing.module';
import { LanguageService } from '../../../core/app/services/language.service';
import { ToastConfig } from '../../../core/app/config/toast.config';

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
  private readonly translateKey = 'Navbar';
  private home: string = '';
  private sites: string = '';
  private sitesList: string = '';
  private sitesMap: string = '';
  private addSite: string = '';
  private routes: string = '';
  private routesList: string = '';
  private routeSearch: string = '';
  private addRoute: string = '';
  private notebook: string = '';
  private notebookList: string = '';
  private addNotebook: string = '';
  private confirmationMessage: string = '';
  constructor(
    private readonly securityService: SecurityService,
    private readonly router: Router,
    private readonly languageService: LanguageService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService
  ) {
    this.isLogged = this.securityService.isLogged();
  }

  public ngOnInit(): void {
    this.initLabel();
  }

  private initNavbar(): void {
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
        label: this.home,
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: this.sites,
        icon: Icons.SITE,
        items: [
          {
            label: this.sitesList,
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: this.sitesMap,
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
          {
            separator: true,
          },
          {
            label: this.addSite,
            icon: Icons.ADD,
            routerLink: [SiteRoutingModule.SITE_NEW],
          },
        ],
      },
      {
        label: this.routes,
        icon: Icons.ROUTE,
        items: [
          {
            label: this.routesList,
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
          },
          {
            label: this.routeSearch,
            icon: Icons.SEARCH,
          },
          {
            separator: true,
          },
          {
            label: this.addRoute,
            icon: Icons.ADD,
            routerLink: [RouteRoutingModule.ROUTE_NEW],
          },
        ],
      },
      {
        label: this.notebook,
        icon: Icons.TOPO,
        items: [
          {
            label: this.notebookList,
            icon: Icons.NOTEBOOK,
            routerLink: [NotebookRoutingModule.NOTEBOOK_LIST],
          },
          {
            label: this.addNotebook,
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
        label: this.home,
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: this.sites,
        icon: Icons.SITE,
        items: [
          {
            label: this.sitesList,
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: this.sitesMap,
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
        ],
      },
      {
        label: this.routes,
        icon: Icons.ROUTE,
        items: [
          {
            label: this.routesList,
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
          },
          {
            label: this.routeSearch,
            icon: Icons.SEARCH,
          },
        ],
      },
    ];
  }

  public switchLanguage(): void {
    const switchTo: string = this.languageService.switchTo;
    this.confirmationService.confirm({
      message: this.confirmationMessage + ' : ' + switchTo,
      header: 'Language service',
      accept: () => {
        this.languageService.switchLanguage();
        this.initLabel();
      },
      reject: () => {
        this.messageService.add({
          severity: ToastConfig.TYPE_WARNING,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }

  private initLabel(): void {
    this.languageService.getTranslation(this.translateKey).subscribe({
      next: translate => {
        this.home = translate.home;
        this.sites = translate.sites;
        this.sitesList = translate.sitesList;
        this.sitesMap = translate.sitesMap;
        this.addSite = translate.addSite;
        this.routes = translate.routes;
        this.routesList = translate.routesList;
        this.addRoute = translate.addRoute;
        this.routeSearch = translate.routeSearch;
        this.notebook = translate.notebook;
        this.notebookList = translate.notebookList;
        this.addNotebook = translate.addNotebook;
        this.confirmationMessage = translate.confirmationMessage;
        this.initNavbar();
      },
      error: err => {
        this.messageService.add({
          severity: ToastConfig.TYPE_ERROR,
          summary: ToastConfig.ADMIN_SUMMARY,
          detail: ToastConfig.CANCEL,
        });
      },
    });
  }
}
