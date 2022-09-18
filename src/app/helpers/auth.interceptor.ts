import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of, finalize } from "rxjs";
import { catchError, filter, take, switchMap, map, tap } from "rxjs/operators";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "secrettoken";
  private refreshTokenInProgress = false;
  private storageService = new StorageService();
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private service: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  res: any;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    debugger
    if (!req.headers.has("Content-Type")) {
      req = req.clone({
        headers: req.headers.set("Content-Type", "application/json")
      });
    }

    req = this.addAuthenticationToken(req);



    return next.handle(req).pipe(
      tap({
        // Succeeds when there is a response; ignore other events
        next: (event) => {
          debugger
          return (this.res = event instanceof HttpResponse ? event.body.body : '')
        },
        // Operation failed; error is an HttpErrorResponse
        error: (error) => ('failed')
      }),
      /*tap(response => {
        debugger
        let resValid = response instanceof HttpResponse;
        this.res = response;
        console.log("🚀 ~ file: auth.interceptor.ts ~ line 49 ~ AuthInterceptor ~ res", this.res)

        /*if (resValid && this.res !== undefined && this.res.status == 200 && this.res.body.isOk) {
          console.info('valid' + JSON.stringify(this.res.body));
          //return this.res;
        }
        if (resValid && this.res !== undefined && !this.res.body.isOk) {
          console.info('no valid  =', this.res.body.mesaage, ';');
        }
        let resi = resValid ? this.res.body.body : this.res;
        console.log("🚀 ~ file: auth.interceptor.ts ~ line 55 ~ AuthInterceptor ~ tap ~ resi", resi)
        return next.handle(resi);
      }),*/
      catchError((error: HttpErrorResponse) => {
        debugger
        if (error && error.status === 401) {
          // 401 errors are most likely going to be because we have an expired token that we need to refresh.
          if (this.refreshTokenInProgress) {
            // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
            // which means the new token is ready and we can retry the request again
            return this.refreshTokenSubject.pipe(
              filter(result => result !== null),
              take(1),
              switchMap(() => next.handle(this.addAuthenticationToken(req)))
            );
          } else {
            this.refreshTokenInProgress = true;

            // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
            this.refreshTokenSubject.next(null);

            return this.refreshAccessToken().pipe(
              switchMap((success: boolean) => {
                this.refreshTokenSubject.next(success);
                return next.handle(this.addAuthenticationToken(req));
              }),
              // When the call to refreshToken completes we reset the refreshTokenInProgress to false
              // for the next time the token needs to be refreshed
              finalize(() => (this.refreshTokenInProgress = false))
            );
          }
        } else {
          return throwError(error);
        }
      })
    ) as Observable<HttpEvent<any>>;
  }

  private refreshAccessToken(): Observable<any> {
    return of("secret token");
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    /*if (!request.url.match(/www.mydomain.com\//)) {
      return request;
    }*/
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.storageService.getToken())
    });
  }
}


export const httpInterceptorProviders2 = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
