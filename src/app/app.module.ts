import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { ApiInterceptorProvider } from './core/app/interceptor/api.interceptor';
import { UtilsModule } from './shared/utils/utils.module';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CookieModule.withOptions(),
    UtilsModule,
  ],
  providers: [ApiInterceptorProvider, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
