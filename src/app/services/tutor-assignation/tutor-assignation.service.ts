import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { AssignationTutorResult } from './models/assignation-tutor-result';
import { Observable } from 'rxjs';
import { AssignationTutorDto } from './models/assignation-tutor-dto';
import { ReportResult } from '../utils/models/report-result';

@Injectable({
  providedIn: 'root'
})
export class TutorAssignationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("AssignationTutor");
  }

  getFilter(dto: AssignationTutorDto): Observable<AssignationTutorResult[]> {
    return this.http.post<AssignationTutorResult[]>(this.SetRoute('GetFilter'), dto);
  }

  getAll(): Observable<AssignationTutorResult[]> {
    return this.http.get<AssignationTutorResult[]>(this.SetRoute('GetAll'));
  }

  create(dto: AssignationTutorDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: AssignationTutorDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

  disableOrEnable(dto: AssignationTutorDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('DisableOrEnable'), dto);
  }

  generatePdf() :Observable<ReportResult>  {
    return this.http.get<ReportResult>(this.SetRoute('GenerateReport'));
  }
}


