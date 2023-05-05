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
  private readonly translateKey: string = 'navbar';
  public readonly ICON = Icons;
  public loginUrl: string = AuthRoutingModule.LOGIN;
  public userProfileUrl: string = UserRoutingModule.USER_VIEW;
  public isLogged: boolean;
  public items: MenuItem[] = [];
  private confirmationMessage: string = '';
  private confirmationHeader: string = '';
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

  private initNavbar(translate: any): void {
    this.securityService.authenticated$.subscribe({
      next: isLogged => {
        this.isLogged = isLogged;
        isLogged
          ? this.loadConnectedNavbar(translate)
          : this.loadVisitorNavbar(translate);
      },
    });
  }
  public logout(): Promise<boolean> {
    this.securityService.logout();
    this.isLogged = false;
    this.initLabel();
    return this.router.navigate([MainRoutingModule.HOME]);
  }

  private loadConnectedNavbar(translate: any): void {
    this.items = [
      {
        label: translate.home,
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: translate.sites,
        icon: Icons.SITE,
        items: [
          {
            label: translate.sitesList,
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: translate.sitesMap,
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
          {
            separator: true,
          },
          {
            label: translate.addSite,
            icon: Icons.ADD,
            routerLink: [SiteRoutingModule.SITE_NEW],
          },
        ],
      },
      {
        label: translate.routes,
        icon: Icons.ROUTE,
        items: [
          {
            label: translate.routesList,
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
          },
          {
            label: translate.routeSearch,
            icon: Icons.SEARCH,
          },
          {
            separator: true,
          },
          {
            label: translate.addRoute,
            icon: Icons.ADD,
            routerLink: [RouteRoutingModule.ROUTE_NEW],
          },
        ],
      },
      {
        label: translate.notebook,
        icon: Icons.TOPO,
        items: [
          {
            label: translate.notebookList,
            icon: Icons.NOTEBOOK,
            routerLink: [NotebookRoutingModule.NOTEBOOK_LIST],
          },
          {
            label: translate.addNotebook,
            icon: Icons.ADD,
            routerLink: [NotebookRoutingModule.NOTEBOOK_NEW],
          },
        ],
      },
    ];
  }

  private loadVisitorNavbar(translate: any): void {
    this.items = [
      {
        label: translate.home,
        icon: Icons.VAN,
        routerLink: [MainRoutingModule.HOME],
      },
      {
        label: translate.sites,
        icon: Icons.SITE,
        items: [
          {
            label: translate.sitesList,
            icon: Icons.LIST,
            routerLink: [SiteRoutingModule.SITE_LIST],
          },
          {
            label: translate.sitesMap,
            icon: Icons.MAP,
            routerLink: [SiteRoutingModule.SITES_MAP],
          },
        ],
      },
      {
        label: translate.routes,
        icon: Icons.ROUTE,
        items: [
          {
            label: translate.routesList,
            icon: Icons.LIST,
            routerLink: [RouteRoutingModule.ROUTE_LIST],
          },
          {
            label: translate.routeSearch,
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
      header: this.confirmationHeader,
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
        this.confirmationMessage = translate.confirmationMessage;
        this.confirmationHeader = translate.confirmationHeader;
        this.initNavbar(translate);
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
