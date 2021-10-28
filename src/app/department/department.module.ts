import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from '../app-routing.module'
import { FormsModule } from '@angular/forms'

import { DepartmentListComponent } from './department-list/department-list.component'
import { DepartmentCreateComponent } from './department-create/department-create.component'
import { DepartmentDeleteComponent } from './department-delete/department-delete.component'
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

@NgModule({
  declarations: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentDeleteComponent,
    DepartmentEditComponent,
  ],
  exports: [
    DepartmentListComponent,
    DepartmentCreateComponent,
    DepartmentDeleteComponent,
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
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
})
export class DepartmentModule {}
