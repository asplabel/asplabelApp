import { Component, Inject, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { IDepartment } from 'src/app/department/department.model'
import { DepartmentService } from 'src/app/department/department.service'
import { IjobTitle } from '../job-title.model'

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog'

export interface jobTitleData {
  id: string
  nombre: string
  department_id: string
}

@Component({
  selector: 'app-job-title-edit',
  templateUrl: './job-title-edit.component.html',
  styleUrls: ['./job-title-edit.component.css'],
})
export class JobTitleEditComponent implements OnInit {
  selected = 'none'
  jobTitle_id: string
  jobTitle: IjobTitle

  departments: IDepartment[]
  subDepartments: Subscription
  constructor(
    public departmentService: DepartmentService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<JobTitleEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: jobTitleData,
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments()
    this.subDepartments = this.departmentService
      .getSubjectDepartments()
      .subscribe((data: IDepartment[]) => {
        this.departments = data
      })
  }

  onNoClick() {
    this.dialogRef.close()
  }
}
