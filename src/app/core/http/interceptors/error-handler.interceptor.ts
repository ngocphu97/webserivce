import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment as env } from '@app/env';
import { HttpError } from '../../exception';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => this.errorHandler(error))
    );
  }

  // Customize the default error handler here if needed
  private errorHandler(error: HttpErrorResponse): Observable<HttpEvent<HttpError>> {
    if (!env.production) {
      // Do something with the error
    }

    if (!error || error.status === 0) {

      return throwError({
        message: 'An error occurred. Please try again later. We are trying to fix this as soon as possible.',
        status: 0,
        type: 'unknown',
        statusText: error.statusText
      });
    }

    return throwError({
      ok: error.ok,
      message: error.message,
      status: error.status,
      statusText: error.statusText
    });
  }

}
