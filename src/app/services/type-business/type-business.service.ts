import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { CreateUpdateTypeBusinessDto } from './models/create-update-type-business-dto';
import { GetTypeByIdDto } from './models/get-type-by-id-dto';
import { GetTypeResult } from './models/get-type-result';

@Injectable({
  providedIn: 'root'
})
export class TypeBusinessService extends BaseService{

  constructor(private http: HttpClient) {
    super();
  }

  getById(dto: GetTypeByIdDto) {
    return this.http.post<GetTypeResult>(this.SetRoute('GetById'), dto);
  }

  getAll(): Observable<GetTypeResult[]> {
    return this.http.get<GetTypeResult[]>(this.SetRoute('GetAll'));
  }

  create(dto: CreateUpdateTypeBusinessDto) {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: CreateUpdateTypeBusinessDto) {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

}
