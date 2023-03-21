import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { HomepageComponent } from './homepage/homepage.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [LayoutComponent, HomepageComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule, ToastModule],
  providers: [MessageService],
  exports: [HomepageComponent],
})
export class MainModule {}
