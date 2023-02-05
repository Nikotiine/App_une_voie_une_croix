import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [UnauthorizedComponent, NotFoundComponent],
  imports: [CommonModule, ButtonModule, RouterLink],
  exports: [UnauthorizedComponent],
})
export class UtilsModule {}
