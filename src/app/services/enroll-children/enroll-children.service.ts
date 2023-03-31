import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { HttpClient } from '@angular/common/http';
import { EnrolledChildrenDto } from './models/enrolled-children-dto';
import { Observable } from 'rxjs';
import { EnrolledChildrenResult } from './models/enrolled-children-result';
import { EnrollChildrenDetailResult } from 'src/app/services/enroll-children/models/enroll-children-detail-result';
import { EnrollFilterDto } from 'src/app/services/enroll-children/models/enroll-filter-dto';

@Injectable({
  providedIn: 'root'
})
export class EnrollChildrenService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("EnrolledChildren");
  }

  getFilter(dto: EnrollFilterDto): Observable<EnrolledChildrenResult[]> {
    return this.http.post<EnrolledChildrenResult[]>(this.SetRoute('GetFilter'), dto);
  }

  getAll(): Observable<EnrolledChildrenResult[]> {
    return this.http.get<EnrolledChildrenResult[]>(this.SetRoute('GetAll'));
  }

  getDetail(dto: EnrolledChildrenDto): Observable<EnrollChildrenDetailResult> {
    return this.http.post<EnrollChildrenDetailResult>(this.SetRoute('GetDetail'), dto);
  }

  create(dto: EnrolledChildrenDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: EnrolledChildrenDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

  disableOrEnable(dto: EnrolledChildrenDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }
}


