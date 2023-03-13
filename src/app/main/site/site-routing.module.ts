import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteViewComponent } from './site-view/site-view.component';

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
  },
  {
    path: 'view/:id',
    component: SiteViewComponent,
  },
  {
    path: 'edit/:id',
    component: SiteFormComponent,
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
}
