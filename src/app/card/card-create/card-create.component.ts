import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'
import { ICard } from '../card.model'
import { CardService } from '../card.service'

@Component({
  selector: 'app-card-create',
  templateUrl: './card-create.component.html',
  styleUrls: ['./card-create.component.css'],
})
export class CardCreateComponent implements OnInit {
  type = ''
  constructor(private cardService: CardService, private _location: Location, private _route: Router) {}

  ngOnInit(): void {}

  addCard(form: NgForm) {
    if (form.invalid) return
    let card: ICard = {
      _id: null,
      UID: form.value.cardName,
      type: form.value.type,
      is_active: false,
      is_user: false,
      state: 'Salida',
      user_id: null,
      firstname: null,
      lastname: null,
    }
    this.cardService.addCard(card)
    form.reset()
    this._route.navigateByUrl('/card/list')
    //this._location.back()
  }
}
