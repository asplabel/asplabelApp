import { Location } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import { IDepartment } from 'src/app/department/department.model'
import { DepartmentService } from 'src/app/department/department.service'
import { IjobTitle } from '../job-title.model'
import { JobTitleService } from '../job-title.service'

@Component({
  selector: 'app-job-title-create',
  templateUrl: './job-title-create.component.html',
  styleUrls: ['./job-title-create.component.css'],
})
export class JobTitleCreateComponent implements OnInit {
  name = ''
  selected = 'none'
  departments: IDepartment[]
  subDepartments: Subscription

  constructor(
    public jobTitleService: JobTitleService,
    public departmentService: DepartmentService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    this.departmentService.getDepartments()
    this.subDepartments = this.departmentService
      .getSubjectDepartments()
      .subscribe((data: IDepartment[]) => {
        this.departments = data
      })
  }

  addJobTitle(form: NgForm) {
    if (form.invalid) {
      return
    }
    let jobTitle: IjobTitle
    if (form.value.selected == 'none') {
      jobTitle = {
        id: null,
        name: form.value.nameJobTitle,
        department_id: null,
        department_name: null,
      }
    } else {
      jobTitle = {
        id: null,
        name: form.value.nameJobTitle,
        department_id: form.value.selected,
        department_name: null,
      }
      form.reset()
    }
    this.jobTitleService.addJobTitle(jobTitle)
    this._location.back()
  }
}
