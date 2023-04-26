import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotebookRoutingModule } from './notebook-routing.module';
import { NotebookListComponent } from './notebook-list/notebook-list.component';
import { NotebookFormComponent } from './notebook-form/notebook-form.component';
import { NotebookViewComponent } from './notebook-view/notebook-view.component';


@NgModule({
  declarations: [
    NotebookListComponent,
    NotebookFormComponent,
    NotebookViewComponent
  ],
  imports: [
    CommonModule,
    NotebookRoutingModule
  ]
})
export class NotebookModule { }
