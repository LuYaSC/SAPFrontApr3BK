import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  AUTH_API = 'https://localhost:44360/api/';
  public httpHeader: any;
  public controller = '';
  public storageService = new StorageService();

  constructor() {
  }

  public AssingService(nameService: string) {
    this.controller = nameService;
  }

  public SetRoute(method: string): string {
    return this.AUTH_API + this.controller + '/' + method;
  }

  public SetToken(): any {
    return this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ` + this.storageService.getToken()
    });
  }
}
