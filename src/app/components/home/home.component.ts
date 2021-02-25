import { HostList } from './../../interfaces/hostList';
import { DatasourceService } from './../../services/datasource.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface DataType {
  value: string;
  showVal: string;
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(private datasourceService: DatasourceService) { }
  dataTypes: DataType[] = [
    { value: 'test', showVal: 'Test' },
    { value: 'prod', showVal: 'Prod' }
  ];

  displayedColumns: string[] = ['fromHostName', 'fromIP', 'toHostName', 'toIP', 'ports', 'use', 'status', 'requestId'];
  hostList: HostList[] = [];
  dataSource = new MatTableDataSource(this.hostList);


  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.datasourceService.getList('test').subscribe(data => {
      this.hostList = data;
      this.dataSource = new MatTableDataSource(this.hostList);

    });
  }
  ngAfterViewInit(): void {

    this.dataSource.sort = this.sort;
  }
}
