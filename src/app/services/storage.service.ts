import { Injectable } from '@angular/core';
import { TokenDecodeDto } from './token-decode-dto';
import jwt_decode from 'jwt-decode';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    let decode: TokenDecodeDto = jwt_decode(user.token);
    let us = JSON.stringify(user);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, decode.userName);
    window.sessionStorage.setItem('token', user.token);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
