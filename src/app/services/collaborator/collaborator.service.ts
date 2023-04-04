import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../utils/base.service';
import { CollaboratorsResult } from './models/collaborators-result';
import { CreateCollaboratorDto } from './models/create-collaborator-dto';
import { DeleteDto } from '../utils/models/delete-dto';
import { ReportResult } from '../utils/models/report-result';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService extends BaseService
{
  constructor(private http: HttpClient) {
    super();
  }

  getAll(): Observable<CollaboratorsResult[]> {
    return this.http.get<CollaboratorsResult[]>(this.SetRoute('GetAllCollaborators'));
  }

  create(dto: CreateCollaboratorDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('CreateCollaborator'), dto);
  }

  update(dto: CreateCollaboratorDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('UpdateCollaborator'), dto);
  }

  activateOrDeactivate(dto: DeleteDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }

  generatePdf() :Observable<ReportResult>  {
    return this.http.get<ReportResult>(this.SetRoute('GenerateReport'));
  }
}
