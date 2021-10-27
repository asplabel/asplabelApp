import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { Subscription } from 'rxjs'
import { IjobTitle } from '../job-title.model'
import { JobTitleService } from '../job-title.service'

@Component({
  selector: 'app-job-title-list',
  templateUrl: './job-title-list.component.html',
  styleUrls: ['./job-title-list.component.css'],
})
export class JobTitleListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'department_name', 'action']
  jobTitles: IjobTitle[] = []
  subJobTitle: Subscription
  dataSource: MatTableDataSource<IjobTitle>

  constructor(public jobTitleService: JobTitleService) {}

  @ViewChild(MatSort) sort: MatSort

  ngOnInit() {}

  ngAfterViewInit() {
    this.jobTitleService.getJobTitles()
    this.subJobTitle = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data: IjobTitle[]) => {
        this.jobTitles = data
        this.dataSource = new MatTableDataSource<IjobTitle>(this.jobTitles)
        this.dataSource.sort = this.sort
      })
  }

  ngOnDestroy(): void {
    this.subJobTitle.unsubscribe()
  }

  deleteJobTitle(id: string) {
    //console.log(id)
    this.jobTitleService.deleteJobTitle(id)
  }
  editJobTitle(id: string) {
    console.log(id)
    //this.jobTitleService.deleteJobTitle(id)
  }
}
