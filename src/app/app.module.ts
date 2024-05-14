import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [AppComponent],
	imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, HttpClientModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
	bootstrap: [AppComponent],
})
export class AppModule {}
