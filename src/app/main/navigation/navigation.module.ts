import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
  imports: [CommonModule, RouterLink, ButtonModule],
})
export class NavigationModule {}
