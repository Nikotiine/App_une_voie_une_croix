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
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
})
export class RouteModule {}
