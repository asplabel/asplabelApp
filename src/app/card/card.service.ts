import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ICard } from './card.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: ICard[]
  subjectCard = new Subject<ICard[]>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getCard(id: string) {
    return this.http.get(this.url + '/getCard/' + id)
  }
  getCards() {
    this.http.get(this.url + '/getCards').subscribe((data: ICard[]) => {
      this.cards = data
      this.subjectCard.next([...this.cards])
    })
  }
  getSubjectCards() {
    return this.subjectCard.asObservable()
  }

  addCard(newCard: ICard) {
    this.http
      .post<{ message: string; cardID: string }>(this.url + '/addCard', newCard)
      .subscribe((responseData) => {
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
        this.getCards()
      })
  }

  deleteCard(id: string) {
    this.http
      .delete(this.url + '/deleteCard/' + id)
      .subscribe((result: { message: string }) => {
        this.getCards()
        this._snackBar.open('' + result.message, '', {
          duration: 2000,
        })
      })
  }

  getCardsNotAsigned() {
    this.http
      .get(this.url + '/getCardsNotAsigned')
      .subscribe((data: ICard[]) => {
        this.cards = data
        this.subjectCard.next([...this.cards])
      })
  }

  updateCard(
    id: string,
    uid: string,
    type: string,
    is_active: boolean,
    state: string,
  ) {
    this.http
      .put(this.url + '/updateCard', {
        id: id,
        UID: uid,
        type: type,
        is_active: is_active,
        state: state,
      })
      .subscribe((responseData: { message: string }) => {
        this.getCards()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }
}
