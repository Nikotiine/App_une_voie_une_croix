import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
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
      },
      {
        path: 'site',
        loadChildren: () =>
          import('./site/site.module').then(m => m.SiteModule),
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
