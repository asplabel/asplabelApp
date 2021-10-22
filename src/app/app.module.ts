import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

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

import { ToolbarComponent } from './toolbar/toolbar.component'
import { JobTitleModule } from './job-title/job-title.module'
import { MonitorComponent } from './monitor/monitor.component'
import { LogInComponent } from './log-in/log-in.component'
import { LogOutComponent } from './log-out/log-out.component'
import { AppRoutingModule } from './app-routing.module'
import { DepartmentModule } from './department/department.module'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { CardModule } from './card/card.module'
import { UserModule } from './user/user.module'

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MonitorComponent,
    LogInComponent,
    LogOutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    JobTitleModule,
    DepartmentModule,
    CardModule,
    UserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
