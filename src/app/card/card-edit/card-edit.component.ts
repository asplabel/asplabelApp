import { Component, Inject, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

export interface cardData {
  id: string
  UID: string
  type: string
  is_active: boolean
  state: string
}

@Component({
  selector: 'app-card-edit',
  templateUrl: './card-edit.component.html',
  styleUrls: ['./card-edit.component.css'],
})
export class CardEditComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CardEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: cardData,
  ) {}

  ngOnInit(): void {}
  onNoClick() {
    this.dialogRef.close()
  }
}
