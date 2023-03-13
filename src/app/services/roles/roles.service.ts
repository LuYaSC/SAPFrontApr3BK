import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesResult } from './models/roles-result';
import { BaseService } from '../utils/base.service';
import { HttpClient } from '@angular/common/http';
import { RolesDto } from './models/roles-dto';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService
{
  constructor(private http: HttpClient) {
    super();
    this.AssingService("roles");
  }


  getAll(): Observable<RolesResult[]> {
    return this.http.get<RolesResult[]>(this.SetRoute('GetAll'));
  }

  create(dto: RolesDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: RolesDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

  activateOrDeactivate(dto: any): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }
}


