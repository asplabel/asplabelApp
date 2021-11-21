import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AppRoutingModule } from '../app-routing.module'

import { UserListComponent } from './user-list/user-list.component'
import { UserEditComponent } from './user-edit/user-edit.component'
import { UserCreateComponent } from './user-create/user-create.component'
import { UserDeleteComponent } from './user-delete/user-delete.component'

import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatTableModule } from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatPaginatorModule } from '@angular/material/paginator'
import { BrandModule } from '../brand/brand.module'
import { UserCardComponent } from './user-card/user-card.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatExpansionModule } from '@angular/material/expansion'

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserCardComponent,
  ],
  exports: [
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDeleteComponent,
    UserCardComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    BrandModule,
    MatExpansionModule,
  ],
})
export class UserModule {}
