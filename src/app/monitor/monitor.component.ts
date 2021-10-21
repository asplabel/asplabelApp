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
  
  constructor(private recordService: MonitorService) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {
    this.recordService.getRecords()
    this.subRecord = this.recordService
      .getSubjectRecords()
      .subscribe((data: IRecord[]) => {
        this.records = data
        this.dataSource = new MatTableDataSource<IRecord>(this.records)
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
      })
  }

  ngOnDestroy(): void {
    this.subRecord.unsubscribe
  }

  deleteRecord(id: string) {
    console.log(id)
  }
}
