import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCreateComponent } from './card-create/card-create.component';
import { CardDeleteComponent } from './card-delete/card-delete.component';
import { CardEditComponent } from './card-edit/card-edit.component';
import { CardListComponent } from './card-list/card-list.component';



@NgModule({
  declarations: [
    CardCreateComponent,
    CardDeleteComponent,
    CardEditComponent,
    CardListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CardModule { }
