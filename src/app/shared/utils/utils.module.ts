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
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UnauthorizedComponent,
    NotFoundComponent,
    MapComponent,
    NotebookFormDialogComponent,
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
  ],
  exports: [UnauthorizedComponent, MapComponent, NotebookFormDialogComponent],
})
export class UtilsModule {}
