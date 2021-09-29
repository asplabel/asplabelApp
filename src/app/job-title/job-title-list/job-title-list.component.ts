import {
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnInit,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { IjobTitle } from '../job-title.model'

@Component({
  selector: 'app-job-title-list',
  templateUrl: './job-title-list.component.html',
  styleUrls: ['./job-title-list.component.css'],
})
export class JobTitleListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['name', 'departmentName', 'action']

  @Input() jobTitles: IjobTitle[] = []

  dataSource = new MatTableDataSource<IjobTitle>()

  constructor() {}

  @ViewChild(MatSort) sort: MatSort

  ngOnInit() {
    this.dataSource = new MatTableDataSource<IjobTitle>(this.jobTitles)
  }
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<IjobTitle>(this.jobTitles)
    this.dataSource.sort = this.sort
  }
}
