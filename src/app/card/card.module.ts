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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class CardModule {}
