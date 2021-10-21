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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
  ],
})
export class CardModule {}
