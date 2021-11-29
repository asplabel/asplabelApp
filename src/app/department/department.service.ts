import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { IDepartment } from './department.model'

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departments: IDepartment[]
  subjectDepartment = new Subject<IDepartment[]>()

  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getDepartments() {
    this.http
      .get<{ message: string; departments: IDepartment[] }>(
        this.url + '/getDepartments',
      )
      .subscribe((departmentsData: { departments: IDepartment[] }) => {
        this.departments = departmentsData.departments
        this.subjectDepartment.next([...this.departments])
      })
  }

  getSubjectDepartments() {
    return this.subjectDepartment.asObservable()
  }

  addDepartment(newDepartment: IDepartment) {
    this.http
      .post<{ message: string; department_id: string }>(
        this.url + '/addDepartment',
        newDepartment,
      )
      .subscribe((responseData: { message: string }) => {
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
    this.getDepartments()
  }

  deleteDepartment(id: string) {
    this.http
      .delete(this.url + '/deleteDepartment/' + id)
      .subscribe((result: { message: string }) => {
        this.getDepartments()
        this._snackBar.open('' + result.message, '', {
          duration: 2000,
        })
      })
  }

  updateDepartment(id: string, name: string) {
    this.http
      .put(this.url + '/updateDepartment', {
        id: id,
        name: name,
      })
      .subscribe((response: { message: string }) => {
        this.getDepartments()
        this._snackBar.open('' + response.message, '', {
          duration: 2000,
        })
      })
  }
}
