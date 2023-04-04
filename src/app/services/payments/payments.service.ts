import { Injectable } from '@angular/core';
import { BaseService } from '../utils/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentResult } from './models/payment-result';
import { PaymentDetailResult } from './models/payment-detail-result';
import { PaymentDetailDto } from './models/payment-detail-dto';
import { PaymentFilterDto } from './models/payment-filter-dto';
import { PaymentDto } from './models/payment-dto';
import { ReportResult } from '../utils/models/report-result';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
    this.AssingService("Payment");
  }

  getFilter(dto: PaymentFilterDto): Observable<PaymentResult[]> {
    return this.http.post<PaymentResult[]>(this.SetRoute('GetFilter'), dto);
  }

  getAll(): Observable<PaymentResult[]> {
    return this.http.get<PaymentResult[]>(this.SetRoute('GetAll'));
  }

  getDetail(dto: PaymentDetailDto): Observable<PaymentDetailResult> {
    return this.http.post<PaymentDetailResult>(this.SetRoute('GetDetail'), dto);
  }

  create(dto: PaymentDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Create'), dto);
  }

  update(dto: PaymentDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('Update'), dto);
  }

  disableOrEnable(dto: PaymentDetailDto): Observable<string> {
    return this.http.post<string>(this.SetRoute('ActivateOrDeactivate'), dto);
  }

  generatePdf(dto: PaymentFilterDto) :Observable<ReportResult>  {
    return this.http.post<ReportResult>(this.SetRoute('GenerateReport'), dto);
  }
}


