import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouteRoutingModule } from './route-routing.module';
import { RouteFormComponent } from './route-form/route-form.component';
import { RouteViewComponent } from './route-view/route-view.component';
import { RouteListComponent } from './route-list/route-list.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UtilsModule } from '../../shared/utils/utils.module';
import { RatingModule } from 'primeng/rating';

@NgModule({
  declarations: [RouteFormComponent, RouteViewComponent, RouteListComponent],
  imports: [
    CommonModule,
    RouteRoutingModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    InputNumberModule,
    ButtonModule,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    TabViewModule,
    InputTextareaModule,
    UtilsModule,
    RatingModule,
  ],
})
export class RouteModule {}
