import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CardCreateComponent } from './card-create/card-create.component'
import { CardDeleteComponent } from './card-delete/card-delete.component'
import { CardEditComponent } from './card-edit/card-edit.component'
import { CardListComponent } from './card-list/card-list.component'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { AppRoutingModule } from '../app-routing.module'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule, NgForm } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { BrandModule } from '../brand/brand.module'
import { MatDialogModule } from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

@NgModule({
  declarations: [
    CardCreateComponent,
    CardDeleteComponent,
    CardEditComponent,
    CardListComponent,
  ],
  exports: [
    CardCreateComponent,
    CardDeleteComponent,
    CardEditComponent,
    CardListComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BrandModule,
    MatDialogModule,
  ],
})
export class CardModule {}
