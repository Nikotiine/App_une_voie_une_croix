import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteListComponent } from './route-list/route-list.component';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteViewComponent } from './route-view/route-view.component';
import { AuthGuard } from '../../core/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: RouteListComponent,
  },
  {
    path: 'new',
    component: RouteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: RouteFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'view/:id',
    component: RouteViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouteRoutingModule {
  static ROUTE_LIST: string = '/route/list';
  static ROUTE_NEW: string = '/route/new';
  static ROUTE_EDIT: string = '/route/edit/';
  static ROUTE_VIEW: string = '/route/view/';
}
