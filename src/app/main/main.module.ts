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
import { ChartModule } from 'primeng/chart';
import { CarouselModule } from 'primeng/carousel';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '../shared/utils/utils.module';

@NgModule({
  declarations: [LayoutComponent, HomepageComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NavigationModule,
    ToastModule,
    ConfirmDialogModule,
    ChartModule,
    CarouselModule,
    TranslateModule,
    UtilsModule,
  ],
  providers: [MessageService, UserResolver],
  exports: [HomepageComponent],
})
export class MainModule {}
