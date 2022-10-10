import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';

@Injectable({
  providedIn: 'root'
})
export class ParentService  extends BaseService
{

  constructor(private http: HttpClient) {
    super();
  }

  /*getById(dto: GetTypeByIdDto) {
    return this.http.post<GetTypeResult>(this.SetRoute('GetById'), dto);
  }*/

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.SetRoute('GetAllParents'));
  }
}
