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
import { TableModule } from 'primeng/table';
import { RippleModule } from 'primeng/ripple';

import { TabViewModule } from 'primeng/tabview';
import { SiteListMapComponent } from './site-list-map/site-list-map.component';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { RatingModule } from 'primeng/rating';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SiteListComponent,
    SiteViewComponent,
    SiteFormComponent,
    SiteListMapComponent,
  ],
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
    TableModule,
    FormsModule,
    RippleModule,
    TabViewModule,
    CalendarModule,
    SelectButtonModule,
    RatingModule,
    TranslateModule,
  ],
})
export class SiteModule {}
