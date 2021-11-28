import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'
import { IRecord } from './record.model'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class MonitorService {
  records: IRecord[] = []
  subjectRecord = new Subject<IRecord[]>()

  url: string = 'http://localhost:3000'
  constructor(private http: HttpClient) {}

  getRecords() {
    this.http
      .get<{ message: string; records: any }>(this.url + '/getRecords')
      .pipe(
        map((recordData) => {
          return recordData.records.map((record) => {
            return {
              id: record._id,
              firstname: record.firstname,
              lastname: record.lastname,
              date: record.date,
              time: record.time,
              type: record.type,
            }
          })
        }),
      )
      .subscribe((recordsData) => {
        this.records = recordsData
        this.subjectRecord.next([...this.records])
      })
  }

  getSubjectRecords() {
    return this.subjectRecord.asObservable()
  }

  deleteRecord(id: string) {
    this.http
      .delete(this.url + '/deleteRecord/' + id)
      .subscribe((result: { message: string }) => {
        const updatedRecords = this.records.filter((record) => record.id != id)
        this.records = updatedRecords
        this.subjectRecord.next([...this.records])
        console.log(result.message)
      })
  }
}
