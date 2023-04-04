import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AssignationRoomDto } from './models/assignation-room-dto';
import { AssignationRoomResult } from './models/assignation-room-result';
import { AssignationRoomDetailResult } from './models/assignation-room-detail-result';
import { AssignationRoomDetailDto } from './models/assignation-room-detail-dto';
import { ReportResult } from '../utils/models/report-result';

@Injectable({
  providedIn: 'root'
})
export class RoomAssignationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("AssignationRoom");
  }

  getFilter(dto: AssignationRoomDto): Observable<AssignationRoomResult[]> {
    return this.http.post<AssignationRoomResult[]>(this.SetRoute('GetFilter'), dto);
  }

  getAll(): Observable<AssignationRoomResult[]> {
    return this.http.get<AssignationRoomResult[]>(this.SetRoute('GetAll'));
  }

  create(dto: AssignationRoomDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: AssignationRoomDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

  disableOrEnable(dto: AssignationRoomDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('DisableOrEnable'), dto);
  }

  getDetail(dto: AssignationRoomDetailDto): Observable<AssignationRoomDetailResult> {
    return this.http.post<AssignationRoomDetailResult>(this.SetRoute('GetDetail'), dto);
  }

  generatePdf() :Observable<ReportResult>  {
    return this.http.get<ReportResult>(this.SetRoute('GenerateReport'));
  }
}


