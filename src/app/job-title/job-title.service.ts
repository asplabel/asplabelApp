import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IjobTitle } from './job-title.model'
import { HttpClient } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root',
})
export class JobTitleService {
  jobTitles: IjobTitle[] = []
  subjectJobTitle = new Subject<IjobTitle[]>()

  url: string =  environment.apiUrl
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {}

  getJobTitles() {
    this.http
      .get<{ message: string; jobTitles: IjobTitle[] }>(
        this.url + '/getJobTitles',
      )
      .subscribe((response: { message: string; jobTitles: IjobTitle[] }) => {
        this.jobTitles = response.jobTitles
        this.subjectJobTitle.next([...this.jobTitles])
      })
  }

  getSubjectJobTitles() {
    return this.subjectJobTitle.asObservable()
  }

  addJobTitle(newJobTitle: IjobTitle) {
    this.http
      .post<{ message: string; jobTitle_id: string }>(
        this.url + '/addJobTitle',
        newJobTitle,
      )
      .subscribe((responseData) => {
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
        this.getJobTitles()
      })
  }

  deleteJobTitle(id: string) {
    this.http
      .delete(this.url + '/deleteJobTitle/' + id)
      .subscribe((responseData: { message: string }) => {
        this.getJobTitles()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }

  updateJobTitle(id: string, nombre: string, d_id: string) {
    this.http
      .put(this.url + '/updateJobTitle', {
        id: id,
        name: nombre,
        department_id: d_id,
      })
      .subscribe((responseData: { message: string }) => {
        this.getJobTitles()
        this._snackBar.open('' + responseData.message, '', {
          duration: 2000,
        })
      })
  }
}
