import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { AssignationTutorResult } from './models/assignation-tutor-result';
import { Observable } from 'rxjs';
import { AssignationTutorDto } from './models/assignation-tutor-dto';

@Injectable({
  providedIn: 'root'
})
export class TutorAssignationService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("AssignationTutor");
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

  /*activateOrDeactivate(dto: any): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }*/
}


