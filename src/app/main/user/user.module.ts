import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserViewComponent } from './user-view/user-view.component';
import { UserFormComponent } from './user-form/user-form.component';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [UserViewComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    AccordionModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    DialogModule,
  ],
})
export class UserModule {}
