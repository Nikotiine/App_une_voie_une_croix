import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NotebookFormDialogComponent } from './notebook/notebook-form-dialog/notebook-form-dialog.component';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SharedModule } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { TableRoutesComponent } from './route/table-routes/table-routes.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    NotFoundComponent,
    MapComponent,
    NotebookFormDialogComponent,
    TableRoutesComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterLink,
    LeafletModule,
    CalendarModule,
    InputNumberModule,
    SelectButtonModule,
    SharedModule,
    DialogModule,
    ReactiveFormsModule,
    RatingModule,
    InputTextModule,
    TableModule,
    FormsModule,
    TranslateModule,
  ],
  exports: [
    UnauthorizedComponent,
    MapComponent,
    NotebookFormDialogComponent,
    TableRoutesComponent,
  ],
})
export class UtilsModule {}
