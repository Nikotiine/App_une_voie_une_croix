import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteListComponent } from './site-list/site-list.component';
import { SiteViewComponent } from './site-view/site-view.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { UtilsModule } from '../../shared/utils/utils.module';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  declarations: [SiteListComponent, SiteViewComponent, SiteFormComponent],
  imports: [
    CommonModule,
    SiteRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    UtilsModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule,
    InputNumberModule,
    InputSwitchModule,
  ],
})
export class SiteModule {}
