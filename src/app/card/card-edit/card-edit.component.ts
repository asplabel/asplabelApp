import { Component, OnInit } from '@angular/core'

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
  constructor() {}

  ngOnInit(): void {}
}
