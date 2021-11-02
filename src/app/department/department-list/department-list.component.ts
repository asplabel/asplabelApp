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
import { DepartmentEditComponent } from '../department-edit/department-edit.component'
import { IDepartment } from '../department.model'
import { DepartmentService } from '../department.service'

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent
  implements AfterViewInit, OnDestroy, OnInit {
  displayedColumns: string[] = ['name', 'action']
  departments: IDepartment[] = []
  subDepartment: Subscription
  dataSource: MatTableDataSource<IDepartment>

  constructor(
    public departmentService: DepartmentService,
    public dialog: MatDialog,
  ) {}

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.departmentService.getDepartments()
    this.subDepartment = this.departmentService
      .getSubjectDepartments()
      .subscribe((data: IDepartment[]) => {
        this.departments = data
        this.dataSource = new MatTableDataSource<IDepartment>(this.departments)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      })
  }

  ngOnDestroy(): void {
    this.subDepartment.unsubscribe()
  }

  deleteDepartment(id: string) {
    this.departmentService.deleteDepartment(id)
  }

  openDialog(id: string, name: string): void {
    const dialogRef = this.dialog.open(DepartmentEditComponent, {
      width: '450px',
      data: { id: id, name: name },
    })

    dialogRef.afterClosed().subscribe((result) => {
      this.departmentService.updateDepartment(id, result)
    })
  }
}
