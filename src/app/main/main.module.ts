import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { NavigationModule } from './navigation/navigation.module';
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [LayoutComponent, HomepageComponent],
  imports: [CommonModule, MainRoutingModule, NavigationModule],
})
export class MainModule {}
