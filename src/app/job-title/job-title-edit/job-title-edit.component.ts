import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs'
import { IDepartment } from 'src/app/department/department.model'
import { DepartmentService } from 'src/app/department/department.service'
import { IjobTitle } from '../job-title.model'
import { JobTitleService } from '../job-title.service'

@Component({
  selector: 'app-job-title-edit',
  templateUrl: './job-title-edit.component.html',
  styleUrls: ['./job-title-edit.component.css'],
})
export class JobTitleEditComponent implements OnInit {
  name = ''
  selected = 'none'
  jobTitle_id: string
  jobTitle: IjobTitle

  departments: IDepartment[]
  subDepartments: Subscription
  constructor(
    public jobTitleService: JobTitleService,
    public route: ActivatedRoute,
    public departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((url: ParamMap) => {
      this.jobTitle_id = url.get('id')
      this.jobTitle = this.jobTitleService.getOneJobTitle(this.jobTitle_id)
      this.selected = this.jobTitle.department_id
    })
    this.departmentService.getDepartments()
    this.subDepartments = this.departmentService
      .getSubjectDepartments()
      .subscribe((data: IDepartment[]) => {
        this.departments = data
      })
  }

  editJobTitle(form: NgForm) {
    if (form.invalid) {
      return
    }
    let jobTitle: IjobTitle
    if (form.value.selected == 'none') {
      jobTitle = {
        id: null,
        name: form.value.nameJobTitle,
        department_id: null,
      }
    } else {
      jobTitle = {
        id: null,
        name: form.value.nameJobTitle,
        department_id: form.value.selected,
      }
      form.reset()
    }
    this.jobTitleService.addJobTitle(jobTitle)
  }
}
