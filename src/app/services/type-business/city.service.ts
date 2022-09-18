import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { CreateTypeDto } from './models/create-type-dto';
import { GetTypeByIdDto } from './models/get-type-by-id-dto';
import { GetTypeResult } from './models/get-type-result';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService{

  constructor(private http: HttpClient) {
    super();
    this.controller = 'city';
  }

  getById(dto: GetTypeByIdDto) {
    return this.http.post(this.SetRoute('GetById'), dto);
  }

  getAll(): Observable<any> {
    return this.http.get(this.SetRoute('GetAll'));
  }

  create(dto: CreateTypeDto) {
    return this.http.post(this.SetRoute('Create'), dto);
  }

  update(dto: GetTypeByIdDto) {
    return this.http.post(this.SetRoute('Update'), dto);
  }

}
