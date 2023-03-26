import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from '../core/app/guards/auth.guard';
import { UserResolver } from '../core/app/resolvers/user.resolver';
import { AdminGuard } from '../core/app/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: {
      user: UserResolver,
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomepageComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then(m => m.UserModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'site',
        loadChildren: () =>
          import('./site/site.module').then(m => m.SiteModule),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then(m => m.AuthModule),
      },
      {
        path: 'route',
        loadChildren: () =>
          import('./route/route.module').then(m => m.RouteModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [AdminGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
  static HOME: string = '/';
}
