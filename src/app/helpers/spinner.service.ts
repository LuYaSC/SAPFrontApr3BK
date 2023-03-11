import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private _isVisible: boolean = false;

  constructor() {}

  show(): void {
    this._isVisible = true;
  }

  hide(): void {
    this._isVisible = false;
  }

  get isVisible(): boolean {
    return this._isVisible;
  }
}
