import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { CreateParentDto } from './models/create-parent-dto';
import { ParentsResult } from './models/parents-result';

@Injectable({
  providedIn: 'root'
})
export class ParentService  extends BaseService
{

  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<any[]> {
    return this.http.get<ParentsResult[]>(this.SetRoute('GetAllParents'));
  }

  create(dto: CreateParentDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('CreateParent'), dto);
  }

  update(dto: CreateParentDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('UpdateParent'), dto);
  }

  activateOrDeactivate(dto: any): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }
}
