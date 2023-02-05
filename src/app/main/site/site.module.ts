import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteViewComponent } from './site-view/site-view.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UtilsModule } from '../../shared/utils/utils.module';

@NgModule({
  declarations: [SiteListComponent, SiteViewComponent, SiteFormComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    UtilsModule,
  ],
})
export class SiteModule {}
