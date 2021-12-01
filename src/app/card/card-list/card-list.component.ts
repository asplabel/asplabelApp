import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { CardEditComponent } from '../card-edit/card-edit.component'
import { ICard } from '../card.model'
import { CardService } from '../card.service'
import { MatSnackBar } from '@angular/material/snack-bar'

export interface cardData {
  id: string
  UID: string
  type: string
  is_active: boolean
  state: string
}
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
  isLoading: boolean
  isData: boolean

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  constructor(private cardService: CardService, public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.isLoading = true
    this.isData = true
    this.cardService.getCards()
    this.subCard = this.cardService
      .getSubjectCards()
      .subscribe((data: ICard[]) => {
        this.cards = data
        this.dataSource = new MatTableDataSource<ICard>(this.cards)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.cards.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
        this.isLoading = false
      })
  }

  ngAfterViewInit() {
    this.cardService.getCards()
    this.subCard = this.cardService
      .getSubjectCards()
      .subscribe((data: ICard[]) => {
        this.cards = data
        this.dataSource = new MatTableDataSource<ICard>(this.cards)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.cards.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
      })
  }

  ngOnDestroy() {
    this.subCard.unsubscribe()
  }

  deleteCard(id: string) {
    this._snackBar
      .open('¿Desea eliminar la tarjeta?', 'Sí', { duration: 3000 })
      .onAction()
      .subscribe(() => {
        this.cardService.deleteCard(id)
      })
  }

  openDialog(id: string): void {
    this.cardService.getCard(id).subscribe((data: cardData) => {
      const dialogRef = this.dialog.open(CardEditComponent, {
        width: '650px',
        data: {
          id: id,
          UID: data.UID,
          type: data.type,
          is_active: data.is_active,
          state: data.state,
        },
      })
      dialogRef.afterClosed().subscribe((result: cardData) => {
        if (result != undefined) {
          console.log(result)
          this.cardService.updateCard(
            id,
            result.UID,
            result.type,
            result.is_active,
            result.state,
          )
        }
      })
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
