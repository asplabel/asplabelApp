import { NgModule } from "@angular/core";

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
import { MatExpansionModule } from '@angular/material/expansion'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatMomentDateModule } from '@angular/material-moment-adapter'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  exports: [
  MatDatepickerModule,
  MatNativeDateModule, MatInputModule,
  MatSnackBarModule,
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
  MatDatepickerModule,
  MatNativeDateModule,
  MatMomentDateModule,
  MatProgressSpinnerModule,
  MatExpansionModule],
})
export class AngularMaterialModule {

}
