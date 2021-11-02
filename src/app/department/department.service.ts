import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { IDepartment } from './department.model'

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departments: IDepartment[] = []
  subjectDepartment = new Subject<IDepartment[]>()

  url: string = 'http://localhost:3000'

  constructor(private http: HttpClient) {}

  getDepartments() {
    this.http
      .get<{ message: string; departments: any }>(this.url + '/getDepartments')
      .pipe(
        map((departmentData) => {
          return departmentData.departments.map((department) => {
            return {
              id: department._id,
              name: department.name,
            }
          })
        }),
      )
      .subscribe((departmentsData) => {
        this.departments = departmentsData
        //console.log(jobTitlesData.message)
        this.subjectDepartment.next([...this.departments])
      })
    //return [...this.jobTitles]
  }

  getSubjectDepartments() {
    return this.subjectDepartment.asObservable()
  }

  getOneDepartment(id: String) {
    return { ...this.departments.find((department) => department.id === id) }
  }

  addDepartment(newDepartment: IDepartment) {
    this.http
      .post<{ message: string; department_id: string }>(
        this.url + '/addDepartment',
        newDepartment,
      )
      .subscribe((responseData) => {
        console.log(responseData.message)
        newDepartment.id = responseData.department_id
        this.departments.push(newDepartment)
        this.subjectDepartment.next([...this.departments])
      })
  }

  deleteDepartment(id: string) {
    this.http
      .delete(this.url + '/deleteDepartment/' + id)
      .subscribe((result: { message: string }) => {
        const updatedDepartments = this.departments.filter(
          (department) => department.id != id,
        )
        this.departments = updatedDepartments
        this.subjectDepartment.next([...this.departments])
        console.log(result.message)
      })
  }

  updateDepartment(id: string, name: string) {
    this.http
      .put(this.url + '/updateDepartment', {
        id: id,
        name: name,
      })
      .subscribe((response: { message: string }) => {
        console.log(response)
        this.getDepartments()
      })
  }
}
