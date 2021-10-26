import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { ICard } from './card.model'

@Injectable({
  providedIn: 'root',
})
export class CardService {
  cards: ICard[]
  subjectCard = new Subject<ICard[]>()
  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

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
        console.log(responseData.message)
        newCard.id = responseData.cardID
        this.cards.push(newCard)
        this.subjectCard.next([...this.cards])
      })
  }
}
