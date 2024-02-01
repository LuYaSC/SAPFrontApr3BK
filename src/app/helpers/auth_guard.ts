import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService } from './../services/storage.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard  {
  constructor(public storageService: StorageService, public router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['login']);
    }
    return true;
  }
}
