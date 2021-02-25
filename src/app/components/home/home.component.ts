import { HostList } from './../../interfaces/hostList';
import { DatasourceService } from './../../services/datasource.service';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
export class HomeComponent implements OnInit {
  constructor(private datasourceService: DatasourceService) { }
  dataTypes: DataType[] = [
    { value: 'test', showVal: 'Test' },
    { value: 'prod', showVal: 'Prod' }
  ];

  displayedColumns: string[] = ['fromHostName', 'fromIP', 'toHostName', 'toIP', 'ports', 'use', 'status', 'requestId'];
  hostList: HostList[] = [];
  dataSource = new MatTableDataSource(this.hostList);
  selectedOption: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.requestApi('test');
  }
  AfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  sendRequest(): void {
    const type = this.dataTypes.find(data => data.value === this.selectedOption);
    this.requestApi(type.value);
  }

  requestApi(type: string): void {
    this.datasourceService.getList(type).subscribe(data => {
      this.hostList = data;
      this.dataSource = new MatTableDataSource(this.hostList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
}
