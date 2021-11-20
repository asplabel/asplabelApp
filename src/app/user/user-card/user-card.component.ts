
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { ICard } from 'src/app/card/card.model'
import { CardService } from 'src/app/card/card.service'
import { IUser } from '../user.model'
import { UserService } from '../user.service'

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  cards: ICard[]
  userid: string
  user: IUser
  subCard: Subscription
  selected = ''
  constructor(
    public cardService: CardService,
    public userService: UserService,
    public route: ActivatedRoute,
    private _route: Router,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.userid = paramMap.get('id')
        this.userService.getUser(this.userid).subscribe((user: IUser) => {
          this.user = user
        })
      }
    })
    this.cardService.getCardsNotAsigned()
    this.subCard = this.cardService
      .getSubjectCards()
      .subscribe((data: ICard[]) => {
        this.cards = data
      })
  }
  quitarTarjeta() {
    this.userService.quitarTarjeta(this.userid)
    this._route.navigateByUrl('/user/list')
  }
  asignCard(form: NgForm) {
    if (form.invalid) {
      return
    }
    this.userService.asignarTarjeta(this.userid, form.value.selected)
    form.reset()
    this._route.navigateByUrl('/user/list')
  }
}
