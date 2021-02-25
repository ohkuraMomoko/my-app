import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostList } from '../interfaces/hostList';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class DatasourceService {
  constructor(private http: HttpClient) { }

  public getList(type: string): Observable<HostList[]> {
    return this.http.get<HostList[]>(`https://localhost:5001/Peach/list/${type}`);
  }
}
