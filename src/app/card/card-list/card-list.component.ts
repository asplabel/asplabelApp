import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { ICard } from '../card.model'
import { CardService } from '../card.service'

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css'],
})
export class CardListComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'UID',
    'type',
    'is_active',
    'state',
    'firstname',
    'lastname',
    'options',
  ]
  subCard: Subscription
  cards: ICard[] = []
  dataSource: MatTableDataSource<ICard>

  @ViewChild(MatSort) sort: MatSort
  constructor(private cardService: CardService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.cardService.getCards()
    this.subCard = this.cardService
      .getSubjectCards()
      .subscribe((data: ICard[]) => {
        this.cards = data
        this.dataSource = new MatTableDataSource<ICard>(this.cards)
        this.dataSource.sort = this.sort
      })
  }

  ngOnDestroy() {
    this.subCard.unsubscribe()
  }

  deleteCard() {}
  editCard() {}
}
