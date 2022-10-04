import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { KidsResult } from './models/kids-result';

@Injectable({
  providedIn: 'root'
})
export class KidService extends BaseService{

  constructor(private http: HttpClient) {
    super();
    this.AssingService('Kid');
  }

  /*getById(dto: GetTypeByIdDto) {
    return this.http.post<GetTypeResult>(this.SetRoute('GetById'), dto);
  }*/

  getAll(): Observable<KidsResult[]> {
    return this.http.get<KidsResult[]>(this.SetRoute('GetAllKids'));
  }
}
