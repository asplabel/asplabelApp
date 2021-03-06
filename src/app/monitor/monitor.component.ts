import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MonitorService } from './monitor.service';
import { IRecord } from './record.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';
import { DatePipe } from '@angular/common';
import { ExcelService } from './excel.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css'],
  providers: [DatePipe],
})
export class MonitorComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['firstname', 'date', 'time', 'type', 'actions'];
  records: IRecord[] = [];
  subRecord: Subscription;
  dataSource: MatTableDataSource<IRecord>;
  isLoading: boolean;
  isData: boolean;
  filterData: string = '';
  isFiltered: boolean = false;

  constructor(
    private recordService: MonitorService,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private datePipe: DatePipe,
    private excelService:ExcelService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.isLoading = true;
    this.isData = true;
    this.recordService.getRecords();
    this.subRecord = this.recordService
      .getSubjectRecords()
      .subscribe((data) => {
        this.records = data;
        this.dataSource = new MatTableDataSource<IRecord>(this.records);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        if (this.records.length > 0) {
          this.isData = true;
        } else {
          this.isData = false;
        }
        this.isLoading = false;
      });
    /*setInterval(()=>{
        if (!this.authService.getIsAuthenticated()){
          this.ngOnDestroy()
          return
        }
        this.ngAfterViewInit()
        //this.applyFilter()
      },5000)*/
  }

  ngAfterViewInit() {
    this.recordService.getRecords();
    this.subRecord = this.recordService
      .getSubjectRecords()
      .subscribe((data) => {
        this.records = data;
        //console.log('New data')
        this.dataSource = new MatTableDataSource<IRecord>(this.records);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.filter = this.filterData.trim().toLowerCase();
        if (this.records.length > 0) {
          this.isData = true;
        } else {
          this.isData = false;
        }
      });
  }

  clearFilter(): void {
    this.isFiltered = false;
    this.dataSource = new MatTableDataSource<IRecord>(this.records);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  filterToday(firstname: string, lastname: string, date: string): void {
    if (this.isFiltered) {
      this.clearFilter();
    } else {
      this.isFiltered = true;
      let dataFiltered = this.records.filter(
        (el) =>
          `${el.firstname} ${el.lastname}` === `${firstname} ${lastname}` &&
          el.date === date
      );
      this.dataSource = new MatTableDataSource<IRecord>(dataFiltered);
    }
  }

  ngOnDestroy(): void {
    this.subRecord.unsubscribe;
    this._snackBar.ngOnDestroy();
  }

  deleteRecord(id: string) {
    this._snackBar
      .open('??Desea eliminar el registro?', 'S??', { duration: 2000 })
      .onAction()
      .subscribe(() => {
        this.recordService.deleteRecord(id);
      });
  }

  applyFilter(filterValue: string) {
    //const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportAsXLSX():void {
    this.excelService.exportAsExcelFile(this.dataSource.data, 'asplabel_data');
  }
}
