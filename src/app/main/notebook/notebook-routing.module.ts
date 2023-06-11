import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotebookListComponent } from './notebook-list/notebook-list.component';
import { NotebookFormComponent } from './notebook-form/notebook-form.component';
import { NotebookViewComponent } from './notebook-view/notebook-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    component: NotebookListComponent,
  },
  {
    path: 'new',
    component: NotebookFormComponent,
  },
  {
    path: 'edit/:id',
    component: NotebookFormComponent,
  },
  {
    path: 'view/:id',
    component: NotebookViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotebookRoutingModule {
  static NOTEBOOK_LIST: string = '/notebook/list';
  static NOTEBOOK_NEW: string = '/notebook/new';
  static NOTEBOOK_VIEW: string = '/notebook/view/';
  static NOTEBOOK_EDIT: string = '/notebook/edit/';
}
