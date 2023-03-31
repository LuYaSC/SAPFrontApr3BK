import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { KidsResult } from './models/kids-result';
import { CreateKidDto } from './models/create-kid-dto';
import { KidByIdDto } from './models/kid-by-id-dto';
import { GetDetailKidResult } from 'src/app/services/kid/models/get-detail-kid-result';

@Injectable({
  providedIn: 'root'
})
export class KidService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  /*getById(dto: GetTypeByIdDto) {
    return this.http.post<GetTypeResult>(this.SetRoute('GetById'), dto);
  }*/

  getAll(): Observable<KidsResult[]> {
    return this.http.get<KidsResult[]>(this.SetRoute('GetAllKids'));
  }

  create(dto: CreateKidDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('CreateKid'), dto);
  }

  update(dto: CreateKidDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('UpdateKid'), dto);
  }

  activateOrDeactivate(dto: any): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }

  getDetail(dto: KidByIdDto): Observable<GetDetailKidResult[]> {
    return this.http.post<GetDetailKidResult[]>(this.SetRoute('GetDetailKid'), dto);
  }
}
