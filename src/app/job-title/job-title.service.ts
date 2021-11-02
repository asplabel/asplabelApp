import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IjobTitle } from './job-title.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class JobTitleService {
  jobTitles: IjobTitle[] = []
  subjectJobTitle = new Subject<IjobTitle[]>()

  url: string = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getJobTitles() {
    this.http
      .get<{ message: string; jobTitles: IjobTitle[] }>(
        this.url + '/getJobTitles',
      )
      .subscribe((response: { message: string; jobTitles: IjobTitle[] }) => {
        this.jobTitles = response.jobTitles
        //console.dir(this.jobTitles)
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
        newJobTitle.id = responseData.jobTitle_id
        this.jobTitles.push(newJobTitle)
        this.subjectJobTitle.next([...this.jobTitles])
      })
  }

  deleteJobTitle(id: string) {
    this.http
      .delete(this.url + '/deleteJobTitle/' + id)
      .subscribe((result: { message: string }) => {
        const updatedJobTitles = this.jobTitles.filter(
          (jobtitle) => jobtitle.id != id,
        )
        this.jobTitles = updatedJobTitles
        this.subjectJobTitle.next([...this.jobTitles])
      })
  }

  updateJobTitle(id: string, nombre: string, d_id: string) {
    //console.log(id + ' ' + nombre + ' ' + d_id)
    this.http
      .put(this.url + '/updateJobTitle', {
        id: id,
        name: nombre,
        department_id: d_id,
      })
      .subscribe((response: { message: string }) => {
        //console.log(response)
        this.getJobTitles()
      })
  }
}
