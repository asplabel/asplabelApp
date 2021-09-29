import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { JobTitleEditComponent } from './job-title-edit/job-title-edit.component'
import { JobTitleDeleteComponent } from './job-title-delete/job-title-delete.component'
import { FormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { JobTitleCreateComponent } from './job-title-create/job-title-create.component'
import { JobTitleListComponent } from './job-title-list/job-title-list.component'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon'
import { MatSelectModule } from '@angular/material/select'

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
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatSelectModule,
  ],
})
export class JobTitleModule {}
