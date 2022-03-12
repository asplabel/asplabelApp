import { NgModule, LOCALE_ID } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'


import { ToolbarComponent } from './toolbar/toolbar.component'
import { JobTitleModule } from './job-title/job-title.module'
import { MonitorComponent } from './monitor/monitor.component'
import { LogInComponent } from './auth/log-in/log-in.component'
import { AppRoutingModule } from './app-routing.module'
import { DepartmentModule } from './department/department.module'

import { CardModule } from './card/card.module'
import { UserModule } from './user/user.module'
import { BrandModule } from './brand/brand.module'
import { SignupComponent } from './auth/signup/signup.component'
import { AuthInterceptor } from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor'
import { AngularMaterialModule } from './angular-material.module'
import { registerLocaleData } from '@angular/common';
import localeEsCo from '@angular/common/locales/es-CO';

registerLocaleData(localeEsCo, 'es');

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MonitorComponent,
    LogInComponent,
    SignupComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    JobTitleModule,
    DepartmentModule,
    UserModule,
    CardModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrandModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
  ],
  exports:[AngularMaterialModule],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-Co' },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
