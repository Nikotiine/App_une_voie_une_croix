import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookListComponent } from './notebook-list/notebook-list.component';
import { NotebookFormComponent } from './notebook-form/notebook-form.component';
import { NotebookViewComponent } from './notebook-view/notebook-view.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { SidebarModule } from 'primeng/sidebar';

@NgModule({
  declarations: [
    NotebookListComponent,
    NotebookFormComponent,
    NotebookViewComponent,
  ],
  imports: [
    CommonModule,
    NotebookRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ReactiveFormsModule,
    SelectButtonModule,
    CalendarModule,
    TableModule,
    SidebarModule,
  ],
})
export class NotebookModule {}
