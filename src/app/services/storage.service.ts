import { Injectable } from '@angular/core';
import { TokenDecodeDto } from './token-decode-dto';
import jwt_decode from 'jwt-decode';
import { LoginResponse } from './models/login-response';
import { Observable } from 'rxjs';

const USER_NAME = 'user';
const EXPIRATION_DATE = 'expiration-date';
const TOKEN = 'token';
const ROLES = 'roles';
const IS_LOGGED = 'logged';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() { }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: LoginResponse): void {
    debugger
    let decode: TokenDecodeDto = jwt_decode(user.token);
    window.sessionStorage.setItem(USER_NAME, decode.userName);
    window.sessionStorage.setItem(TOKEN, user.token);
    window.sessionStorage.setItem(EXPIRATION_DATE, decode.exp.toString());
    window.sessionStorage.setItem(ROLES, JSON.stringify(decode.roles));
    window.sessionStorage.setItem(ROLES, JSON.stringify(decode.roles));
    window.sessionStorage.setItem(IS_LOGGED, user.isValid ? '1' : '0');
  }

  public logout() {
    debugger;
    window.sessionStorage.clear();
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.removeItem(EXPIRATION_DATE);
    window.sessionStorage.removeItem(TOKEN);

  }

  public validateExpiration(): boolean {
    debugger
    let expirationDate = Number(window.sessionStorage.getItem(EXPIRATION_DATE));
    let actualDate = new Date().getTime();
    if (actualDate > expirationDate) {
      this.logout();
      return false;
    } else {
      return true;
    }
  }

  public getUser(): string | null {
    return window.sessionStorage.getItem(USER_NAME);
  }

  public getToken(): string {
    let token = window.sessionStorage.getItem(TOKEN) || '';
    return token;
  }

  public isLoggedIn(): boolean {
    const logged = window.sessionStorage.getItem(IS_LOGGED);

    if (logged !== null && logged === '1' ) {
      return true;
    } else {
      return false;
    }
  }
}
