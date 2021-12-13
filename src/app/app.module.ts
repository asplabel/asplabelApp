import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { MatMenuModule } from '@angular/material/menu'
import { MatSelectModule } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion'

import { ToolbarComponent } from './toolbar/toolbar.component'
import { JobTitleModule } from './job-title/job-title.module'
import { MonitorComponent } from './monitor/monitor.component'
import { LogInComponent } from './auth/log-in/log-in.component'
import { AppRoutingModule } from './app-routing.module'
import { DepartmentModule } from './department/department.module'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CardModule } from './card/card.module'
import { UserModule } from './user/user.module'
import { BrandModule } from './brand/brand.module'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SignupComponent } from './auth/signup/signup.component'
import { AuthInterceptor } from './auth/auth-interceptor'
import { ErrorInterceptor } from './error-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MonitorComponent,
    LogInComponent,
    SignupComponent,
  ],
  exports: [MatDatepickerModule, MatNativeDateModule],
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
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    BrandModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
