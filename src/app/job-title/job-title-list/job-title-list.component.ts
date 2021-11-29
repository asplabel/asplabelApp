import {
  AfterViewInit,
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { JobTitleEditComponent } from '../job-title-edit/job-title-edit.component'
import { Subscription } from 'rxjs'
import { IjobTitle } from '../job-title.model'
import { JobTitleService } from '../job-title.service'
import { MatSnackBar } from '@angular/material/snack-bar'

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
  isLoading: boolean = true
  isData: boolean = true

  constructor(
    public jobTitleService: JobTitleService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator
  ngOnInit() {
    this.isLoading = true
    this.isData = true
    this.jobTitleService.getJobTitles()
    this.subJobTitle = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data: IjobTitle[]) => {
        this.jobTitles = data
        this.dataSource = new MatTableDataSource<IjobTitle>(this.jobTitles)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.jobTitles.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
        this.isLoading = false
      })
  }

  ngAfterViewInit() {
    this.jobTitleService.getJobTitles()
    this.subJobTitle = this.jobTitleService
      .getSubjectJobTitles()
      .subscribe((data: IjobTitle[]) => {
        this.jobTitles = data
        this.dataSource = new MatTableDataSource<IjobTitle>(this.jobTitles)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
        if (this.jobTitles.length > 0) {
          this.isData = true
        } else {
          this.isData = false
        }
      })
  }

  ngOnDestroy(): void {
    this.subJobTitle.unsubscribe()
  }

  deleteJobTitle(id: string) {
    this._snackBar
      .open('¿Desea eliminar el cargo?', 'Sí', { duration: 3000 })
      .onAction()
      .subscribe(() => {
        this.jobTitleService.deleteJobTitle(id)
      })
  }

  openDialog(id: string, name: string, department_id: string): void {
    const dialogRef = this.dialog.open(JobTitleEditComponent, {
      width: '450px',
      data: { id: id, name: name, department_id: department_id },
    })
    dialogRef
      .afterClosed()
      .subscribe((result: { nombre: string; d_id: string }) => {
        if (result) {
          this.jobTitleService.updateJobTitle(id, result.nombre, result.d_id)
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}
