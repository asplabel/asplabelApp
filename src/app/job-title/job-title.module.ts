import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from '../app-routing.module'

import { JobTitleEditComponent } from './job-title-edit/job-title-edit.component'
import { JobTitleDeleteComponent } from './job-title-delete/job-title-delete.component'
import { JobTitleCreateComponent } from './job-title-create/job-title-create.component'
import { JobTitleListComponent } from './job-title-list/job-title-list.component'

import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrandModule } from '../brand/brand.module'
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  declarations: [
    JobTitleEditComponent,
    JobTitleDeleteComponent,
    JobTitleCreateComponent,
    JobTitleListComponent,
  ],
  exports: [
    JobTitleEditComponent,
    JobTitleDeleteComponent,
    JobTitleCreateComponent,
    JobTitleListComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    BrandModule,
    MatDialogModule,
  ],
})
export class JobTitleModule {}
