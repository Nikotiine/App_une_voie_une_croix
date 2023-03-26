import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserResolver } from '../core/app/resolvers/user.resolver';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
  declarations: [LayoutComponent, HomepageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, UserResolver],
  exports: [HomepageComponent],
})
export class MainModule {}
