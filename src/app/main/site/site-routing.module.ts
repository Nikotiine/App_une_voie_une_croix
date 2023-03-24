import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteViewComponent } from './site-view/site-view.component';
import { SiteListMapComponent } from './site-list-map/site-list-map.component';
import { AuthGuard } from '../../core/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: SiteListComponent,
  },
  {
    path: 'new',
    component: SiteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: SiteViewComponent,
  },
  {
    path: 'edit/:id',
    component: SiteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'map',
    component: SiteListMapComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {
  static SITE_LIST: string = '/site/list';
  static SITE_NEW: string = '/site/new';
  static SITE_EDIT: string = '/site/edit/';
  static SITE_VIEW: string = '/site/view/';
  static SITES_MAP: string = '/site/map';
}
