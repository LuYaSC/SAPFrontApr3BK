import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  token: string = "5dadbb1d-03fc-11ed-baea-7640edfdd6b4";
  res: any;
  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpResponse<any>> {
    debugger
    console.info('req.headers =', req.headers, ';');
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        debugger
        let resValid = event instanceof HttpResponse;
        this.res = event;

        if (resValid && this.res !== undefined && this.res.status == 200 && this.res.body.isOk) {
          console.info('valid' + JSON.stringify(this.res.body));
          return this.res.body.body;
        }
        if (resValid && this.res !== undefined && !this.res.body.isOk) {
          console.info('no valid  =', this.res.body.mesaage, ';');
        }
      }));
  }

}
export const httpInterceptorResponse = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
];
