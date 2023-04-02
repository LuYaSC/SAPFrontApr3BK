import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardResult } from './models/dashboard-result';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("Dashboard");
  }

  getData(): Observable<DashboardResult> {
    return this.http.get<DashboardResult>(this.SetRoute('GetData'));
  }
}
