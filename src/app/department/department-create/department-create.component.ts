import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'
import { IDepartment } from '../department.model'
import { DepartmentService } from '../department.service'
import { Location } from '@angular/common'


@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css'],
})
export class DepartmentCreateComponent implements OnInit {
  constructor(
    public departmentService: DepartmentService,
    private _location: Location,
  ) {}

  ngOnInit(): void {}

  addDepartment(form: NgForm) {
    if (form.invalid) {
      return
    }
    const newDepartment: IDepartment = {
      id: null,
      name: form.value.nameDepartment,
    }
    this.departmentService.addDepartment(newDepartment)
    form.reset()
    alert
    this._location.back()
  }
}
