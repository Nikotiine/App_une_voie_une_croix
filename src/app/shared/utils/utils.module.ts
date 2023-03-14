import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [UnauthorizedComponent, NotFoundComponent, MapComponent],
  imports: [CommonModule, ButtonModule, RouterLink, LeafletModule],
  exports: [UnauthorizedComponent, MapComponent],
})
export class UtilsModule {}
