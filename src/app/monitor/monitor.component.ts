import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { MonitorService } from './monitor.service'
import { IRecord } from './record.model'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
})
export class MonitorComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'firstname',
    'lastname',
    'date',
    'time',
    'type',
    'actions',
  ]
  records: IRecord[] = []
  subRecord: Subscription
  dataSource: MatTableDataSource<IRecord>
  isLoading: boolean
  isData: boolean

  constructor(
    private recordService: MonitorService,
    private _snackBar: MatSnackBar,
  ) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.isLoading = true
    this.isData = true
    this.recordService.getRecords()
    this.subRecord = this.recordService
      .getSubjectRecords()
      .subscribe((data) => {
        this.records = data
        this.dataSource = new MatTableDataSource<IRecord>(this.records)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.records.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
        this.isLoading = false
      })
  }

  ngAfterViewInit() {
    this.recordService.getRecords()
    this.subRecord = this.recordService
      .getSubjectRecords()
      .subscribe((data) => {
        this.records = data
        this.dataSource = new MatTableDataSource<IRecord>(this.records)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.records.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
      })
  }

  ngOnDestroy(): void {
    this.subRecord.unsubscribe
    this._snackBar.ngOnDestroy()
  }

  deleteRecord(id: string) {
    this._snackBar
      .open('¿Desea eliminar el registro?', 'Sí', { duration: 2000 })
      .onAction()
      .subscribe(() => {
        this.recordService.deleteRecord(id)
      })
  }
}
