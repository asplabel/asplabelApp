import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from '../app-routing.module'
import { FormsModule } from '@angular/forms'

import { DepartmentListComponent } from './department-list/department-list.component'
import { DepartmentCreateComponent } from './department-create/department-create.component'
import { DepartmentEditComponent } from './department-edit/department-edit.component'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatTableModule } from '@angular/material/table'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrandModule } from '../brand/brand.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { AuthInterceptor } from '../auth/auth-interceptor'

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
  ],
  exports: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentEditComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    BrandModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class DepartmentModule {}
